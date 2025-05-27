import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {
  bioWithRanks,
  calculateAge,
  convertToFeetInchesAndMeters,
  convertToKilos,
  seasonStats,
} from "../helpers/helper_funcs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router";
import {Box} from "@mui/material";
import PlayerCard from "./PlayerCard";

const Profile = () => {
  const player = useParams();

  const findPlayerBio = bioWithRanks.filter(
    (p) => player.playerId == p.playerId
  );
  // const findPlayerSeasonStats = seasonStats.filter(
  //   (p) => player.playerId == p.playerId
  // );

  console.log(findPlayerBio);

  return (
    <Box>
      <PlayerCard />
    </Box>
  );
};

export default Profile;
