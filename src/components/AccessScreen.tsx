import React, { useState, useEffect } from "react";
import { Player } from "../types";
import { getSavedPlayers } from "../lib/firebase";
import { Search, Trophy, Disc, Loader2, Sparkles, Star } from "lucide-react";

interface AccessScreenProps {
  onSelectPlayer: (gameName: string, tagLine: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export default function AccessScreen({ onSelectPlayer, isLoading, errorMessage }: AccessScreenProps) {
  const [inputVal, setInputVal] = useState("");
  const [recentPlayers, setRecentPlayers] = useState<Player[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load saved recent players list
  useEffect(() => {
    async function loadHistory() {
      setLoadingHistory(true);
      try {
        const historyList = await getSavedPlayers();
        setRecentPlayers(historyList);
      } catch (err) {
        console.error("Failed to load player history:", err);
      } finally {
        setLoadingHistory(false);
      }
    }
    loadHistory();
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.includes("#")) {
      alert("Por favor, digite no formato correto com a Hashtag. Ex: Hendo#1234");
      return;
    }

    const parts = inputVal.split("#");
    const name = parts[0].trim();
    const tag = parts[1].trim();

    if (name && tag) {
      onSelectPlayer(name, tag);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden" id="access_screen_container">
      
      {/* Decorative cybernetic mesh effects */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent"></div>
      <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-[#A855F7]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10" id="access_card">
        {/* Title Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#A855F7] p-[2px] shadow-[0_0_30px_rgba(0,229,255,0.25)] mb-4">
            <div className="w-full h-full bg-[#0B0B14] rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#00E5FF] animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-[#00E5FF] to-[#A855F7] bg-clip-text text-transparent font-display uppercase">
            Vava Bronze
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[#A855F7] font-bold mt-1 font-mono">
            Valorant Statistik Portal • Elite Analytics
          </p>
        </div>

        {/* Input box */}
        <div className="bg-[#151525] border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-[#00E5FF] to-[#A855F7] rounded-full text-[10px] font-bold text-black font-mono shadow-md uppercase">
            Consulta Riot API
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2" htmlFor="riot_id_field">
                Riot ID do Jogador
              </label>
              <div className="relative">
                <input
                  id="riot_id_field"
                  type="text"
                  placeholder="Nome#TAG (ex: Hendo#1234)"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#07070D] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] font-mono transition-all text-sm"
                />
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-white/30" />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-red-950/20 border border-red-500/10 rounded-xl text-xs text-red-300 flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <button
              id="submit_query_btn"
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00E5FF] via-indigo-600 to-[#A855F7] hover:opacity-90 text-white hover:text-[#00E5FF] font-bold font-display uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.15)] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Buscando Histórico...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analisar Estatísticas</span>
                </>
              )}
            </button>
          </form>

          {/* Quick instructions */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-mono">
            <span className="flex items-center gap-1.5 text-[#00E5FF]">
              <Disc className="w-3.5 h-3.5 animate-spin" /> BR1 / AMERICAS
            </span>
            <span>Versão API: V4</span>
          </div>
        </div>

        {/* Saved profiles history */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3.5 px-1">
            <Star className="w-4 h-4 text-[#A855F7] fill-[#A855F7]" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Estatísticas Cadastradas
            </h3>
          </div>

          {loadingHistory ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
            </div>
          ) : recentPlayers.length === 0 ? (
            <div className="text-center py-6 bg-[#151525]/30 rounded-2xl border border-dashed border-white/10 text-xs text-white/30">
              Nenhum jogador salvo recentemente. Faça a primeira busca!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2" id="saved_players_grid">
              {recentPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => onSelectPlayer(player.gameName, player.tagLine)}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#151525]/40 hover:bg-[#151525] border border-white/5 hover:border-white/10 transition-all font-mono group text-left"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatarUrl || "https://media.valorant-api.com/agents/add64c6a-44ad-46c9-8d40-56cbdc3e57c5/displayicon.png"}
                      alt={player.gameName}
                      className="w-8 h-8 rounded-lg border border-white/10 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {player.gameName}
                        <span className="text-white/40 font-normal">#{player.tagLine}</span>
                      </h4>
                      <p className="text-[10px] text-white/30">Nível {player.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-right">
                    <div className="text-[11px] font-bold text-white/70">
                      {player.rank || "Bronze 3"}
                    </div>
                    <img
                      src={player.rankUrl || "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/8/largeicon.png"}
                      alt={player.rank}
                      className="w-7 h-7"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
