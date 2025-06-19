import {Box, CircularProgress, Grid, GridProps, Typography} from "@mui/material"; // Added Grid, CircularProgress
import GameStats from "./GameStats";
import SeasonStats from "./SeasonStats";
import {useState} from "react";
import {Link, useParams} from "react-router"; // Changed from 'react-router' to 'react-router-dom' for Link
import Button from "@mui/material/Button";
import ScoutReports from "./ScoutReports";
import {useQuery} from "@tanstack/react-query";

import YouTubeEmbedCard from "./YouTubeEmbedCard"; // Import the YouTubeEmbedCard
import { YouTubeData } from "../helpers/helper_funcs";

const Profile = () => {
  // Use a union type for statsView to include "videos"
  const [statsView, setStatsView] = useState<
    "none" | "game" | "season" | "scout" | "videos"
  >("none");
  const {playerName} = useParams<{playerName: string}>(); // Specify type for useParams

  // The getVideos function now correctly types its return as Promise<YouTubeData>
  const getVideos = async (): Promise<YouTubeData> => {
    // Removed 'player' parameter as playerName is from useParams
    try {
      const baseUrl = import.meta.env.DEV
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;
      const url = `${baseUrl}/player/${playerName}/videos`; // Uses playerName from useParams
      console.log("Fetching videos from URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        // Basic error handling for fetch
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Assumes your backend wraps the YouTube response under a 'results' key
    } catch (error) {
      console.error(`Failed to fetch videos: ${error}`);
      throw error;
    }
  };

  const {
    isLoading,
    data: videosData, // Renamed 'data' to 'videosData' for clarity
    error,
  } = useQuery<YouTubeData, Error>({
    // Specify generic types for useQuery
    queryKey: ["playerVideos", playerName], // Key includes playerName for unique caching
    queryFn: getVideos, // No need for lambda if no args are passed
    enabled: !!playerName, // Only run query if playerName is available
    staleTime: Infinity,
  });

  // Consolidated error/loading states for the *entire* profile if necessary
  // Or handle loading/error specifically for the video section
  // For now, let's just render the overall loading/error
  // if (isLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error.message}</h1>; // Better error message

  // You might want to handle a specific player not found more gracefully
  if (!playerName) {
    return (
      <Box sx={{p: 3, textAlign: "center"}}>
        <Typography variant="h5">Player Name Missing</Typography>
        <Link to="/">
          <Button variant="contained" sx={{mt: 2}}>
            Back to Board
          </Button>
        </Link>
      </Box>
    );
  }

  // console.log("Video data:", videosData); // For debugging

  return (
    <Box>
      <Link to={"/"}>
        <Button variant="contained">Back to Board</Button>
      </Link>

      <Box component="span" sx={{pl: {xs: 2, md: 3}}}>
        <Button
          onClick={() => setStatsView("scout")}
          variant={statsView === "scout" ? "contained" : "outlined"}
          sx={{mr: 1}}
        >
          Scout Reports
        </Button>
        {/* New button for Videos */}
        <Button
          onClick={() => setStatsView("videos")}
          variant={statsView === "videos" ? "contained" : "outlined"}
        >
          Videos
        </Button>
      </Box>

      {/* Render content based on statsView state */}
      {statsView === "game" && (
        <Box sx={{p: 3}}>
          <GameStats />
        </Box>
      )}

      {statsView === "season" && (
        <Box sx={{p: 3}}>
          <SeasonStats />
        </Box>
      )}

      {statsView === "scout" && (
        <Box sx={{p: 3}}>
          <ScoutReports />
        </Box>
      )}

      {/* New section for YouTube Videos */}
      {statsView === "videos" && (
        <Box sx={{p: 3}}>
          <Typography variant="h5" gutterBottom>
            Videos for{" "}
            {playerName
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Typography>

          {isLoading && (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" align="center" mt={4}>
              Error loading videos: {error.message}
            </Typography>
          )}

          {/* {videosData?.results?.items && videosData.results.items.length > 0 ? ( */}
            {/* <Grid container spacing={4}> */}
              {videosData?.results.items.map(
                (videoItem) =>
                  // Only render if videoId exists (to filter out channels/playlists from search results)
                  videoItem.id.videoId && (
                    <Grid item xs={12} sm={6} md={4} key={videoItem.id.videoId}>
                      <YouTubeEmbedCard video={videoItem} />
                    </Grid>
                  )
              )}
            {/* </Grid> */}
          {/* ) : (
            // Only show "No videos found" if not loading and no error
            !isLoading &&
            !error && (
              <Typography variant="h6" align="center" mt={4}>
                No videos found.
              </Typography>
            )
          )} */}
        </Box>
      )}
      {statsView === "none" && ( // Optionally, if "none" means no content is shown below buttons
        <Box sx={{p: 3}}>
          <Typography variant="h6" align="center">
            Select a view to see player information.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
