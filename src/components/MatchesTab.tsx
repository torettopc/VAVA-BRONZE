import { useState } from "react";
import { Match } from "../types";
import { Filter, Calendar, Zap, Compass, Users } from "lucide-react";

interface MatchesTabProps {
  matches: Match[];
}

export default function MatchesTab({ matches }: MatchesTabProps) {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [selectedResult, setSelectedResult] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest"); // latest, oldest
  const [limitCount, setLimitCount] = useState(10); // Standard paginated chunking

  // Extract unique agents from list of matches for dynamic filter construction
  const uniqueAgents = Array.from(new Set(matches.map(m => m.agent))).sort();

  // Filter and sort core algorithm
  const filteredMatches = matches
    .filter((m) => {
      if (selectedAgent !== "all" && m.agent !== selectedAgent) return false;
      if (selectedResult !== "all" && m.result !== selectedResult) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.matchDate).getTime();
      const dateB = new Date(b.matchDate).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

  const displayedMatches = filteredMatches.slice(0, limitCount);
  const totalCount = filteredMatches.length;

  const formatDateString = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Data indisponível";
    }
  };

  return (
    <div className="space-y-6" id="matches_tab_container">
      
      {/* 1. Header & Quick Status indicators */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-[#151525] border border-white/5 rounded-3xl gap-4 shadow-xl font-mono">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#00E5FF] font-display">
            Histórico Competitivo
          </h2>
          <p className="text-xs text-white/40 mt-1">
            Analisando <span className="text-white font-bold">{totalCount}</span> de <span className="text-[#A855F7] font-bold">{matches.length}</span> partidas encontradas
          </p>
        </div>

        {/* Quick totals badge */}
        <div className="flex gap-4 text-xs text-left">
          <div className="px-4 py-2 bg-[#07070D] border border-white/5 rounded-2xl">
            <span className="text-white/30 block text-[9px] uppercase font-bold tracking-wider">Gerais</span>
            <span className="text-emerald-400 font-bold">
              {matches.filter(m => m.result === "win").length} Vitórias
            </span>
          </div>
          <div className="px-4 py-2 bg-[#07070D] border border-white/5 rounded-2xl">
            <span className="text-white/30 block text-[9px] uppercase font-bold tracking-wider">Lobby</span>
            <span className="text-red-400 font-bold">
              {matches.filter(m => m.result === "loss").length} Derrotas
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filters Bar */}
      <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-4 shadow-xl font-mono text-xs">
        
        {/* Agent Select */}
        <div className="flex-1">
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1.5 font-bold">
            Filtrar por Agente
          </label>
          <div className="relative">
            <select
              value={selectedAgent}
              onChange={(e) => { setSelectedAgent(e.target.value); setLimitCount(10); }}
              className="w-full h-11 px-3 pr-8 rounded-xl bg-[#07070D] border border-white/10 text-white focus:outline-none focus:border-[#00E5FF] cursor-pointer appearance-none transition-colors"
            >
              <option value="all">Todos os Agentes</option>
              {uniqueAgents.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-white/30">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Result Select */}
        <div className="flex-1">
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1.5 font-bold">
            Resultado da Partida
          </label>
          <div className="relative">
            <select
              value={selectedResult}
              onChange={(e) => { setSelectedResult(e.target.value); setLimitCount(10); }}
              className="w-full h-11 px-3 pr-8 rounded-xl bg-[#07070D] border border-white/10 text-white focus:outline-none focus:border-[#00E5FF] cursor-pointer appearance-none transition-colors"
            >
              <option value="all">Sessões Vitórias e Derrotas</option>
              <option value="win">Vitórias apenas</option>
              <option value="loss">Derrotas apenas</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-white/30">
              <Compass className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Timestamps Order */}
        <div className="flex-1">
          <label className="block text-[10px] text-white/40 uppercase tracking-widest mb-1.5 font-bold">
            Ordenação de Data
          </label>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => { setSortOrder(e.target.value); setLimitCount(10); }}
              className="w-full h-11 px-3 pr-8 rounded-xl bg-[#07070D] border border-white/10 text-white focus:outline-none focus:border-[#00E5FF] cursor-pointer appearance-none transition-colors"
            >
              <option value="latest">Partidas Recentes primeiro</option>
              <option value="oldest">Partidas Antigas primeiro</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-white/30">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Infinite Scroll / paginated Matches Grid list */}
      {displayedMatches.length === 0 ? (
        <div className="text-center py-12 bg-[#151525]/30 border border-dashed border-white/10 rounded-3xl text-xs text-white/30 font-mono">
          Nenhuma partida atende aos filtros atuais selecionados.
        </div>
      ) : (
        <div className="space-y-3" id="match_cards_list">
          {displayedMatches.map((m) => {
            const isWin = m.result === "win";
            const kdRatio = parseFloat((m.kills / Math.max(1, m.deaths)).toFixed(2));
            const isKdPositive = kdRatio >= 1.0;

            return (
              <div
                key={m.matchId}
                className={`relative bg-[#151525] border rounded-3xl p-5 overflow-hidden transition-all duration-300 hover:scale-[1.01] flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl ${
                  isWin 
                    ? "border-[#00E5FF]/20 hover:border-[#00E5FF]/40" 
                    : "border-red-500/10 hover:border-red-500/25"
                }`}
              >
                {/* Thin side light glow colored by match status */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  isWin ? "bg-[#00E5FF]" : "bg-red-500"
                }`}></div>

                {/* Left Section: Agent display & basic metadata */}
                <div className="flex items-center gap-4 w-full md:w-auto font-mono">
                  <div className="relative">
                    <img
                      src={m.agentIconUrl}
                      alt={m.agent}
                      className="w-12 h-12 rounded-xl border border-white/5 object-cover"
                    />
                    <div className={`absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded text-[8px] font-black text-white ${
                      isWin ? "bg-emerald-600" : "bg-red-600"
                    }`}>
                      {isWin ? "VITÓRIA" : "DERROTA"}
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-sm font-black text-white">{m.agent}</div>
                    <div className="text-[10px] text-white/40 flex items-center gap-1.5 mt-0.5">
                      <span>{m.gameMode}</span>
                      <span>•</span>
                      <span>{formatDateString(m.matchDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Mid-Left Section: Map & Combat statistics */}
                <div className="flex items-center gap-4 w-full md:w-auto text-left md:text-center md:justify-center">
                  <div className="h-10 w-20 rounded-lg overflow-hidden bg-[#07070D] border border-white/10 hidden sm:block">
                    <img 
                      src={m.mapImageUrl} 
                      alt={m.map} 
                      className="h-full w-full object-cover opacity-60"
                    />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold text-white md:text-center shrink-0">
                      Mapa: {m.map}
                    </h5>
                    <p className="font-mono text-[10px] text-white/40 mt-0.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> ACS: <span className="text-amber-500 font-bold">{m.score}</span> pts
                    </p>
                  </div>
                </div>

                {/* Mid-Right Section: KDA Counts details */}
                <div className="flex items-center justify-between md:justify-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-3.5 md:pt-0 border-white/5">
                  <div className="text-left md:text-center font-mono">
                    <p className="text-[9px] uppercase text-white/30 tracking-wider">A/M/A (KDA)</p>
                    <p className="text-sm font-black text-white">
                      {m.kills} <span className="text-white/20 font-normal">/</span> <span className="text-red-400">{m.deaths}</span> <span className="text-white/20 font-normal">/</span> {m.assists}
                    </p>
                  </div>

                  {/* KDA Ratio and Indicators */}
                  <div className="text-right md:text-center font-mono">
                    <p className="text-[9px] uppercase text-white/30 tracking-wider">K/D Ratio</p>
                    <p className={`text-sm font-black ${
                      isKdPositive ? "text-[#00E5FF]" : "text-amber-400"
                    }`}>
                      {kdRatio.toFixed(2)}
                    </p>
                  </div>

                  {/* Headshots % */}
                  <div className="text-right font-mono hidden sm:block">
                    <p className="text-[9px] uppercase text-white/30 tracking-wider">Headshots %</p>
                    <p className="text-sm font-bold text-[#A855F7]">
                      {m.headshotPercentage}%
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. Chunked Load more button */}
      {totalCount > limitCount && (
        <div className="flex justify-center pb-8">
          <button
            onClick={() => setLimitCount(prev => prev + 10)}
            className="px-6 py-2.5 rounded-2xl border border-white/5 bg-[#151525] hover:bg-[#151525]/80 font-mono text-xs font-bold text-[#00E5FF] transition-colors shadow-xl cursor-pointer"
          >
            Carregar Mais Partidas ({totalCount - limitCount} restantes)
          </button>
        </div>
      )}

    </div>
  );
}
