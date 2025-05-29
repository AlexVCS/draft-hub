import {useParams} from "react-router";
import {scoutReports} from "../helpers/helper_funcs";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {InputLabel} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import {useState} from "react";

const ScoutReports = () => {
  const player = useParams();

  const playerScoutReports = scoutReports.filter(
    (p) => player.playerId == p.playerId
  );

  const [reports, setReports] = useState(playerScoutReports);
  const [scoutName, setScoutName] = useState("");
  const [reportText, setReportText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReportId = crypto.randomUUID();

    const newReport = {
      reportId: newReportId,
      playerId: player.playerId,
      scout: scoutName.trim(),
      report: reportText.trim(),
    };

    setReports([...reports, newReport]);

    setScoutName("");
    setReportText("");
  };

  console.log("these are the scout reports", playerScoutReports);

  return (
    <div>
      {reports.length == 0
        ? "No scouting reports available"
        : reports.map((report) => {
            return (
              <div key={report.reportId}>
                <Typography>Scout: {report.scout}</Typography>
                <Typography>Report: {report.report}</Typography>
              </div>
            );
          })}

      <Typography>Add scout report</Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl>
            <TextField
              label="Scout Name"
              variant="outlined"
              value={scoutName}
              placeholder="Enter your name here"
              onChange={(e) => setScoutName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Scout Report"
              variant="outlined"
              placeholder="Enter your report here"
              multiline
              rows={4}
              fullWidth
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default ScoutReports;
