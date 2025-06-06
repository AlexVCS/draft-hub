import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useParams} from "react-router";
import {seasonStats} from "../helpers/helper_funcs";

const SeasonStats = () => {
  const player = useParams();

  const playerSeasonStats = seasonStats.filter(
    (p) => player.playerId == p.playerId
  );

  return (
    <Paper>
      <TableContainer sx={{maxHeight: 600}}>
        <Table
          sx={{minWidth: {sm: 600, md: 900, lg: 1300}}}
          stickyHeader
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Season</TableCell>
              <TableCell align="center">League</TableCell>
              <TableCell align="center">Points</TableCell>
              <TableCell align="center">Rebounds</TableCell>
              <TableCell align="center">Assists</TableCell>
              <TableCell align="center">Turnovers</TableCell>
              <TableCell align="center">FG%</TableCell>
              <TableCell align="center">3P%</TableCell>
              <TableCell align="center">eFG%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerSeasonStats.map((player) => (
              <TableRow
                key={player.age}
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
                    {player.Season}
                  </Box>
                </TableCell>
                <TableCell align="center">{player.League}</TableCell>
                <TableCell align="center">{player.PTS}</TableCell>
                <TableCell align="center">{player.TRB}</TableCell>
                <TableCell align="center">{player.AST}</TableCell>
                <TableCell align="center">{player.TOV}</TableCell>
                <TableCell align="center">{player["FG%"]}</TableCell>
                <TableCell align="center">{player["3P%"]}</TableCell>
                <TableCell align="center">{player["eFG%"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SeasonStats;
