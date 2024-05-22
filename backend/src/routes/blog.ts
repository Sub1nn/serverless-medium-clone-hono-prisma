import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign, verify } from "hono/jwt"

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

blogRouter.use("/*", async (c, next) => {
  // extract the user Id
  // pass it down to the route handler

  const authorization = c.req.header("authorization")
  const token = authorization?.split(" ")[1]
  // @ts-ignore
  const response = await verify(token, c.env.JWT_SECRET)

  if (response.id) {
    const user = response.user
    return next()
  } else {
    c.status(403)
    return c.json({ error: "unauthorized" })
  }
})

blogRouter.post("/", async (c) => {
  const body = await c.req.json()

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  // @ts-ignore
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
    },
  })

  return c.json({ id: blog.id })
})

blogRouter.get("/", async (c) => {
  const body = await c.req.json()

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    // @ts-ignore
    const blog = await prisma.blog.findFirst({
      where: {
        id: body.id,
      },
      include: {
        author: true,
      },
    })
    return c.json({
      blog,
    })
  } catch (error) {
    // @ts-ignore

    return c.status(404).text({ message: "error while fetching data" })
  }
})
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  // @ts-ignore

  const blogs = await prisma.blog.findMany()
  // @ts-ignore

  return c.status(200).json({ blogs: blogs })
})

blogRouter.put("/", async (c) => {
  const body = await c.req.json()

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  // @ts-ignore
  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
    },
  })

  return c.json({ id: blog.id })
})
