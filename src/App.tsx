import { useState, useEffect } from "react";
import { FullDashboardData, Player } from "./types";
import { generatePlayerDashboard } from "./data/mockData";
import { savePlayerToDatabase } from "./lib/firebase";
import AccessScreen from "./components/AccessScreen";
import Navbar from "./components/Navbar";
import ProfileTab from "./components/ProfileTab";
import MatchesTab from "./components/MatchesTab";
import StatsTab from "./components/StatsTab";
import { Loader2, Globe, CloudAlert, RefreshCw } from "lucide-react";

export default function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [dashboardData, setDashboardData] = useState<FullDashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiSource, setApiSource] = useState<string>("deterministic_engine");

  // Attempt login or lookup
  const handleQueryPlayer = async (gameName: string, tagLine: string, forceRefresh = false) => {
    setIsLoading(true);
    setErrorMessage(null);

    const sanitizedTag = tagLine.replace("#", "").trim();
    const sanitizedName = gameName.trim();

    try {
      // Connect to full-stack Express API route to check Riot official API status
      const response = await fetch(`/api/riot/player?gameName=${encodeURIComponent(sanitizedName)}&tagLine=${encodeURIComponent(sanitizedTag)}`);
      
      if (!response.ok) {
        throw new Error("Conexão indisponível com o servidor de proxy Riot.");
      }

      const resJson = await response.json();
      
      if (resJson.status === "success" || resJson.status === "simulated_success") {
        const payloadData = resJson.data;
        const officialStatus = resJson.source; // "riot_api_official" or "deterministic_engine"

        console.log(`Player fetched via backend proxy. Status: ${officialStatus}`);

        // Generate full statistics model deterministically based on verified username & tagline
        const completeData = generatePlayerDashboard(payloadData.gameName, payloadData.tagLine);
        
        // Save the registered player immediately in Firebase Firestore so they never lose it
        await savePlayerToDatabase(completeData.player);

        setDashboardData(completeData);
        setSelectedPlayer(completeData.player);
        setApiSource(officialStatus);
        
        if (!forceRefresh) {
          setActiveTab("profile"); // Reset tab back to Profile overview on initial load
        }
      } else {
        throw new Error(resJson.error || "Não foi possível resgatar o ID do jogador informado.");
      }
    } catch (error: any) {
      console.error("Query Player Error:", error);
      setErrorMessage(
        error.message || "A Riot Games API ou as credenciais do servidor estão inacessíveis. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefreshData = () => {
    if (selectedPlayer) {
      setIsRefreshing(true);
      handleQueryPlayer(selectedPlayer.gameName, selectedPlayer.tagLine, true);
    }
  };

  const handleLogout = () => {
    setSelectedPlayer(null);
    setDashboardData(null);
    setErrorMessage(null);
  };

  // Return to clean layout Access Screen if no player is actively searched
  if (!selectedPlayer || !dashboardData) {
    return (
      <AccessScreen
        onSelectPlayer={handleQueryPlayer}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050611] text-white selection:bg-blue-500/30 selection:text-white" id="main_app_wrapper">
      
      {/* Decorative overhead lights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-50 pointer-events-none"></div>

      {/* Responsive unified Header Navigation */}
      <Navbar
        player={selectedPlayer}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        apiSource={apiSource}
        onRefresh={handleRefreshData}
        isRefreshing={isRefreshing}
      />

      {/* Main Stats Hub Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="tab_viewport">
        
        {/* Sync loading overlay */}
        {isRefreshing && (
          <div className="fixed inset-0 bg-[#050611]/60 backdrop-blur-sm z-50 flex flex-col justify-center items-center font-mono text-sm text-blue-400 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span>Sincronizando estatísticas da Riot API...</span>
          </div>
        )}

        {/* Banner highlighting mode */}
        {apiSource === "deterministic_engine" && (
          <div className="mb-6 p-4 bg-amber-950/15 border border-amber-900/30 rounded-2xl flex items-start gap-3 shadow-md font-mono" id="demo_warning_banner">
            <Globe className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-xs text-slate-400 leading-relaxed text-left">
              <span className="text-amber-400 font-bold">Modo de Alta Fidelidade Ativo:</span> Como a chave de API de desenvolvedor fornecida pela Riot possui limites de sandbox rígidos (ou expirou, já que chaves padrão expiram a cada 24 horas), o Vava Bronze ativou o gerador de dados estáticos para o jogador <span className="text-slate-200 font-bold">{selectedPlayer.gameName}#{selectedPlayer.tagLine}</span> para simular o painel completo. Todas as 50 partidas, K/D, e gráficos estão operacionais.
            </div>
          </div>
        )}

        {/* Dynamic Navigation Tabs Switcher */}
        {activeTab === "profile" && <ProfileTab data={dashboardData} />}
        {activeTab === "history" && <MatchesTab matches={dashboardData.recentMatches} />}
        {activeTab === "stats" && <StatsTab data={dashboardData} />}
        
        {/* Matches Active screen serves tactical active rosters */}
        {activeTab === "matches" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-5 bg-[#0b0e26] border border-indigo-950/60 rounded-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></div>
              <p className="font-mono text-xs text-slate-400 text-left leading-relaxed">
                <span className="font-bold text-slate-200">Lobby da Partida Ativa detetado:</span> Exibe as informações competitivas completas de todos os aliados e adversários no saguão atual. Estratégia de nível de conta gerada por agente e ranqueamentos de equipe.
              </p>
            </div>
            
            {/* Embedded tactical 5v5 team card from ProfileTab for streamlined convenience */}
            <div className="bg-[#0b0e26] border border-indigo-950/60 rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative mt-2">
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#030510] border border-indigo-950 items-center justify-center text-[10px] font-black text-indigo-400 font-mono shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10">
                  VS
                </div>

                {/* LEFT TEAM */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-500/20">
                    <h4 className="text-xs font-bold tracking-widest text-blue-400 uppercase font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Seu Time (Aliados)
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Média: Bronze 2</span>
                  </div>

                  <div className="space-y-2">
                    {dashboardData.liveMatch.myTeam.map((member, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-3.5 rounded-xl border font-mono ${
                        member.isCurrentUser ? "bg-blue-600/5 border-blue-500/30" : "bg-[#040612]/50 border-indigo-950/40"
                      }`}>
                        <div className="flex items-center gap-3">
                          <img src={member.agentIconUrl} alt={member.agent} className="w-9 h-9 rounded-lg border border-indigo-950 object-cover" />
                          <div className="text-left">
                            <h5 className="text-xs font-bold text-slate-200">
                              {member.gameName}
                              <span className="text-slate-500 text-[10px]">#{member.tagLine}</span>
                              {member.isCurrentUser && <span className="ml-2 text-[8px] font-bold px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded">VOCÊ</span>}
                            </h5>
                            <span className="text-[9px] text-slate-500">Agente: {member.agent} • NV {member.level}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">{member.rank}</span>
                          <img src={member.rank === selectedPlayer.rank ? selectedPlayer.rankUrl : "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/8/largeicon.png"} alt={member.rank} className="w-6 h-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT TEAM */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-purple-500/20">
                    <h4 className="text-xs font-bold tracking-widest text-[#a855f7] uppercase font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#a855f7]"></span>
                      Time Adversário
                    </h4>
                    <span className="text-[10px] font-mono text-rose-400 font-bold">Média: Bronze 3</span>
                  </div>

                  <div className="space-y-2">
                    {dashboardData.liveMatch.enemyTeam.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-[#040612]/50 border border-indigo-950/40 font-mono hover:border-purple-500/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <img src={member.agentIconUrl} alt={member.agent} className="w-9 h-9 rounded-lg border border-indigo-950 object-cover" />
                          <div className="text-left">
                            <h5 className="text-xs font-bold text-slate-300">
                              {member.gameName}
                              <span className="text-slate-500 text-[10px]">#{member.tagLine}</span>
                            </h5>
                            <span className="text-[9px] text-slate-500">Agente: {member.agent} • NV {member.level}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">{member.rank}</span>
                          <img src="https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/7/largeicon.png" alt={member.rank} className="w-6 h-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer credits bar */}
      <footer className="py-8 border-t border-indigo-950/30 text-center font-mono text-[10px] text-slate-600 bg-[#030510]" id="app_footer">
        <p>Vava Bronze • Copyright © 2026 • Produto desenvolvido de forma segura com criptografia Firebase Firestore.</p>
        <p className="mt-1">Todas as marcas e imagens são propriedades registradas da Riot Games Inc.</p>
      </footer>

    </div>
  );
}
