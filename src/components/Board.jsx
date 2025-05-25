import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import {bioWithRanks} from "../helpers/helper_funcs";

console.log("these are the bioWithRanks", bioWithRanks);

const Board = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ESPN Rank</TableCell>
            <TableCell align="right">Sam Vecenie Rank</TableCell>
            <TableCell align="right">Kevin O'Connor Rank</TableCell>
            <TableCell align="right">Kyle Boone Rank</TableCell>
            <TableCell align="right">Gary Parrish Rank</TableCell>
            <TableCell align="right">Growth Potential</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bioWithRanks.map((player) => (
            <TableRow
              key={player.name}
              sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
              <TableCell component="th" scope="row">
                <Avatar alt={player.name} src={player.photoUrl} />
                {player.name}
              </TableCell>
              <TableCell align="right">{player["ESPN Rank"]}</TableCell>
              <TableCell align="right">{player["Sam Vecenie Rank"]}</TableCell>
              <TableCell align="right">
                {player["Kevin O'Connor Rank"]}
              </TableCell>
              <TableCell align="right">{player["Kyle Boone Rank"]}</TableCell>
              <TableCell align="right">{player["Gary Parrish Rank"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Board;
