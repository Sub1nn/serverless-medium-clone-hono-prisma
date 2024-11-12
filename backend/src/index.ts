import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
import axios from "axios"; // Import axios for making HTTP requests

export const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Route for fetching a random quote from RapidAPI
app.get("/api/v1/quote", async (c) => {
  const options = {
    method: "GET",
    url: "https://quotes15.p.rapidapi.com/quotes/random/",
    params: { language_code: "en" },
    headers: {
      "x-rapidapi-key": "20c6265318msh4ee367e92cbda54p1b7e3ajsneb8b587524bb",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const quote = response.data.content; // Adjust this to match the actual response structure
    return c.json({ quote });
  } catch (error) {
    console.error("Error fetching the quote from RapidAPI:", error);
    return c.json({ error: "Failed to fetch quote" }, 500);
  }
});

// Other routes
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
