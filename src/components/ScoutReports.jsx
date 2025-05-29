import {useParams} from "react-router";
import {scoutReports} from "../helpers/helper_funcs";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {useState} from "react";

const ScoutReports = () => {
  const player = useParams();

  const playerScoutReports = scoutReports.filter(
    (p) => player.playerId == p.playerId
  );

  const [reports, setReports] = useState(playerScoutReports);
  const [scoutName, setScoutName] = useState("");
  const [reportText, setReportText] = useState("");
  const [scoutNameError, setScoutNameError] = useState(false);
  const [scoutNameHelperText, setScoutNameHelperText] = useState("");
  const [reportTextError, setReportTextError] = useState(false);
  const [reportTextHelperText, setReportTextHelperText] = useState("");


  const handleScoutNameChange = (e) => {
    const newValue = e.target.value;
    setScoutName(newValue);

    if (newValue.trim() === "") {
      setScoutNameError(true);
      setScoutNameHelperText(
        "Scout Name cannot be just spaces."
      );
    } else {
      setScoutNameError(false);
      setScoutNameHelperText("");
    }
  };

  const handleReportTextChange = (e) => {
    const newValue = e.target.value;
    setReportText(newValue);

    if (newValue.trim() === "") {
      setReportTextError(true);
      setReportTextHelperText(
        "Scout Report cannot be just spaces."
      );
    } else {
      setReportTextError(false);
      setReportTextHelperText("");
    }
  };

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

  const isSubmitDisabled =
    scoutNameError ||
    reportTextError ||
    scoutName.trim() === "" ||
    reportText.trim() === "";

  return (
    <div>
      <Box
        sx={{
          p: {xs: 2, md: 4},
          bgcolor: "white",
          color: "#333",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "#333",
            mb: 0.5,
          }}
        >
          SCOUTING REPORT
        </Typography>

        <Box
          sx={{
            width: "80px",
            height: "4px",
            backgroundColor: "#007bff",
            mb: {xs: 2, md: 3},
          }}
        />

        {reports.map((report, index) => (
          <Box
            key={report.reportId}
            sx={{
              mb: index < reports.length - 1 ? {xs: 2, md: 3} : 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: "#333",
                mb: 1,
              }}
            >
              Scout: {report.scout}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#333",
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              Report: {report.report}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h6" sx={{pl: {xs: 2, md: 4}}}>
        ADD SCOUTING REPORT
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pl: {xs: 2, md: 4},
            pt: 2,
            maxWidth: "sm",
          }}
        >
          <FormControl>
            <TextField
              label="Scout Name"
              variant="outlined"
              value={scoutName}
              placeholder="Enter your name here"
              onChange={handleScoutNameChange}
              required
              fullWidth
              error={scoutNameError}
              helperText={scoutNameHelperText}
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
              onChange={handleReportTextChange}
              required
              error={reportTextError}
              helperText={reportTextHelperText}
            />
          </FormControl>
          <Button disabled={isSubmitDisabled} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ScoutReports;
