import { Activity, Trophy, Calendar, BarChart2, CornerDownLeft, RefreshCcw } from "lucide-react";
import { Player } from "../types";

interface NavbarProps {
  player: Player;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  apiSource: string; // e.g., "riot_api_official" or "deterministic_engine"
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function Navbar({ 
  player, 
  activeTab, 
  onTabChange, 
  onLogout, 
  apiSource, 
  onRefresh, 
  isRefreshing 
}: NavbarProps) {
  const tabs = [
    { id: "profile", label: "Perfil", icon: Trophy },
    { id: "matches", label: "Partidas Ativas", icon: Activity },
    { id: "history", label: "Histórico", icon: Calendar },
    { id: "stats", label: "Estatísticas", icon: BarChart2 },
  ];

  return (
    <header className="bg-[#07070D] border-b border-white/5 sticky top-0 z-40 backdrop-blur-md" id="app_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Back button combo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-white/40 hover:text-white transition-colors hover:bg-white/5 rounded-lg cursor-pointer font-mono"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7] font-display uppercase">
                VAVA BRONZE
              </span>
              {apiSource === "deterministic_engine" ? (
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-md tracking-wider font-mono uppercase" title="A chave fornecida da API Riot Games está inativa ou sob rate limit. Executando simulação de dados em modo de alta fidelidade para fins demonstrativos.">
                  Demo
                </span>
              ) : (
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-md tracking-wider font-mono uppercase">
                  Oficial
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex space-x-1" id="desktop_nav_tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/5 border border-white/10 text-[#00E5FF] shadow-[0_4px_12px_rgba(0,229,255,0.05)]"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#00E5FF]" : "text-white/40"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Player stats widget & Refresh action */}
          <div className="flex items-center gap-4">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className={`p-2 hover:bg-white/5 rounded-xl border border-white/5 transition-colors text-[#00E5FF] disabled:opacity-40 cursor-pointer ${
                isRefreshing ? "animate-spin" : ""
              }`}
              title="Sincronizar estatísticas em tempo real"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 bg-white/5 p-1.5 pr-3 rounded-xl border border-white/10">
              <img
                src={player.avatarUrl}
                alt={player.gameName}
                className="w-8 h-8 rounded-lg border border-white/10 object-cover"
              />
              <div className="text-left font-mono">
                <div className="text-xs font-bold text-white truncate max-w-[100px] sm:max-w-[130px]">
                  {player.gameName}
                  <span className="text-white/40 text-[10px] font-normal">#{player.tagLine}</span>
                </div>
                <div className="text-[9px] text-white/30 font-bold">Nível {player.level}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Tabs (visible on mobile only) */}
      <nav className="flex md:hidden border-t border-white/5 bg-[#07070D]/80" id="mobile_nav_tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer ${
                isSelected ? "text-[#00E5FF]" : "text-white/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
