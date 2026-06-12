/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Player {
  id: string; // gameName + "_" + tagLine (or Hendo_1234)
  gameName: string;
  tagLine: string;
  puuid?: string;
  rank: string;
  rankUrl: string;
  level: number;
  avatarUrl: string;
  savedAt?: string;
}

export interface Match {
  matchId: string;
  map: string;
  mapImageUrl: string;
  agent: string;
  agentIconUrl: string;
  result: "win" | "loss";
  kills: number;
  deaths: number;
  assists: number;
  score: number; // Average combat score (ACS)
  headshotPercentage: number;
  matchDate: string; // ISO string or relative date
  gameMode: string;
}

export interface TeamMember {
  gameName: string;
  tagLine: string;
  rank: string;
  level: number;
  isCurrentUser: boolean;
  agent: string;
  agentIconUrl: string;
}

export interface LiveMatchData {
  hasLiveMatch: boolean;
  mapName: string;
  mapImageUrl: string;
  myTeam: TeamMember[];
  enemyTeam: TeamMember[];
}

export interface AgentStats {
  agentName: string;
  agentIconUrl: string;
  matches: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  avgScore: number;
  winRate: number;
  kdRatio: number;
}

export interface MapStats {
  mapName: string;
  mapImageUrl: string;
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface RankProgressionPoint {
  date: string;
  rankRating: number; // 0-100 RR
  rankName: string;
  kdRatio: number;
}

export interface FullDashboardData {
  player: Player;
  overallStats: {
    winRate: number;
    headshotRate: number;
    kdRatio: number;
    avgScore: number;
    totalWins: number;
    totalLosses: number;
    totalMatches: number;
    assists: number;
  };
  liveMatch: LiveMatchData;
  recentMatches: Match[];
  agentStats: AgentStats[];
  mapStats: MapStats[];
  rankProgression: RankProgressionPoint[];
}
