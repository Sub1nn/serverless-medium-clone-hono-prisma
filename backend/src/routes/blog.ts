import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { verify } from "hono/jwt"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
    message: string
  }
}>()

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || ""
  const user = await verify(authHeader.split(" ")[1], c.env.JWT_SECRET)
  if (user) {
    // @ts-ignore
    c.set("userId", user.id)
    await next()
  } else {
    c.status(403)
    return c.json({ message: "You are not logged in" })
  }
})

blogRouter.post("/", async (c) => {
  const userId = c.get("userId")
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  })
  return c.json({
    id: userId,
    blog: blog,
  })
})

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blog.findMany()

  c.status(200)
  return c.json({ blogs: blogs })
})

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id")

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
    })
    return c.json({
      blog,
    })
  } catch (error) {
    c.status(404)
    return c.json({ message: "error while fetching data" })
  }
})

blogRouter.put("/", async (c) => {
  const body = await c.req.json()
  const userId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })
  return c.json({ id: blog.id })
})
