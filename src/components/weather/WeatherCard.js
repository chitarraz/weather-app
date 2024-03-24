// search history item Paper
import React, {useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
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
import { GetCurrentWeatherData } from "../../services/WeatherService";
import { setValues } from "./store";

export default function WeatherPaper() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentWeather = useSelector(store => store.weather.currentWeather);
  const history = useSelector(store => store.weather.history);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // define constants
  const display = useMemo(() => history[0] ?? {}, [history]);
  const weatherImg = [
    {value: 'Clouds', img: cloud},
    {value: 'Sun', img: sun},
  ];

  const getWeatherImg = () => {
    const weather = weatherImg.find(({value}) => value === (currentWeather.weather && [0] && currentWeather.weather[0].main))
    if (weather) {
      return weather.img;
    } else {
      return weatherImg[0].img;
    }
  }

  React.useEffect(() => {
    if (display.lat && display.lon) {
      dispatch(GetCurrentWeatherData({lat: display.lat, lon: display.lon}));
    }
  },[dispatch, display, history]);

  // componentDidMount
  React.useEffect(() => {
    let payload = JSON.parse(localStorage.getItem("history")) ?? [];
    if (payload.length) {
      payload[0] = {...payload[0], datetime: moment()}; // update date time
    }
    localStorage.setItem('history', JSON.stringify(payload)); // update local storage
    dispatch(setValues({history: payload ?? []}));
    var timer = setTimeout(
      () => setIsLoading(false), 
      1000
    );
    return () => {
      clearTimeout(timer);
    }
  },[dispatch]);

  return (
    <React.Fragment>
      <SearchBar />
      {!_.isEmpty(currentWeather) && !_.isEmpty(display)
      ? <Paper elevation={0} className={[styles.paper, styles.paperMargin]} data-theme={theme.palette.mode}>
          <img src={getWeatherImg()} className={styles.weatherImage} alt='weather'/>
          <Typography>Today's Weather</Typography>
          <Typography className={styles.temperature} data-theme={theme.palette.mode}>{currentWeather.main && currentWeather.main.temp.toFixed(1)}°</Typography>
          <Typography>H: {currentWeather.main && currentWeather.main.temp_max.toFixed(1)}° L: {currentWeather.main && currentWeather.main.temp_min.toFixed(1)}°</Typography>
          <div className={styles.description} data-theme={theme.palette.mode}>
            <Typography className={styles.country}>{display.name + ', ' + display.country}</Typography>
            <Typography>{moment().format('DD-MM-YYYY hh:mm a')}</Typography>
            <Typography>Humidity: {currentWeather.main && currentWeather.main.humidity}%</Typography>
            <Typography>{currentWeather.weather && [0] && currentWeather.weather[0].main}</Typography>
          </div>
          <Paper elevation={0} className={styles.container} data-theme={theme.palette.mode}>
            <Typography>Search History</Typography>
            <div className={styles.listContainer}>
            {history.length > 1
            ? history.map((item, index) => {
                if (index > 0) {  // skip first history
                  return <ListItem key={index} item={item} index={index} />
                }
                return null
              })
            : <Typography className={styles.noResult} data-theme={theme.palette.mode}>No results</Typography>
            }
            </div>
          </Paper>
        </Paper>
      : <Paper elevation={0} className={styles.paper} data-theme={theme.palette.mode}>
          <Typography className={styles.noResult} data-theme={theme.palette.mode}>{isLoading ? 'Loading...' : 'No results'}</Typography>
        </Paper>
      }
    </React.Fragment>
  );
}
