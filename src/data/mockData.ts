import { FullDashboardData, Player, Match, AgentStats, MapStats, RankProgressionPoint, TeamMember, LiveMatchData } from "../types";

// High-fidelity asset links from valorant-api.com
export const AGENTS = [
  { name: "Jett", id: "add64c6a-44ad-46c9-8d40-56cbdc3e57c5", icon: "https://media.valorant-api.com/agents/add64c6a-44ad-46c9-8d40-56cbdc3e57c5/displayicon.png" },
  { name: "Sage", id: "563f3aef-613b-4a7d-b22c-72e611d7ced1", icon: "https://media.valorant-api.com/agents/563f3aef-613b-4a7d-b22c-72e611d7ced1/displayicon.png" },
  { name: "Omen", id: "8e253930-dbd6-445a-a28b-9d7a4d863557", icon: "https://media.valorant-api.com/agents/8e253930-dbd6-445a-a28b-9d7a4d863557/displayicon.png" },
  { name: "Reyna", id: "a3efb121-49f6-4106-8130-22d56e637213", icon: "https://media.valorant-api.com/agents/a3efb121-49f6-4106-8130-22d56e637213/displayicon.png" },
  { name: "Sova", id: "320b2a48-4d9b-4024-bcfa-1ee6314813ef", icon: "https://media.valorant-api.com/agents/320b2a48-4d9b-4024-bcfa-1ee6314813ef/displayicon.png" },
  { name: "Raze", id: "f744d5c3-49a7-4613-8b79-1c251745420b", icon: "https://media.valorant-api.com/agents/f744d5c3-49a7-4613-8b79-1c251745420b/displayicon.png" },
  { name: "Viper", id: "117ed9e3-e759-439f-85c9-92b26bc72115", icon: "https://media.valorant-api.com/agents/117ed9e3-e759-439f-85c9-92b26bc72115/displayicon.png" },
  { name: "Cypher", id: "115d54a3-4a7c-42b6-91a1-319ceaa52317", icon: "https://media.valorant-api.com/agents/115d54a3-4a7c-42b6-91a1-319ceaa52317/displayicon.png" },
  { name: "Brimstone", id: "9f0d818e-4a60-496e-bc35-1f9e6840d240", icon: "https://media.valorant-api.com/agents/9f0d818e-4a60-496e-bc35-1f9e6840d240/displayicon.png" },
  { name: "Iso", id: "e370fa57-4757-3604-36a7-628285559ec1", icon: "https://media.valorant-api.com/agents/e370fa57-4757-3604-36a7-628285559ec1/displayicon.png" },
  { name: "Phoenix", id: "eb93336a-449b-9c1b-ebac-9885128530ec", icon: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-ebac-9885128530ec/displayicon.png" },
  { name: "Killjoy", id: "1e58de9c-4950-5125-93e9-a0aee9f98740", icon: "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98740/displayicon.png" },
];

export const MAPS = [
  { name: "Ascent", id: "7eae253f-4156-47e3-9b90-1c2a04ec7ed7", icon: "https://media.valorant-api.com/maps/7eae253f-4156-47e3-9b90-1c2a04ec7ed7/listViewIcon.png" },
  { name: "Bind", id: "2c9140a4-42a4-4790-ade4-4b469b4b3653", icon: "https://media.valorant-api.com/maps/2c9140a4-42a4-4790-ade4-4b469b4b3653/listViewIcon.png" },
  { name: "Haven", id: "2bee0dc9-da51-4ad9-b7ee-7c8c9e6480b4", icon: "https://media.valorant-api.com/maps/2bee0dc9-da51-4ad9-b7ee-7c8c9e6480b4/listViewIcon.png" },
  { name: "Split", id: "d960549e-85e7-4981-9b60-1c24bc250240", icon: "https://media.valorant-api.com/maps/d960549e-85e7-4981-9b60-1c24bc250240/listViewIcon.png" },
  { name: "Icebox", id: "e2ad38c4-be33-400e-93d3-18f12557412e", icon: "https://media.valorant-api.com/maps/e2ad38c4-be33-400e-93d3-18f12557412e/listViewIcon.png" },
  { name: "Breeze", id: "2fb9baf3-f70e-474d-a49d-374f4c987aa7", icon: "https://media.valorant-api.com/maps/2fb9baf3-f70e-474d-a49d-374f4c987aa7/listViewIcon.png" },
  { name: "Sunset", id: "224050e5-af52-4740-4fac-7a54452140cb", icon: "https://media.valorant-api.com/maps/224050e5-af52-4740-4fac-7a54452140cb/listViewIcon.png" },
  { name: "Lotus", id: "2fe4ed3a-450a-948b-6d6b-e89a78e680a9", icon: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/listViewIcon.png" },
];

export const RANKS = [
  { name: "Ferro 1", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/3/largeicon.png", value: 3 },
  { name: "Ferro 2", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/4/largeicon.png", value: 4 },
  { name: "Ferro 3", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/5/largeicon.png", value: 5 },
  { name: "Bronze 1", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/6/largeicon.png", value: 6 },
  { name: "Bronze 2", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/7/largeicon.png", value: 7 },
  { name: "Bronze 3", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/8/largeicon.png", value: 8 },
  { name: "Prata 1", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/9/largeicon.png", value: 9 },
  { name: "Prata 2", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/10/largeicon.png", value: 10 },
  { name: "Prata 3", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/11/largeicon.png", value: 11 },
  { name: "Ouro 1", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/12/largeicon.png", value: 12 },
  { name: "Ouro 2", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/13/largeicon.png", value: 13 },
  { name: "Ouro 3", icon: "https://media.valorant-api.com/competitivetiers/03125211-404a-a134-a0bb-26ae3a1e7bab/14/largeicon.png", value: 14 },
];

// Simple seedable PRNG (pseudo-random number generator) using DJB2
function createPrng(seedString: string) {
  let hash = 5381;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) + hash) + seedString.charCodeAt(i);
  }
  let seed = Math.abs(hash);

  return function next(min = 0, max = 1) {
    // Park-Miller LCG
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    return min + rnd * (max - min);
  };
}

// Generates a fully populated, highly realistic, deterministic player data bundle
export function generatePlayerDashboard(gameName: string, tagLine: string): FullDashboardData {
  const seedKey = `${gameName.toLowerCase()}#${tagLine.toLowerCase()}`;
  const rand = createPrng(seedKey);

  // Pick deterministic rank based on seed
  // High concentration on Bronze ranks because this tracker is "Vava Bronze"!
  // Bronze 1 (value 6), Bronze 2 (value 7), Bronze 3 (value 8)
  const bronzeRanks = RANKS.filter(r => r.name.includes("Bronze") || r.name.includes("Ferro") || r.name.includes("Prata"));
  const rankIdx = Math.floor(rand(0, bronzeRanks.length));
  const pickedRank = bronzeRanks[rankIdx] || RANKS[5]; // default Bronze 3

  // Account parameters
  const level = Math.floor(rand(12, 385));
  
  // Pick an avatar based on deterministic agent index
  const profileAgentIdx = Math.floor(rand(0, AGENTS.length));
  const profileAgent = AGENTS[profileAgentIdx];
  const avatarUrl = profileAgent.icon;

  const player: Player = {
    id: `${gameName}_${tagLine}`.replace(/[^a-zA-Z0-9]/g, "_"),
    gameName,
    tagLine,
    rank: pickedRank.name,
    rankUrl: pickedRank.icon,
    level,
    avatarUrl,
  };

  // Performance parameters
  const kdRatio = parseFloat(rand(0.68, 1.48).toFixed(2));
  const winRate = parseFloat(rand(0.38, 0.64).toFixed(3)) * 100;
  const headshotRate = parseFloat(rand(0.11, 0.29).toFixed(3)) * 100;
  const avgScore = Math.floor(rand(140, 310)); // Average combat score (ACS)

  const totalMatches = 50; // Generate exactly 50 matches
  const totalWins = Math.round((winRate / 100) * totalMatches);
  const totalLosses = totalMatches - totalWins;

  // Recent Matches Builder
  const recentMatches: Match[] = [];
  const mapUsageWeights = MAPS.map(() => rand(1, 10));
  const totalMapWeight = mapUsageWeights.reduce((a, b) => a + b, 0);

  const agentUsageWeights = AGENTS.map(() => rand(1, 10));
  const totalAgentWeight = agentUsageWeights.reduce((a, b) => a + b, 0);

  // Helper to get weighted index
  const selectWeighted = (weights: number[], totalWeight: number) => {
    let roll = rand(0, totalWeight);
    for (let i = 0; i < weights.length; i++) {
      if (roll <= weights[i]) return i;
      roll -= weights[i];
    }
    return 0;
  };

  const currentDate = new Date(2026, 5, 11); // Set around current date context

  for (let m = 0; m < totalMatches; m++) {
    const mapIdx = selectWeighted(mapUsageWeights, totalMapWeight);
    const map = MAPS[mapIdx];

    const agentIdx = selectWeighted(agentUsageWeights, totalAgentWeight);
    const agent = AGENTS[agentIdx];

    const isWin = rand(0, 100) < winRate;
    const killsScale = isWin ? rand(14, 32) : rand(6, 22);
    const kills = Math.floor(killsScale);
    const deaths = Math.floor(isWin ? rand(8, 18) : rand(12, 24));
    const assists = Math.floor(rand(2, 12));
    
    const hsPercentage = parseFloat(rand(headshotRate - 8, headshotRate + 12).toFixed(1));
    const normalizedHs = Math.max(0, Math.min(100, hsPercentage));

    const combatScore = Math.floor(kills * 12 + assists * 4 + rand(50, 120));

    // Calculate dates backwards from current date
    const daysAgo = m * rand(0.5, 3);
    const matchDateObj = new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    recentMatches.push({
      matchId: `match_vava_${m}_${rand(100000, 999999).toFixed(0)}`,
      map: map.name,
      mapImageUrl: map.icon,
      agent: agent.name,
      agentIconUrl: agent.icon,
      result: isWin ? "win" : "loss",
      kills,
      deaths,
      assists,
      score: combatScore,
      headshotPercentage: parseFloat(normalizedHs.toFixed(1)),
      matchDate: matchDateObj.toISOString(),
      gameMode: rand() > 0.15 ? "Competitivo" : "Sem Classificação",
    });
  }

  // Aggregate Agent Stats
  const agentMap: Record<string, { wins: number; matches: number; kills: number; deaths: number; assists: number; scores: number; icon: string }> = {};
  recentMatches.forEach(m => {
    if (!agentMap[m.agent]) {
      agentMap[m.agent] = { wins: 0, matches: 0, kills: 0, deaths: 0, assists: 0, scores: 0, icon: m.agentIconUrl };
    }
    agentMap[m.agent].matches++;
    if (m.result === "win") agentMap[m.agent].wins++;
    agentMap[m.agent].kills += m.kills;
    agentMap[m.agent].deaths += m.deaths;
    agentMap[m.agent].assists += m.assists;
    agentMap[m.agent].scores += m.score;
  });

  const agentStats: AgentStats[] = Object.keys(agentMap).map(name => {
    const data = agentMap[name];
    return {
      agentName: name,
      agentIconUrl: data.icon,
      matches: data.matches,
      wins: data.wins,
      losses: data.matches - data.wins,
      kills: data.kills,
      deaths: data.deaths,
      assists: data.assists,
      avgScore: Math.round(data.scores / data.matches),
      winRate: parseFloat(((data.wins / data.matches) * 100).toFixed(1)),
      kdRatio: parseFloat((data.kills / Math.max(1, data.deaths)).toFixed(2))
    };
  }).sort((a, b) => b.matches - a.matches);

  // Aggregate Map Stats
  const mapMap: Record<string, { wins: number; matches: number; image: string }> = {};
  recentMatches.forEach(m => {
    if (!mapMap[m.map]) {
      mapMap[m.map] = { wins: 0, matches: 0, image: m.mapImageUrl };
    }
    mapMap[m.map].matches++;
    if (m.result === "win") mapMap[m.map].wins++;
  });

  const mapStats: MapStats[] = Object.keys(mapMap).map(name => {
    const data = mapMap[name];
    return {
      mapName: name,
      mapImageUrl: data.image,
      matches: data.matches,
      wins: data.wins,
      losses: data.matches - data.wins,
      winRate: parseFloat(((data.wins / data.matches) * 100).toFixed(1))
    };
  }).sort((a, b) => b.matches - a.matches);

  // Rank and KD Progression (over 10 data points backwards)
  const rankProgression: RankProgressionPoint[] = [];
  let currentRR = Math.floor(rand(10, 90));
  let rankIndex = pickedRank.value;

  for (let p = 9; p >= 0; p--) {
    const matchOffset = p * 4;
    const slices = recentMatches.slice(matchOffset, matchOffset + 4);
    
    // Calculate intermediate KD
    let k = 0, d = 0;
    slices.forEach(sm => {
      k += sm.kills;
      d += sm.deaths;
    });
    const subKd = d > 0 ? parseFloat((k / d).toFixed(2)) : 1.0;

    // Simulate Rank Rating steps
    const winsCount = slices.filter(sm => sm.result === "win").length;
    const ratingChange = (winsCount * 25) - ((slices.length - winsCount) * 22);
    currentRR += ratingChange;

    if (currentRR >= 100) {
      if (rankIndex < RANKS[RANKS.length - 1].value) {
        rankIndex++;
        currentRR = currentRR - 100;
      } else {
        currentRR = 99;
      }
    } else if (currentRR < 0) {
      if (rankIndex > RANKS[0].value) {
        rankIndex--;
        currentRR = 100 + currentRR;
      } else {
        currentRR = 0;
      }
    }

    const matchedTier = RANKS.find(r => r.value === rankIndex) || pickedRank;
    const labelDate = new Date(currentDate.getTime() - (matchOffset * 1.5) * 24 * 60 * 60 * 1000);
    const dateFormatted = `${labelDate.getDate()}/${labelDate.getMonth() + 1}`;

    rankProgression.push({
      date: dateFormatted,
      rankRating: currentRR,
      rankName: `${matchedTier.name} (${currentRR} RR)`,
      kdRatio: subKd,
    });
  }

  // Live Match Team rosters setup
  // We need current roster setup for active match (or last match)
  const namesPool = ["Tenz", "Aspas", "Sacy", "Fallen", "ScreaM", "Hiko", "Shroud", "Sinatraa", "Wardell", "ShahZaM", "Marved", "Yay", "Derke", "Chronicle", "Boaster", "Less", "Saadhak", "mwzera", "cauanzin", "tuyz", "qck", "pancc", "pava", "bzkA", "Hendo", "RiotBronze", "VavaGod", "ClutchMaster", "BulletSmiley", "SpikePlanter", "SoberDancer"];
  
  // Helper to shuffle names
  const getUniqNames = (count: number, avoid1: string, avoid2: string): string[] => {
    const cleanPool = namesPool.filter(n => n.toLowerCase() !== avoid1.toLowerCase() && n.toLowerCase() !== avoid2.toLowerCase());
    const shuffled = [...cleanPool].sort(() => rand() - 0.5);
    return shuffled.slice(0, count);
  };

  const teammatesNames = getUniqNames(4, gameName, tagLine);
  const opponentsNames = getUniqNames(5, gameName, tagLine);

  const getRosterPlayer = (gName: string, isMe = false, preAgent?: typeof AGENTS[0]): TeamMember => {
    const actAgent = preAgent || AGENTS[Math.floor(rand(0, AGENTS.length))];
    const bronzeRanksOnly = RANKS.filter(r => r.name.includes("Bronze") || r.name.includes("Prata") || r.name.includes("Ferro"));
    const peerRank = bronzeRanksOnly[Math.floor(rand(0, bronzeRanksOnly.length))];
    return {
      gameName: gName,
      tagLine: Math.floor(rand(1000, 9999)).toString(),
      rank: isMe ? pickedRank.name : peerRank.name,
      level: isMe ? level : Math.floor(rand(10, 290)),
      isCurrentUser: isMe,
      agent: actAgent.name,
      agentIconUrl: actAgent.icon,
    };
  };

  // Find user's agent from the last match
  const userLastAgentName = recentMatches[0]?.agent || "Jett";
  const userLastAgent = AGENTS.find(a => a.name === userLastAgentName) || AGENTS[0];

  const liveMatch: LiveMatchData = {
    hasLiveMatch: true,
    mapName: recentMatches[0]?.map || "Ascent",
    mapImageUrl: recentMatches[0]?.mapImageUrl || MAPS[0].icon,
    myTeam: [
      getRosterPlayer(gameName, true, userLastAgent), // Current user ALWAYS in team
      ...teammatesNames.map(name => getRosterPlayer(name, false))
    ],
    enemyTeam: opponentsNames.map(name => getRosterPlayer(name, false))
  };

  return {
    player,
    overallStats: {
      winRate: parseFloat(winRate.toFixed(1)),
      headshotRate: parseFloat(headshotRate.toFixed(1)),
      kdRatio,
      avgScore,
      totalWins,
      totalLosses,
      totalMatches,
      assists: Math.round(totalMatches * rand(6, 11))
    },
    liveMatch,
    recentMatches,
    agentStats,
    mapStats,
    rankProgression
  };
}

export function buildDashboardFromMatches(player: Player, recentMatches: Match[]): FullDashboardData {
  const totalMatches = recentMatches.length;
  const totalWins = recentMatches.filter(m => m.result === "win").length;
  const totalLosses = totalMatches - totalWins;
  const winRate = totalMatches > 0 ? parseFloat(((totalWins / totalMatches) * 100).toFixed(1)) : 50.0;

  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let totalScore = 0;
  let totalHs = 0;

  recentMatches.forEach(m => {
    totalKills += m.kills;
    totalDeaths += m.deaths;
    totalAssists += m.assists;
    totalScore += m.score;
    totalHs += m.headshotPercentage;
  });

  const kdRatio = totalDeaths > 0 ? parseFloat((totalKills / totalDeaths).toFixed(2)) : 1.0;
  const avgScore = totalMatches > 0 ? Math.round(totalScore / totalMatches) : 200;
  const headshotRate = totalMatches > 0 ? parseFloat((totalHs / totalMatches).toFixed(1)) : 15.0;

  // Aggregate Agent Stats
  const agentMap: Record<string, { wins: number; matches: number; kills: number; deaths: number; assists: number; scores: number; icon: string }> = {};
  recentMatches.forEach(m => {
    if (!agentMap[m.agent]) {
      agentMap[m.agent] = { wins: 0, matches: 0, kills: 0, deaths: 0, assists: 0, scores: 0, icon: m.agentIconUrl };
    }
    agentMap[m.agent].matches++;
    if (m.result === "win") agentMap[m.agent].wins++;
    agentMap[m.agent].kills += m.kills;
    agentMap[m.agent].deaths += m.deaths;
    agentMap[m.agent].assists += m.assists;
    agentMap[m.agent].scores += m.score;
  });

  const agentStats: AgentStats[] = Object.keys(agentMap).map(name => {
    const data = agentMap[name];
    return {
      agentName: name,
      agentIconUrl: data.icon,
      matches: data.matches,
      wins: data.wins,
      losses: data.matches - data.wins,
      kills: data.kills,
      deaths: data.deaths,
      assists: data.assists,
      avgScore: Math.round(data.scores / data.matches),
      winRate: parseFloat(((data.wins / data.matches) * 100).toFixed(1)),
      kdRatio: parseFloat((data.kills / Math.max(1, data.deaths)).toFixed(2))
    };
  }).sort((a, b) => b.matches - a.matches);

  // Aggregate Map Stats
  const mapMap: Record<string, { wins: number; matches: number; image: string }> = {};
  recentMatches.forEach(m => {
    if (!mapMap[m.map]) {
      mapMap[m.map] = { wins: 0, matches: 0, image: m.mapImageUrl };
    }
    mapMap[m.map].matches++;
    if (m.result === "win") mapMap[m.map].wins++;
  });

  const mapStats: MapStats[] = Object.keys(mapMap).map(name => {
    const data = mapMap[name];
    return {
      mapName: name,
      mapImageUrl: data.image,
      matches: data.matches,
      wins: data.wins,
      losses: data.matches - data.wins,
      winRate: parseFloat(((data.wins / data.matches) * 100).toFixed(1))
    };
  }).sort((a, b) => b.matches - a.matches);

  // Generate Rank and KD Progression over matches (maximum 10 points)
  const rankProgression: RankProgressionPoint[] = [];
  const pointsCount = Math.min(10, totalMatches);
  const matchedRank = RANKS.find(r => r.name.toLowerCase() === player.rank.toLowerCase()) || RANKS[5];
  let currentRR = 50;

  for (let p = pointsCount - 1; p >= 0; p--) {
    const match = recentMatches[p];
    if (!match) continue;

    if (match.result === "win") {
      currentRR += 18;
    } else {
      currentRR -= 15;
    }
    if (currentRR >= 100) currentRR = 99;
    if (currentRR < 0) currentRR = 5;

    const dateObj = new Date(match.matchDate);
    const dateFormatted = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

    rankProgression.push({
      date: dateFormatted,
      rankRating: currentRR,
      rankName: `${matchedRank.name} (${currentRR} RR)`,
      kdRatio: match.deaths > 0 ? parseFloat((match.kills / match.deaths).toFixed(2)) : 1.0,
    });
  }

  // Live Match Team rosters setup
  const namesPool = ["Tenz", "Aspas", "Sacy", "Fallen", "ScreaM", "Hiko", "Shroud", "Sinatraa", "Wardell", "ShahZaM", "Marved", "Yay", "Derke", "Chronicle", "Boaster", "Less", "Saadhak", "mwzera", "cauanzin", "tuyz", "qck", "pancc", "pava", "bzkA", "Hendo", "RiotBronze", "VavaGod", "ClutchMaster", "BulletSmiley", "SpikePlanter", "SoberDancer"];
  
  // Predict live match agent configuration
  const userLastAgentName = recentMatches[0]?.agent || "Jett";
  const userLastAgent = AGENTS.find(a => a.name === userLastAgentName) || AGENTS[0];

  const liveMatch: LiveMatchData = {
    hasLiveMatch: true,
    mapName: recentMatches[0]?.map || "Ascent",
    mapImageUrl: recentMatches[0]?.mapImageUrl || MAPS[0].icon,
    myTeam: [
      {
        gameName: player.gameName,
        tagLine: player.tagLine,
        rank: player.rank,
        level: player.level,
        isCurrentUser: true,
        agent: userLastAgent.name,
        agentIconUrl: userLastAgent.icon,
      },
      ...namesPool.slice(0, 4).map((name, i) => ({
        gameName: name,
        tagLine: "BR1",
        rank: player.rank,
        level: Math.floor(65 + i * 20),
        isCurrentUser: false,
        agent: AGENTS[(i + 2) % AGENTS.length].name,
        agentIconUrl: AGENTS[(i + 2) % AGENTS.length].icon,
      }))
    ],
    enemyTeam: namesPool.slice(4, 9).map((name, i) => ({
      gameName: name,
      tagLine: "BR1",
      rank: player.rank,
      level: Math.floor(45 + i * 15),
      isCurrentUser: false,
      agent: AGENTS[(i + 5) % AGENTS.length].name,
      agentIconUrl: AGENTS[(i + 5) % AGENTS.length].icon,
    }))
  };

  return {
    player,
    overallStats: {
      winRate,
      headshotRate,
      kdRatio,
      avgScore,
      totalWins,
      totalLosses,
      totalMatches,
      assists: totalAssists
    },
    liveMatch,
    recentMatches,
    agentStats,
    mapStats,
    rankProgression
  };
}
