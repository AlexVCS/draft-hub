import {Box, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import GameStats from "./GameStats";
import SeasonStats from "./SeasonStats";
import {useState} from "react";
import {Link, useParams} from "react-router";
import Button from "@mui/material/Button";
import ScoutReports from "./ScoutReports";
import {useQuery} from "@tanstack/react-query";
import YouTubeEmbedCard from "./YouTubeEmbedCard";
import {YouTubeData} from "../helpers/helper_funcs";

const Profile = () => {
  const [statsView, setStatsView] = useState<
    "scout" | "videos"
  >("videos");
  const {playerName} = useParams<{playerName: string}>();

  const getVideos = async (): Promise<YouTubeData> => {
    try {
      const baseUrl = import.meta.env.DEV
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;
      const url = `${baseUrl}/player/${playerName}/videos`;
      console.log("Fetching videos from URL:", url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Failed to fetch videos: ${error}`);
      throw error;
    }
  };

  const {
    isLoading,
    data: videosData,
    error,
  } = useQuery<YouTubeData, Error>({
    queryKey: ["playerVideos", playerName],
    queryFn: getVideos,
    enabled: !!playerName,
    staleTime: Infinity,
  });

  // Consolidated error/loading states for the *entire* profile if necessary
  // Or handle loading/error specifically for the video section
  // For now, let's just render the overall loading/error
  // if (isLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error.message}</h1>; // Better error message

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

  return (
    <Box>
      <Box sx={{p: 2, display: "flex", flexWrap: "wrap", gap: 2}}>
        <Link to={"/"}>
          <Button variant="contained">Back to Board</Button>
        </Link>

        <Button
          onClick={() => setStatsView("scout")}
          variant={statsView === "scout" ? "contained" : "outlined"}
        >
          Scout Reports
        </Button>

        <Button
          onClick={() => setStatsView("videos")}
          variant={statsView === "videos" ? "contained" : "outlined"}
        >
          Videos
        </Button>
      </Box>
      {statsView === "scout" && (
        <Box sx={{p: 3}}>
          <ScoutReports />
        </Box>
      )}

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
                <Grid key={videoItem.id.videoId}>
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
    </Box>
  );
};

export default Profile;
