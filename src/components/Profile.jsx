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
        <Button>Back to Board</Button>
      </Link>
      <PlayerCard />

      {statsView === "none" && (
        <>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
        </>
      )}

      {statsView === "game" && (
        <>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
          <Button onClick={() => setStatsView("none")}>Hide Game Stats</Button>
          <GameStats />
        </>
      )}

      {statsView === "season" && (
        <>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("scout")}>
            Show Scout Reports
          </Button>
          <Button onClick={() => setStatsView("none")}>Hide Season Stats</Button>
          <SeasonStats />
        </>
      )}

      {statsView === "scout" && (
        <>
          <Button onClick={() => setStatsView("game")}>Show Game Stats</Button>
          <Button onClick={() => setStatsView("season")}>
            Show Season Stats
          </Button>
          <Button onClick={() => setStatsView("none")}>Hide Scout Reports</Button>
          <ScoutReports />
        </>
      )}
    </Box>
  );
};

export default Profile;
