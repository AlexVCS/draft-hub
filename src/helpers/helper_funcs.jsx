const response = await fetch("/draft_data.json");
export const playerData = await response.json();

const scoutRankings = playerData.scoutRankings;
const playerBio = playerData.bio;
export const seasonStats = playerData.seasonLogs
export const measurements = playerData.measurements;

export const avgPlayerRanks = scoutRankings.map((player) => {
  let sumOfRanks = 0;
  let numberOfValidRanks = 0;

  Object.keys(player).forEach((key) => {
    if (key !== "playerId") {
      const rank = player[key];

      if (typeof rank === "number" && rank !== null) {
        sumOfRanks += rank;
        numberOfValidRanks++;
      }
    }
  });

  const averageRank =
    numberOfValidRanks > 0 ? sumOfRanks / numberOfValidRanks : 0;
  return {
    playerId: player.playerId,
    averageRank: parseFloat(averageRank.toFixed(2)),
  };
});

const averageRankMap = new Map();
avgPlayerRanks.forEach((item) => {
  averageRankMap.set(item.playerId, item.averageRank);
});

const individualScoutRankingsMap = new Map();
scoutRankings.forEach((rankingData) => {
  const {playerId, ...ranks} = rankingData;
  individualScoutRankingsMap.set(playerId, ranks);
});

export const bioWithRanks = playerBio
  .map((playerBio) => {
    const newPlayerBio = {...playerBio};

    const avgRank = averageRankMap.get(newPlayerBio.playerId);

    if (avgRank !== undefined) {
      newPlayerBio.averageRank = avgRank;
    } else {
      newPlayerBio.averageRank = null;
    }

    const individualRanks = individualScoutRankingsMap.get(
      newPlayerBio.playerId
    );
    if (individualRanks && typeof individualRanks === "object") {
      Object.assign(newPlayerBio, individualRanks);
    }

    return newPlayerBio;
  })
  .sort((a, b) => {
    if (a.averageRank < b.averageRank) {
      return -1;
    }
    if (a.averageRank > b.averageRank) {
      return 1;
    }
    return 0;
  });

export const scoutRankKeys = [
  "ESPN Rank",
  "Sam Vecenie Rank",
  "Kevin O'Connor Rank",
  "Kyle Boone Rank",
  "Gary Parrish Rank",
];

export const formatPlayerNameLink = (player) => {
  return `/player/${player.playerId}/${player.name
    .toLowerCase()
    .replace(/\.|'/g, "")
    .split(" ")
    .filter((letter) => letter !== ".")
    .join("-")}`;
};

export const convertToFeetInchesAndMeters = (player) => {
  if (isNaN(player.height)) {
    throw new Error("Invalid input. Please enter a valid number.");
  }

  const feet = Math.floor(player.height / 12);
  const remainingInches = player.height % 12;
  const meters = player.height * 0.0254;
  const metersFormatted = meters.toFixed(2);

  return `${feet}'${remainingInches}" (${metersFormatted}m)`;
};

export const convertToKilos = (player) => {
  const kilograms = player.weight * 0.45359237;
  const kilogramsRounded = Math.round(kilograms);
  return `(${kilogramsRounded}kg)`;
};

export const calculateAge = (player) => {
  const ageDifMs = Date.now() - new Date(player.birthDate).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
