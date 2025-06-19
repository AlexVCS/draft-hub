import React from "react";
import {useParams} from "react-router"; // To get parameters from the URL
import {useQuery} from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import YouTubeEmbedCard from "./YouTubeEmbedCard"; // Import the new component
import { YouTubeData } from "../helpers/helper_funcs";
// Function to fetch YouTube videos based on a query (e.g., player's name)
const getPlayerVideos = async (query: string): Promise<YouTubeData> => {
  try {
    // IMPORTANT: Replace with your actual YouTube API endpoint and key
    // This is a placeholder. You'll need a backend proxy or client-side API key setup.
    // For a real app, do NOT expose your YouTube API key directly in frontend code.
    // Use a backend endpoint that makes the YouTube API call.
    // const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Ensure this is set in your .env
    
    const baseUrl = import.meta.env.DEV
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;
    const url = `${baseUrl}/player/${playerName}/videos`;

    console.log("Fetching YouTube videos for:", query);
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    const data = await response.json();
    return {results: data}; // Wrap the YouTube response in your YouTubeData interface
  } catch (error) {
    console.error(`Failed to fetch YouTube videos: ${error}`);
    throw error;
  }
};

const PlayerDetails: React.FC = () => {
  // Get player name from the URL params (assuming route is /player/:id/:name)
  const {name} = useParams<{name: string}>();

  // Use react-query to fetch YouTube videos
  const {
    data: youtubeVideos,
    isLoading: youtubeLoading,
    error: youtubeError,
  } = useQuery({
    queryKey: ["playerVideos", name], // Query key depends on the player's name
    queryFn: () => getPlayerVideos(name!), // Pass the player name to the fetch function
    enabled: !!name, // Only run the query if 'name' is available
    staleTime: Infinity, // Or a suitable cache time
  });

  if (!name) {
    return (
      <Typography variant="h5" align="center" mt={4}>
        Player not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Videos for{" "}
        {name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Typography>

      {youtubeLoading && (
        <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
          <CircularProgress />
        </Box>
      )}

      {youtubeError && (
        <Typography color="error" align="center" mt={4}>
          Error loading videos: {youtubeError.message}
          <br />
          (Ensure you have a valid YouTube Data API v3 key and it's correctly
          configured.)
        </Typography>
      )}

      {youtubeVideos?.results?.items &&
      youtubeVideos.results.items.length > 0 ? (
        <Grid container spacing={4}>
          {youtubeVideos.results.items.map((videoItem) => (
            <Grid item xs={12} sm={6} md={4} key={videoItem.id.videoId}>
              <YouTubeEmbedCard video={videoItem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        !youtubeLoading &&
        !youtubeError && (
          <Typography variant="h6" align="center" mt={4}>
            No videos found for{" "}
            {name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            .
          </Typography>
        )
      )}
    </Container>
  );
};

export default PlayerDetails;
