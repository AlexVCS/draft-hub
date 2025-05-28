import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useParams} from "react-router";
import {gameStats, formatGameDate} from "../helpers/helper_funcs";

const GameStats = () => {
  const player = useParams();

  const playerGameStats = gameStats.filter(
    (p) => player.playerId == p.playerId
  );

  return (
    <Paper>
      <TableContainer sx={{maxHeight: 600}}>
        <Table sx={{minWidth: 800}} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Opponent</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Rebounds</TableCell>
              <TableCell align="right">Assists</TableCell>
              <TableCell align="right">Turnovers</TableCell>
              <TableCell align="right">FG%</TableCell>
              <TableCell align="right">FT%</TableCell>
              <TableCell align="right">+/-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerGameStats.map((game) => (
              <TableRow
                key={game.gameId}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {formatGameDate(game)}
                  </Box>
                </TableCell>
                <TableCell align="center">{game.opponent}</TableCell>
                <TableCell align="center">{game.pts}</TableCell>
                <TableCell align="center">{game.reb}</TableCell>
                <TableCell align="center">{game.ast}</TableCell>
                <TableCell align="center">{game.tov}</TableCell>
                <TableCell align="center">{game["fg%"]}</TableCell>
                <TableCell align="center">{game["ft%"]}</TableCell>
                <TableCell align="center">{game.plusMinus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GameStats;
