import { FullDashboardData, TeamMember } from "../types";
import { CircleDot, Target, Trophy, Flame, Users, Swords, AlertCircle } from "lucide-react";

interface ProfileTabProps {
  data: FullDashboardData;
}

export default function ProfileTab({ data }: ProfileTabProps) {
  const { player, overallStats, agentStats, liveMatch } = data;

  // Custom helper to style ranks
  const getRankColorClass = (rankName: string) => {
    if (rankName.includes("Ferro")) return "border-slate-700 bg-slate-900/40 text-slate-400";
    if (rankName.includes("Bronze")) return "border-amber-700 bg-amber-900/10 text-amber-500";
    if (rankName.includes("Prata")) return "border-sky-500/60 bg-sky-950/20 text-sky-400";
    if (rankName.includes("Ouro")) return "border-yellow-500/60 bg-yellow-950/20 text-yellow-400";
    return "border-purple-500/40 bg-purple-950/20 text-purple-400";
  };

  return (
    <div className="space-y-6" id="profile_tab_container">
      
      {/* 1. Header Overview Cards (4 key highlights) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Rank */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Trophy className="w-20 h-20 text-[#A855F7]" />
          </div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-[#00E5FF]" /> Rank Atual
          </div>
          <div className="flex items-center gap-3">
            <img 
              src={player.rankUrl} 
              alt={player.rank} 
              className="w-12 h-12 select-none"
            />
            <div>
              <p className="text-lg font-black tracking-tighter text-white uppercase font-display">{player.rank}</p>
              <p className="text-[10px] font-mono text-white/30">Nível {player.level}</p>
            </div>
          </div>
        </div>

        {/* Card 2: KD Ratio */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Swords className="w-20 h-20 text-[#00E5FF]" />
          </div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <CircleDot className="w-3.5 h-3.5 text-[#00E5FF]" /> K/D Ratio
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-white font-display">{overallStats.kdRatio}</span>
              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                overallStats.kdRatio >= 1.0 ? "text-green-400 bg-green-500/10" : "text-amber-500 bg-amber-500/10"
              }`}>
                {overallStats.kdRatio >= 1.0 ? "Positivo" : "Negativo"}
              </span>
            </div>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Assistências Totais: {overallStats.assists}
            </p>
          </div>
        </div>

        {/* Card 3: Headshots */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Target className="w-20 h-20 text-[#A855F7]" />
          </div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <Target className="w-3.5 h-3.5 text-[#A855F7]" /> Taxa de Headshots
          </div>
          <div>
            <div className="text-4xl font-black text-white font-display">{overallStats.headshotRate}%</div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-[#00E5FF] to-[#A855F7] h-full rounded-full" 
                style={{ width: `${overallStats.headshotRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Win Rate */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flame className="w-20 h-20 text-amber-500" />
          </div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Taxa de Vitórias
          </div>
          <div>
            <div className="text-4xl font-black text-white font-display">{overallStats.winRate}%</div>
            <p className="text-[10px] font-mono text-white/30 mt-1">
              Vitórias: <span className="text-[#00E5FF] font-bold">{overallStats.totalWins}</span> | Derrotas: <span className="text-rose-500 font-bold">{overallStats.totalLosses}</span>
            </p>
          </div>
        </div>

      </div>

      {/* 2. Top Agents Played in Session & Average combat score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Agent breakdown list */}
        <div className="lg:col-span-2 bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest font-display text-white">
              Desempenho por Agente
            </h2>
            <span className="text-[10px] font-mono text-white/30">Filtrado das últimas 50 partidas</span>
          </div>

          <div className="space-y-4">
            {agentStats.slice(0, 4).map((agent) => (
              <div 
                key={agent.agentName} 
                className="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all font-mono"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={agent.agentIconUrl} 
                    alt={agent.agentName} 
                    className="w-10 h-10 rounded-lg bg-[#07070D]/40 object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{agent.agentName}</h4>
                    <p className="text-[10px] text-white/40">K/D: {agent.kdRatio} ({agent.kills}/{agent.deaths})</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 text-right text-xs">
                  <div>
                    <p className="text-white/30 text-[9px] uppercase">V/D</p>
                    <p className="text-white font-bold">{agent.wins}V - {agent.losses}D</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[9px] uppercase">Winrate</p>
                    <p className="text-[#00E5FF] font-bold">{agent.winRate}%</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-white/30 text-[9px] uppercase">ACS Médio</p>
                    <p className="text-[#A855F7] font-bold">{agent.avgScore}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global summary details */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest font-display text-white mb-4">
              Resumo Geral
            </h2>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">ACS Médio (Combat Score)</span>
                <span className="font-bold text-[#00E5FF]">{overallStats.avgScore} pts</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Histórico Analisado</span>
                <span className="font-bold text-white">{overallStats.totalMatches} Partidas</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white/40">Média de Assistências</span>
                <span className="font-bold text-white">{(overallStats.assists / overallStats.totalMatches).toFixed(1)} / partida</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/40">Modo Competitivo Ativo</span>
                <span className="font-bold text-[#A855F7]">América do Sul (br1)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-2.5 mt-4">
            <AlertCircle className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
            <div className="text-[10px] text-white/40 leading-relaxed font-mono">
              O Vava Bronze recalcula sua consistência competitiva após cada lobby atualizado na base. Use o botão sincronizar no cabeçalho se seus dados Riot mudarem.
            </div>
          </div>
        </div>

      </div>

      {/* 3. Live Match Roster Section: Your team vs Enemy team list */}
      <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden" id="live_lobby_card">
        
        {/* Ambient light divider bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#A855F7]"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#A855F7] font-mono">
                Lobby Atual Sincronizado
              </h3>
            </div>
            <h2 className="text-lg font-black text-white flex items-center gap-2 font-display uppercase tracking-wider">
              <Users className="w-5 h-5 text-[#00E5FF]" />
              Equipes do Lobby da Partida
            </h2>
          </div>
          <div className="font-mono text-xs px-3 py-1.5 bg-[#07070D] border border-white/5 rounded-xl text-white/50">
            Mapa: <span className="text-[#00E5FF] font-bold">{liveMatch.mapName}</span>
          </div>
        </div>

        {/* Roster visual grid - Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          
          {/* Middle VS Badge for desktop layout */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#07070D] border border-white/10 items-center justify-center text-[10px] font-black text-[#00E5FF] font-mono shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10">
            VS
          </div>

          {/* LEFT: MY TEAM (Blue Electric) */}
          <div className="space-y-3.5" id="my_team_roster">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-xs font-bold tracking-widest text-[#00E5FF] uppercase font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
                Seu Time (Aliados)
              </h4>
              <span className="text-[10px] font-mono text-white/30">BR Lobby</span>
            </div>

            <div className="space-y-2">
              {liveMatch.myTeam.map((member, idx) => (
                <div 
                  key={`${member.gameName}_${idx}`}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-colors font-mono ${
                    member.isCurrentUser 
                      ? "bg-[#00E5FF]/5 border-[#00E5FF]/25 pink-glow" 
                      : "bg-[#07070D]/40 border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.agentIconUrl} 
                      alt={member.agent} 
                      className="w-9 h-9 rounded-lg border border-white/5 object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {member.gameName}
                        <span className="text-white/40 text-[10px] font-normal">#{member.tagLine}</span>
                        {member.isCurrentUser && (
                          <span className="ml-2 text-[8px] font-bold px-1.5 py-0.5 bg-[#00E5FF]/25 text-black font-display rounded font-black">VOCÊ</span>
                        )}
                      </h5>
                      <span className="text-[9px] text-white/30">Agente: {member.agent}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/40 text-right uppercase">
                      {member.rank}
                    </span>
                    <img 
                      src={member.rank === player.rank ? player.rankUrl : "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/8/largeicon.png"} 
                      alt={member.rank} 
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ENEMY TEAM (Soft Purple) */}
          <div className="space-y-3.5" id="enemy_team_roster">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <h4 className="text-xs font-bold tracking-widest text-[#A855F7] uppercase font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A855F7]"></span>
                Time Adversário
              </h4>
              <span className="text-[10px] font-mono text-white/30">PING: ~12ms</span>
            </div>

            <div className="space-y-2">
              {liveMatch.enemyTeam.map((member, idx) => (
                <div 
                  key={`${member.gameName}_${idx}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#07070D]/40 border border-white/5 font-mono hover:border-[#A855F7]/35 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.agentIconUrl} 
                      alt={member.agent} 
                      className="w-9 h-9 rounded-lg border border-white/5 object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {member.gameName}
                        <span className="text-white/40 text-[10px] font-normal">#{member.tagLine}</span>
                      </h5>
                      <span className="text-[9px] text-white/30">Agente: {member.agent}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/40 text-right uppercase">
                      {member.rank}
                    </span>
                    <img 
                      src="https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/7/largeicon.png" 
                      alt={member.rank} 
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
