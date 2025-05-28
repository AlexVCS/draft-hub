import {useParams} from "react-router";
import {scoutReports} from "../helpers/helper_funcs";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const ScoutReports = () => {
  const player = useParams();

  const playerScoutReports = scoutReports.filter(
    (p) => player.playerId == p.playerId
  );
  console.log("these are the scout reports", playerScoutReports);

  return (
    <div>
      {playerScoutReports.length == 0
        ? "No scouting reports available"
        : playerScoutReports.map((report) => {
            return (
              <div key={report.reportId}>
                <Typography>{report.scout}</Typography>
                <Typography>{report.report}</Typography>
              </div>
            );
          })}
      <Typography>Add scout report</Typography>
      <TextField
        id="outlined-textarea"
        label="Scout report"
        placeholder="Scout report"
        multiline
      />
    </div>
  );
};

export default ScoutReports;
