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

  // Riot Games API proxy integration
  app.get("/api/riot/player", async (req, res) => {
    const { gameName, tagLine } = req.query;

    if (!gameName || !tagLine) {
      return res.status(400).json({ 
        error: "gameName e tagLine são obrigatórios.",
        details: "Exemplo: /api/riot/player?gameName=Hendo&tagLine=1234"
      });
    }

    const nameStr = String(gameName).trim();
    const tagStr = String(tagLine).trim().replace("#", "");

    // Use Riot API Key provided by user
    const RIOT_API_KEY = process.env.VITE_RIOT_API_KEY || "RGAPI-cd8cef51-553c-4cae-a51c-07411acd6c73";
    const riotAccountUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(nameStr)}/${encodeURIComponent(tagStr)}`;

    console.log(`Connecting to Riot Games Account API: ${riotAccountUrl}`);

    try {
      const response = await fetch(riotAccountUrl, {
        headers: {
          "X-Riot-Token": RIOT_API_KEY
        }
      });

      if (response.ok) {
        const riotAccountData = await response.json();
        console.log("Riot Games API Connection Success:", riotAccountData);
        
        return res.json({
          status: "success",
          source: "riot_api_official",
          data: {
            puuid: riotAccountData.puuid,
            gameName: riotAccountData.gameName,
            tagLine: riotAccountData.tagLine,
          }
        });
      } else {
        const statusText = response.statusText;
        const statusCode = response.status;
        console.warn(`Riot Games API returned code ${statusCode}: ${statusText}`);
        
        // Return 200 with local deterministic generation fallback, flagging the API issue for full client visual transparency
        return res.json({
          status: "simulated_success",
          source: "deterministic_engine",
          reason: statusCode === 403 
            ? "API Key (RGAPI) lacks production/associated permissions or has expired." 
            : `Riot API returned ${statusCode}: ${statusText}`,
          data: {
            puuid: `simulated_puuid_${nameStr.toLowerCase()}_${tagStr.toLowerCase()}`,
            gameName: nameStr,
            tagLine: tagStr,
          }
        });
      }
    } catch (error: any) {
      console.error("Riot API Network fetch error, fallback active:", error.message);
      return res.json({
        status: "simulated_success",
        source: "deterministic_engine",
        reason: "Offline / Riot API Endpoint unreachable: " + error.message,
        data: {
          puuid: `simulated_puuid_${nameStr.toLowerCase()}_${tagStr.toLowerCase()}`,
          gameName: nameStr,
          tagLine: tagStr,
        }
      });
    }
  });

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
