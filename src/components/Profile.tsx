import {Box} from "@mui/material";
import PlayerCard from "./PlayerCard";
import GameStats from "./GameStats";
import SeasonStats from "./SeasonStats";
import {useState} from "react";
import {Link} from "react-router";
import Button from "@mui/material/Button";
import ScoutReports from "./ScoutReports";

const Profile = () => {
  const [statsView, setStatsView] = useState("none");

  return (
    <Box>
      <Link to={"/"}>
        <Button variant="contained">Back to Board</Button>
      </Link>

      <PlayerCard />

      {statsView === "none" && (
        <Box component="span" sx={{pl: {xs: 2, md: 3}}}>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
        </Box>
      )}

      {statsView === "game" && (
        <Box component="span" sx={{pl: 3}}>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
          <Button onClick={() => setStatsView("none")}>Hide Game Stats</Button>
          <GameStats />
        </Box>
      )}

      {statsView === "season" && (
        <Box component="span" sx={{pl: 3}}>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
          <Button onClick={() => setStatsView("none")}>
            Hide Season Stats
          </Button>
          <SeasonStats />
        </Box>
      )}

      {statsView === "scout" && (
        <Box component="span" sx={{pl: 3}}>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("none")}>
            Hide Scout Reports
          </Button>
          <ScoutReports />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
