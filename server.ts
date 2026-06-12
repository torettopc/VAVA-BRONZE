import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dns from "dns";

// Fix Node 17+ localhost DNS resolution preference issues if they arise
dns.setDefaultResultOrder("ipv4first");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON request bodies
  app.use(express.json());

  // Serve static assets or mount Vite Developer server preview middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Bootstrapping Vite Development Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving build files in Production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=========================================`);
    console.log(`🚀 Vava Bronze server running on port ${PORT}`);
    console.log(`🌎 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`=========================================`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap crash:", err);
});
