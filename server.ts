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

  // =========================================================================
  // SECURE RIOT GAMES API SERVER-SIDE PROXIES
  // =========================================================================
  
  // CORS issues bypass & secure credential injection handler
  app.get("/api/riot/account/by-riot-id/:name/:tag", async (req, res) => {
    const { name, tag } = req.params;
    const apiKey = process.env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Chave de API do Riot Games (VITE_RIOT_API_KEY ou RIOT_API_KEY) não está configurada no servidor backend." });
    }

    try {
      const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`;
      console.log(`[Proxy Server] GET: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": apiKey
        }
      });
      
      if (!response.ok) {
        return res.status(response.status).json({ error: `Riot Games API respondeu com status ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Erro no proxy de conta:", error);
      return res.status(500).json({ error: error.message || "Erro interno do servidor backend no proxy de pesquisa." });
    }
  });

  app.get("/api/riot/val/matches/by-puuid/:puuid", async (req, res) => {
    const { puuid } = req.params;
    const apiKey = process.env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Chave de API do Riot Games (VITE_RIOT_API_KEY ou RIOT_API_KEY) não está configurada no servidor backend." });
    }

    try {
      const url = `https://br1.api.riotgames.com/val/matches/v1/matchlists/by-puuid/${puuid}?type=competitive&start=0&count=20`;
      console.log(`[Proxy Server] GET: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": apiKey
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Riot Games API Matchlist respondeu com status ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Erro no proxy de matchlists:", error);
      return res.status(500).json({ error: error.message || "Erro no proxy de matchlists do servidor." });
    }
  });

  app.get("/api/riot/val/matches/:matchId", async (req, res) => {
    const { matchId } = req.params;
    const apiKey = process.env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Chave de API do Riot Games (VITE_RIOT_API_KEY ou RIOT_API_KEY) não está configurada no servidor backend." });
    }

    try {
      const url = `https://br1.api.riotgames.com/val/matches/v1/matches/${matchId}`;
      console.log(`[Proxy Server] GET: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": apiKey
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Riot Games API Match Details respondeu com status ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Erro no proxy de detalhes de partidas:", error);
      return res.status(500).json({ error: error.message || "Erro no proxy de detalhes de partidas no servidor." });
    }
  });

  app.get("/api/riot/val/content", async (req, res) => {
    const apiKey = process.env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Chave de API do Riot Games (VITE_RIOT_API_KEY ou RIOT_API_KEY) não está configurada no servidor backend." });
    }

    try {
      const url = "https://br1.api.riotgames.com/val/content/v1/contents?locale=pt-BR";
      console.log(`[Proxy Server] GET: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": apiKey
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Riot Games API Content respondeu com status ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Erro no proxy de conteúdo:", error);
      return res.status(500).json({ error: error.message || "Erro no proxy de conteúdo do servidor." });
    }
  });

  app.get("/api/riot/val/ranked/leaderboards/by-act/:actId", async (req, res) => {
    const { actId } = req.params;
    const apiKey = process.env.VITE_RIOT_API_KEY || process.env.RIOT_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Chave de API do Riot Games (VITE_RIOT_API_KEY ou RIOT_API_KEY) não está configurada no servidor backend." });
    }

    try {
      const url = `https://br1.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actId}?size=10&startIndex=0`;
      console.log(`[Proxy Server] GET: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          "X-Riot-Token": apiKey
        }
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: `Riot Games API Leaderboard respondeu com status ${response.status}` });
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: any) {
      console.error("Erro no proxy de classificados:", error);
      return res.status(500).json({ error: error.message || "Erro no proxy de classificados do servidor." });
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
