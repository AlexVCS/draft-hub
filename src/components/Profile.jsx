import {Box} from "@mui/material";
import PlayerCard from "./PlayerCard";
import GameStats from "./GameStats";
import SeasonStats from "./SeasonStats";
import { useState } from "react";
import Button from "@mui/material/Button";

const Profile = () => {
  // const [showGameStats, setShowGameStats] = useState(false)
  // const [showSeasonStats, setShowSeasonStats] = useState(false)
  const [statsView, setStatsView] = useState("none"); 

  return (
    <Box>
      <PlayerCard />
      {statsView === "none" && (
        <>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
        </>
      )}

      {statsView === "game" && (
        <>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("none")}>Hide Stats</Button>
          <GameStats />
        </>
      )}

      {statsView === "season" && (
        <>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("none")}>Hide Stats</Button>
          <SeasonStats />
        </>
      )}
    </Box>
  );
};

export default Profile;
