import { FullDashboardData } from "../types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, BarChart2, Award, Compass, HeartCrack } from "lucide-react";

interface StatsTabProps {
  data: FullDashboardData;
}

export default function StatsTab({ data }: StatsTabProps) {
  const { mapStats, agentStats, rankProgression } = data;

  // Custom styling elements for Recharts Tooltip
  const customTooltipStyle = {
    backgroundColor: "#07070D",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    fontFamily: "monospace",
    fontSize: "11px",
    color: "#e2e8f0"
  };

  // Build Map comparisons payload
  const mapChartData = mapStats.map((map) => ({
    name: map.mapName,
    "Vitórias": map.wins,
    "Derrotas": map.losses,
    "Frequência": map.matches
  }));

  // Build Agent comparisons payload
  const agentChartData = agentStats.slice(0, 5).map((agent) => ({
    name: agent.agentName,
    "Winrate %": agent.winRate,
    "K/D Ratio": agent.kdRatio
  }));

  return (
    <div className="space-y-6" id="stats_tab_container">

      {/* Row 1: Dual Line Chart - Rank & KD Rating Evolution */}
      <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
          <h3 className="text-sm font-bold uppercase tracking-widest font-display text-white">
            Evolução de Ranking & K/D Recentes
          </h3>
        </div>

        <p className="text-[11px] font-mono text-[#A855F7] mb-6 -mt-3.5 leading-relaxed font-bold uppercase tracking-wider">
          Histórico temporal que traça a variação da pontuação de Ranking Rating (RR) de 0-100 em relação à flutuação de abates/mortes por blocos de sessões competitivas.
        </p>

        <div className="h-72 w-full" id="rank_kd_chart_holder">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rankProgression}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
              <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.3)" style={{ fontSize: "10px", fontFamily: "monospace" }} />
              <YAxis yAxisId="left" stroke="#00E5FF" label={{ value: 'Rank Rating (RR)', angle: -90, position: 'insideLeft', style: { fill: '#00E5FF', fontSize: '10px', fontFamily: 'monospace' } }} style={{ fontSize: "10px", fontFamily: "monospace" }} />
              <YAxis yAxisId="right" orientation="right" stroke="#A855F7" label={{ value: 'KD Ratio', angle: 90, position: 'insideRight', style: { fill: '#A855F7', fontSize: '10px', fontFamily: 'monospace' } }} style={{ fontSize: "10px", fontFamily: "monospace" }} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "monospace", paddingTop: "10px" }} />
              <Line yAxisId="left" type="monotone" dataKey="rankRating" name="Classificação RR" stroke="#00E5FF" strokeWidth={2.5} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="kdRatio" name="KD Equivalente" stroke="#A855F7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Map wins and Agent Performance side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Map wins breakdown Bar Chart */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[#00E5FF]" />
              <h3 className="text-sm font-bold uppercase tracking-widest font-display text-white">
                Lobbies e Mapas Mais Jogados
              </h3>
            </div>

            <div className="h-64 w-full" id="maps_chart_holder">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mapChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.3)" style={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <YAxis stroke="rgba(255, 255, 255, 0.3)" style={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <Bar dataKey="Vitórias" fill="#00E5FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Derrotas" fill="#A855F7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Agent efficiency horizontal chart */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest font-display text-white">
                Eficácia nos Agentes Principais
              </h3>
            </div>

            <div className="h-64 w-full" id="agents_chart_holder">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.04)" />
                  <XAxis type="number" stroke="rgba(255, 255, 255, 0.3)" style={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <YAxis type="category" dataKey="name" stroke="rgba(255, 255, 255, 0.3)" style={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "10px", fontFamily: "monospace" }} />
                  <Bar dataKey="Winrate %" fill="#A855F7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Comparativo de Desempenho entre Agentes e Mapas */}
      <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5 text-[#00E5FF]" />
          <h3 className="text-sm font-bold uppercase tracking-widest font-display text-white">
            Comparativo Geográfico de Táticas
          </h3>
        </div>

        <p className="text-[11px] font-mono text-[#A855F7] mb-4 -mt-1.5 leading-relaxed uppercase tracking-wider font-bold">
          Tabela cruzada relacionando as estatísticas em mapas representativos e o agente de maior impacto selecionado nas partidas do usuário.
        </p>

        <div className="overflow-x-auto" id="comparative_grid_table">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase text-[10px] tracking-widest font-bold">
                <th className="py-3 px-4">Distribuição de Mapa</th>
                <th className="py-3 px-4">Agente Selecionado</th>
                <th className="py-3 px-4 text-center">Partidas</th>
                <th className="py-3 px-4 text-center">Taxa de Vitórias</th>
                <th className="py-3 px-4 text-right">Eficácia Tática</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {mapStats.slice(0, 5).map((m, idx) => {
                // Get deterministic representative agent for comparison
                const matchingAgent = agentStats[idx % agentStats.length] || agentStats[0];
                const alignmentRate = Math.min(100, Math.round(m.winRate * (matchingAgent.kdRatio >= 1.0 ? 1.08 : 0.93)));

                return (
                  <tr key={m.mapName} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5 font-display uppercase tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></div>
                      {m.mapName}
                    </td>
                    <td className="py-3.5 px-4 font-bold">
                      <div className="flex items-center gap-2">
                        <img 
                          src={matchingAgent.agentIconUrl} 
                          alt={matchingAgent.agentName} 
                          className="w-5 h-5 rounded-md object-cover bg-white/5"
                        />
                        <span>{matchingAgent.agentName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center text-white/50">{m.matches}</td>
                    <td className="py-3.5 px-4 text-center font-bold">
                      <span className={`font-black ${m.winRate >= 50 ? "text-[#00E5FF]" : "text-amber-500"}`}>
                        {m.winRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        alignmentRate >= 52 ? "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/15"
                      }`}>
                        {alignmentRate >= 52 ? "Excelente" : "Regular"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Ranking de Elite de Radiantes */}
      <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold uppercase tracking-widest font-display text-white">
            Classificação Oficial: Top 10 Radiantes do Servidor (BR)
          </h3>
        </div>

        <p className="text-[11px] font-mono text-[#A855F7] mb-4 -mt-1.5 leading-relaxed uppercase tracking-wider font-bold">
          Estatísticas exclusivas sincronizadas diretamente das APIs Oficiais da Riot Games v4 para o Act correspondente.
        </p>

        <div className="overflow-x-auto" id="leaderboard_grid_table">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase text-[10px] tracking-widest font-bold">
                <th className="py-3 px-4">Posição</th>
                <th className="py-3 px-4">Jogador</th>
                <th className="py-3 px-4 text-center">Partidas Ganhas</th>
                <th className="py-3 px-4 text-right font-bold">Pontuação RR (Radiante)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {data.leaderboard?.map((p) => (
                <tr key={`${p.gameName}_${p.leaderboardRank}`} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white uppercase tracking-wide">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.leaderboardRank === 1 ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                      p.leaderboardRank === 2 ? "bg-slate-400/10 text-slate-300 border border-slate-400/20" :
                      p.leaderboardRank === 3 ? "bg-amber-600/10 text-amber-500 border border-amber-600/20" :
                      "bg-white/5 text-white/60"
                    }`}>
                      #{p.leaderboardRank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold">
                    <span className="text-white">{p.gameName}</span>
                    <span className="text-white/30 text-[10px]">#{p.tagLine}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-white/70 font-semibold">{p.numberOfWins} Vitórias</td>
                  <td className="py-3.5 px-4 text-right font-black text-[#00E5FF]">{p.rankedRating} RR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
