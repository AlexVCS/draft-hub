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

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatDate = (dateString) => {
  let dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", options);
};

export const formatBirthDate = (player) => formatDate(player.birthDate);
export const formatGameDate = (game) => formatDate(game.date);


export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YouTubeId {
  kind: string;
  videoId?: string; // Video ID is present for videos
  playlistId?: string; // Could be present for playlists, etc.
  channelId?: string; // Could be present for channels
}

export interface YouTubeSearchResultItem {
  kind: string;
  etag: string;
  id: YouTubeId;
  snippet: YouTubeSnippet;
}

export interface YouTubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: YouTubePageInfo;
  items: YouTubeSearchResultItem[];
}

export interface YouTubeData {
  results: YouTubeSearchResponse;
}