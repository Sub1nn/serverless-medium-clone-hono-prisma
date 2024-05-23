// import { Hono } from "hono";
// import { verify } from "hono/jwt";

// export const app = new Hono<{
//     Bindings: {
//         DATABASE_URL: string;
//         JWT_SECRET: string;
//     },
//     Variables: {
//         userId: string
//     }
// }>();

// export function authMiddleware(app){
//     app.use('/api/v1/blog/*', async (c, next) => {
//         const header = c.req.header("authorization") || "";
//         // Bearer token => ["Bearer", "token"];
//         const token = header.split(" ")[1]

//         // @ts-ignore
//         const response = await verify(token, c.env.JWT_SECRET)
//         if (response.id) {
//           next()
//         } else {
//           c.status(403)
//           return c.json({ error: "unauthorized" })
//         }
//       })

// }
