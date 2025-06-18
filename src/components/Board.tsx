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
import {Link} from "react-router";
import Header from "./Header";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import { convertToFeetInchesAndMeters, convertToKilos } from "../helpers/helper_funcs";

interface ProspectData {
  prospects: {
    id: string;
    source_id: string;
    first_name: string;
    last_name: string;
    name: string;
    position: string;
    height: number;
    weight: number;
    experience: string;
    birth_place: string;
    team_name: string;
    conference: {
      id: string;
      name: string;
      alias: string;
    };
    division: {
      id: string;
      name: string;
      alias: string;
    };
    team: {
      id: string;
      name: string;
      market: string;
      alias: string;
    };
  }[];
}


const Board = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const getProspects = async (): Promise<ProspectData> => {
    try {
      const baseUrl = import.meta.env.DEV
        ? import.meta.env.VITE_API_URL_DEV
        : import.meta.env.VITE_API_URL_PROD;
      console.log('this is the baseUrl', baseUrl)
      const url = `${baseUrl}`;
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error(`This call didn't work, this is the ${error}`);
      throw error;
    }
  };

  const {isLoading, data, error} = useQuery({
    queryKey: ["prospects"],
    queryFn: () => getProspects(),
    staleTime: Infinity,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{JSON.stringify(error)}</h1>;
  if (!data) return <h1>Didn't receive any prospects</h1>;
  const {prospects} = data;


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
                <TableCell align="center">School/Team</TableCell>
                <TableCell align="center">Height</TableCell>
                <TableCell align="center">Weight</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Top Prospect</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prospects.map((player) => (
                <TableRow
                  component={Link}
                  to={`/player/${player.id}/${player.name
                    .toLowerCase()
                    .replace(/\.|'/g, "")
                    .split(" ")
                    .filter((letter) => letter !== ".")
                    .join("-")}`}
                  key={player.id}
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
                      {/* <Avatar
                        sx={{padding: 0, alignSelf: "center"}}
                        alt={player.name}
                        src={player.photoUrl}
                      /> */}
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
                    {player.team_name}
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
                    {convertToFeetInchesAndMeters(player)}
                  </TableCell>
                  <TableCell align="center">
                    {player.weight}lb {convertToKilos(player)}
                  </TableCell>
                  <TableCell align="center">
                    {player.position}
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
