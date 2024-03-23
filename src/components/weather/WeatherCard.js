// search history item Paper
import React from "react";
// @mui/material
import { useTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// core components
import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
// css
import styles from '../../assets/css/weather/weather.module.css';
import cloud from '../../assets/images/weather/cloud.png';
import sun from '../../assets/images/weather/sun.png';

export default function WeatherPaper(props) {
  const theme = useTheme();

  // componentDidMount
  React.useEffect(() => {
  },[]);

  return (
    <React.Fragment>
      <SearchBar />
      <Paper elevation={0} className={styles.paper} data-theme={theme.palette.mode}>
        <img src={sun} className={styles.weatherImage} alt='weather'/>
        <Typography>Today's Weather</Typography>
        <Typography className={styles.temperature} data-theme={theme.palette.mode}>26°</Typography>
        <Typography>H: 29° L: 26°</Typography>
        <div className={styles.description} data-theme={theme.palette.mode}>
          <Typography className={styles.country}>Johor, MY</Typography>
          <Typography>01-09-2022 09:41am</Typography>
          <Typography>Humidity: 58%</Typography>
          <Typography>Clouds</Typography>
        </div>
        <Paper elevation={0} className={styles.container} data-theme={theme.palette.mode}>
          <Typography>Search History</Typography>
          <ListItem />
        </Paper>
      </Paper>
    </React.Fragment>
  );
}
