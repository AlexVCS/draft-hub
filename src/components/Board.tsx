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
import Button from "@mui/material/Button";
import {Link} from "react-router";
import Header from "./Header";
import {useCallback, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {
  convertToFeetInchesAndMeters,
  convertToKilos,
} from "../helpers/helper_funcs";
import {
  Checkbox,
  Fab,
  TableSortLabel,
  useScrollTrigger,
  Zoom,
} from "@mui/material";
import {KeyboardArrowUp} from "@mui/icons-material";

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
    top_prospect?: boolean;
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

const getProspects = async (): Promise<ProspectData> => {
  try {
    const baseUrl = import.meta.env.DEV
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;
    console.log("this is the baseUrl", baseUrl);
    const url = `${baseUrl}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(`This call didn't work, this is the ${error}`);
    throw error;
  }
};

const getTopProspects = async (): Promise<ProspectData> => {
  try {
    const baseUrl = import.meta.env.DEV
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;
    console.log("this is the baseUrl", baseUrl);
    const url = `${baseUrl}/topprospects`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(`This call didn't work, this is the ${error}`);
    throw error;
  }
};

const Board = () => {
  const [showTopProspectsFirst, setShowTopProspectsFirst] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const {
    isLoading: topProspectsLoading,
    data: topProspects,
    error: topProspectsError,
  } = useQuery({
    queryKey: ["topProspects"],
    queryFn: () => getTopProspects(),
    staleTime: Infinity,
  });

  const {
    isLoading: ProspectsLoading,
    data: allProspects,
    error: prospectsError,
  } = useQuery({
    queryKey: ["allProspects"],
    queryFn: () => getProspects(),
    staleTime: Infinity,
  });

  const getSortedProspects = () => {
    if (!allProspects?.prospects) return [];

    return [...allProspects.prospects].sort((a, b) => {
      if (showTopProspectsFirst) {
        if (a.top_prospect && !b.top_prospect) return -1;
        if (!a.top_prospect && b.top_prospect) return 1;
        return 0;
      } else {
        if (a.top_prospect && !b.top_prospect) return 1;
        if (!a.top_prospect && b.top_prospect) return -1;
        return 0;
      }
    });
  };

  if (topProspectsLoading || ProspectsLoading) return <h1>Loading...</h1>;
  if (topProspectsError || prospectsError)
    return <h1>{topProspectsError?.message || prospectsError?.message}</h1>;

  const sortedProspects = getSortedProspects();

  return (
    <Paper>
      <Header />
      <Box sx={{display: "flex", justifyContent: "center", p: 2}}>
        <Button
          variant={showTopProspectsFirst ? "contained" : "outlined"}
          onClick={() => setShowTopProspectsFirst(!showTopProspectsFirst)}
          sx={{mr: 2}}
        >
          {showTopProspectsFirst
            ? "Toggle Top Prospects Last"
            : "Toggle Top Prospects First"}
        </Button>
      </Box>

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
                <TableCell align="center">
                  Top Prospect
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{fontSize: "10px", opacity: 0.7}}
                  >
                    ({showTopProspectsFirst ? "Showing first" : "Showing last"})
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProspects.map((player) => (
                <TableRow
                  component={Link}
                  to={`/player/${player.id}/${player.name
                    .toLowerCase()
                    .replace(/\.|'/g, "")
                    .split(" ")
                    .filter((letter) => letter !== ".")
                    .join("-")}`}
                  key={player.id}
                  sx={{
                    "&:last-child td, &:last-child th": {border: 0},
                    backgroundColor: player.top_prospect
                      ? "rgba(76, 175, 80, 0.05)"
                      : "inherit",
                  }}
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
                          fontWeight: player.top_prospect ? 600 : 400,
                        }}
                      >
                        {player.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{player.team_name}</TableCell>
                  <TableCell align="center">
                    {convertToFeetInchesAndMeters(player)}
                  </TableCell>
                  <TableCell align="center">
                    {player.weight}lb {convertToKilos(player)}
                  </TableCell>
                  <TableCell align="center">{player.position}</TableCell>
                  <TableCell align="center">
                    {player.top_prospect && (
                      <Checkbox defaultChecked color="success" />
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
