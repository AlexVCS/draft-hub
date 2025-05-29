import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {bioWithRanks} from "../helpers/helper_funcs";
import {Link} from "react-router";
import Header from "./Header";
import {useEffect} from "react";

const Board = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Paper>
      <Header />
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <TableContainer sx={{maxHeight: 600}}>
          <Table
            sx={{minWidth: {sm: 600, md: 900, lg: 1300}}}
            stickyHeader
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">ESPN Rank</TableCell>
                <TableCell align="center">Sam Vecenie Rank</TableCell>
                <TableCell align="center">Kevin O'Connor Rank</TableCell>
                <TableCell align="center">Kyle Boone Rank</TableCell>
                <TableCell align="center">Gary Parrish Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bioWithRanks.map((player) => (
                <TableRow
                  component={Link}
                  to={`/player/${player.playerId}/${player.name
                    .toLowerCase()
                    .replace(/\.|'/g, "")
                    .split(" ")
                    .filter((letter) => letter !== ".")
                    .join("-")}`}
                  key={player.playerId}
                  sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: {xs: "80px", md: "auto"},
                        maxWidth: {xs: "120px", md: "none"},
                      }}
                    >
                      <Avatar
                        sx={{padding: 0, alignSelf: "center"}}
                        alt={player.name}
                        src={player.photoUrl}
                      />
                      <Typography
                        sx={{
                          paddingTop: 1,
                          fontSize: {
                            xs: "12px",
                            md: "14px",
                            textAlign: "center",
                            lineHeight: 1.2,
                            wordBreak: "break-word",
                            hyphens: "auto",
                          },
                        }}
                      >
                        {player.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {player["ESPN Rank"]}
                    <br />
                    {typeof player["ESPN Rank"] === "number" &&
                    player["ESPN Rank"] <= 20 ? (
                      <Box
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Top 20
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {player["Sam Vecenie Rank"]}
                    <br />
                    {typeof player["Sam Vecenie Rank"] === "number" &&
                    player["Sam Vecenie Rank"] <= 20 ? (
                      <Box
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Top 20
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {player["Kevin O'Connor Rank"]}
                    <br />
                    {typeof player["Kevin O'Connor Rank"] === "number" &&
                    player["Kevin O'Connor Rank"] <= 20 ? (
                      <Box
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Top 20
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {player["Kyle Boone Rank"]}
                    <br />
                    {typeof player["Kyle Boone Rank"] === "number" &&
                    player["Kyle Boone Rank"] <= 20 ? (
                      <Box
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Top 20
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {player["Gary Parrish Rank"]}
                    <br />
                    {typeof player["Gary Parrish Rank"] === "number" &&
                    player["Gary Parrish Rank"] <= 20 ? (
                      <Box
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Top 20
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default Board;
