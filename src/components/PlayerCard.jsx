import Avatar from "@mui/material/Avatar";
import {useParams} from "react-router";
import {
  bioWithRanks,
  calculateAge,
  convertToFeetInchesAndMeters,
  convertToKilos,
  formatBirthDate,
} from "../helpers/helper_funcs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PlayerCard = () => {
  const player = useParams();

  const findPlayerBio = bioWithRanks.filter(
    (p) => player.playerId == p.playerId
  );
  return (
    <>
      {findPlayerBio.map((player) => (
        <Card
          key={player.playerId}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 300,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "2px",
            }}
          >
            <Avatar
              alt={player.name}
              src={player.photoUrl}
              sx={{width: 128, height: 128}}
              variant="square"
            />
            <Typography variant="h6" sx={{mb: 2}}>
              {player.name}
            </Typography>
            <Typography>AGE</Typography>
            <Typography sx={{mb: 2}}>{calculateAge(player)}</Typography>
            <Typography>HEIGHT</Typography>
            <Typography sx={{mb: 2}}>
              {convertToFeetInchesAndMeters(player)}
            </Typography>
            <Typography>WEIGHT</Typography>
            <Typography sx={{mb: 2}}>
              {player.weight}lb {convertToKilos(player)}
            </Typography>
            <Typography>BIRTHDATE</Typography>
            <Typography sx={{mb: 2}}>{formatBirthDate(player)}</Typography>
            <Typography>COLLEGE/TEAM</Typography>
            <Typography sx={{mb: 2}}>{player.currentTeam}</Typography>
            <Typography>AVG. SCOUTS RANKING</Typography>
            <Typography>{Math.round(player.averageRank)}</Typography>
            {/* {findPlayerSeasonStats.map((player) => (
            <Typography key={player.playerId}>
              {player.PTS}
            </Typography>
          ))} */}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PlayerCard;
