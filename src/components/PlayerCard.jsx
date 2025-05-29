import Avatar from "@mui/material/Avatar";
import {useParams} from "react-router";
import {
  bioWithRanks,
  calculateAge,
  convertToFeetInchesAndMeters,
  convertToKilos,
  formatBirthDate,
} from "../helpers/helper_funcs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const PlayerCard = () => {
  const playerID = useParams();

  const findPlayerBio = bioWithRanks.filter(
    (p) => playerID.playerId == p.playerId
  );

  const player = findPlayerBio[0];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#01295C",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: {xs: "center", md: "flex-start"},
            p: 4,
            gap: 4,
            flexDirection: {xs: "column", md: "row"},
          }}
        >
          <Avatar
            alt={player.name}
            src={player.photoUrl}
            sx={{
              width: {xs: 128, md: 180},
              height: {xs: 128, md: 180},
              borderRadius: 0,
              border: "4px solid white",
              flexShrink: 0,
            }}
            variant="square"
          />

          <Box sx={{flexGrow: 1, textAlign: {xs: "center", md: "left"}}}>
            <Typography variant="body1" sx={{opacity: 0.8, mb: 1}}>
              {player.currentTeam}
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: {xs: "2.5rem", md: "3.5rem"},
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              {player.name.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            color: "#333",
            py: 3,
            px: 4,
          }}
        >
          <Grid container spacing={{xs: 5, md: 2}}>
            <Grid item xs={2} md={4}>
              <Grid container spacing={{xs: 6, md: 3}}>
                <Grid item xs={7}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    HEIGHT
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {convertToFeetInchesAndMeters(findPlayerBio[0])}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    WEIGHT
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {player.weight}lb {convertToKilos(player)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    COUNTRY
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {player.homeCountry}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    LAST ATTENDED
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {player.currentTeam}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    AGE
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {calculateAge(player)} years
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block", textAlign: "center"}}
                  >
                    BIRTHDATE
                  </Typography>
                  <Typography variant="body1" sx={{textAlign: "center"}}>
                    {formatBirthDate(player)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    sx={{color: "#666", display: "block"}}
                  >
                    AVG. SCOUT RANKING
                  </Typography>
                  <Typography sx={{textAlign: "center"}} variant="body1">
                    {Math.round(player.averageRank)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PlayerCard;

{
  /* // <Card
    //   key={player.playerId}
    //   variant="outlined"
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: {xs: "center", md: "flex-start"},
    //     // minWidth: 300,
    //   }}
    // >
    //   <CardContent
    //     sx={{
    //       display: "flex",
    //       flexDirection: {xs: "column", md: "row"},
    //       alignItems: {xs: "center", md: "flex-start"},
    //       textAlign: "center",
    //       gap: "2px",
    //     }}
    //   >
    //     <Avatar
    //       alt={player.name}
    //       src={player.photoUrl}
    //       sx={{width: 128, height: 128}}
    //       variant="square"
    //     />
    //     <Typography variant="h6" sx={{mb: 2}}>
    //       {player.name}
    //     </Typography>
    //     <Typography>AGE</Typography>
    //     <Typography sx={{mb: 2}}>{calculateAge(player)}</Typography>
    //     <Typography>HEIGHT</Typography>
    //     <Typography sx={{mb: 2}}>
    //       {convertToFeetInchesAndMeters(player)}
    //     </Typography>
    //     <Typography>WEIGHT</Typography>
    //     <Typography sx={{mb: 2}}>
    //       {player.weight}lb {convertToKilos(player)}
    //     </Typography>
    //     <Typography>BIRTHDATE</Typography>
    //     <Typography sx={{mb: 2}}>{formatBirthDate(player)}</Typography>
    //     <Typography>COLLEGE/TEAM</Typography>
    //     <Typography sx={{mb: 2}}>{player.currentTeam}</Typography>
    //     <Typography>AVG. SCOUTS RANKING</Typography>
    //     <Typography>{Math.round(player.averageRank)}</Typography>
    //     {/* {findPlayerSeasonStats.map((player) => (
    //     <Typography key={player.playerId}>
    //       {player.PTS}
    //     </Typography>
    //   ))} */
}
//   </CardContent>
// </Card> */}
