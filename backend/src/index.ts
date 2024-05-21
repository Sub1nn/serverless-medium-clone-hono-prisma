import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { sign, verify } from "hono/jwt"

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.use("/api/v1/blog/*", async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, proceed..
  // if the header is not correct, return 403 status code

  const header = c.req.header("authorization")

  const token = header?.split(" ")[1]

  // @ts-ignore
  const response = await verify(token, c.env.JWT_SECRET)

  if (response.id) {
    return next()
  } else {
    c.status(403)
    return c.json({ error: "unauthorized" })
  }
})

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    })

    const jwt = sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({ jwt })
  } catch (e) {
    c.status(403)
    return c.json({ error: "error while signing up" })
  }
})

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  })

  if (!user) {
    c.status(403)
    return c.json({ error: "user not found" })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt })
})

app.post("/api/v1/blog", (c) => {
  return c.text("blog route")
})

app.get("/app/v1/blog/:id", (c) => {
  const id = c.req.param("id")
  console.log(id)
  return c.text("get blog for ${id}")
})

app.put("/app/v1/blog/:id", (c) => {
  return c.text("update your blog")
})

export default app
