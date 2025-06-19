import React from "react";
import {Card, CardContent, Typography, Box} from "@mui/material";
import { YouTubeSearchResultItem } from "../helpers/helper_funcs"; // Adjust path as needed

interface YouTubeEmbedCardProps {
  video: YouTubeSearchResultItem;
}

const YouTubeEmbedCard: React.FC<YouTubeEmbedCardProps> = ({video}) => {
  const videoId = video.id.videoId;
  const {title, description, channelTitle, publishedAt} = video.snippet;

  if (!videoId) {
    // If it's not a video (e.g., a channel or playlist), we might skip or handle differently
    return null;
  }

  // Construct the YouTube embed URL
  // `autoplay=0`: Prevents autoplay
  // `rel=0`: Prevents showing related videos from other channels at the end (though YouTube sometimes overrides this)
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;

  return (
    <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
      {/* Responsive iframe container for 16:9 aspect ratio */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9 Aspect Ratio (height / width = 9 / 16 = 0.5625)
        }}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0, // Remove iframe border
          }}
        ></iframe>
      </Box>
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle} - {new Date(publishedAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
          {description.substring(0, 100)}... {/* Truncate description */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default YouTubeEmbedCard;
