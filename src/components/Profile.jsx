import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {bioWithRanks} from "../helpers/helper_funcs";
import {useParams} from "react-router";

const Profile = () => {
  const player = useParams();

  const foundPlayer = bioWithRanks.filter((p) => p.playerId === player.playerId);
  console.log(foundPlayer)
  
  return (
    <>
      {foundPlayer.map((player) => (
          <Card sx={{minWidth: 275}}>
            <CardContent>
              <Typography
                gutterBottom
                sx={{color: "text.secondary", fontSize: 14}}
              >
                {player.name}
              </Typography>
              {/* <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography> */}
              <Typography sx={{color: "text.secondary", mb: 1.5}}>
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))
      }
    </>
  );
};

export default Profile;
