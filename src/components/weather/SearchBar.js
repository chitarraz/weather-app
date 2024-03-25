// Search bar
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
// @mui/material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
// core components
import TextField from "../../shared-components/CustomTextField";
// service + store
import { GetCoordinatesByLocationName } from "../../services/WeatherService";
import { setValues } from "../../store/general";
import { setValues as setWeatherValues } from "./store";
// css
import styles from '../../assets/css/weather/search.module.css';
import searchIcon from '../../assets/icons/white/search.svg';

export default function SearchBar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const countryList = useSelector(store => store.weather.countryList);
  const history = useSelector(store => store.weather.history);
  const [searchText, setSearchText] = React.useState('');

  const handleOnEnter = (e) => {
    e.preventDefault();
    if (e.target[0] && e.target[0].value !== '') {
      dispatch(GetCoordinatesByLocationName({searchText: e.target[0].value}))
      .then((response) => {
        if (!response.error && response.payload.length) {
          handleOnSearch(response.payload[0]);
        }
      });
    } 
  }

  const handleOnSearch = (value) => {
    let payload = _.cloneDeep(history);
    if (typeof value === 'object') {
      const exists = payload.findIndex((item) => item.country === value.country && item.name === value.name); // get index
      if (exists !== -1) {  // if search alr exists in history
        payload[exists] = {...payload[exists], datetime: moment().format()}; // update new date time
        payload.unshift(payload.splice(exists, 1)[0]); // move to first in array
        localStorage.setItem('history', JSON.stringify(payload));
        dispatch(setWeatherValues({history: payload}));
      } else {
        localStorage.setItem('history', JSON.stringify([{...value, datetime: moment().format()}, ...payload]));
        dispatch(setWeatherValues({history: [{...value, datetime: moment().format()}, ...payload]}));

      }
    } else if (!value) {  // if no value
      dispatch(setValues({error: "We couldn't find any results matching your search"}));
    }
    setSearchText('');
  };

  React.useEffect(() => {
    const controller = new AbortController();
    if (searchText !== '') {
      var timer = setTimeout(
        () => dispatch(GetCoordinatesByLocationName({searchText, signal: controller.signal})), 
        1000
      );
    }
    return () => {
      controller.abort();
      clearTimeout(timer);
    }
  },[dispatch, searchText]);

  return (
    <React.Fragment>
      <form className={styles.textfieldContainer} onSubmit={(e) => handleOnEnter(e)}>
        <Autocomplete
          id="search"
          freeSolo
          fullWidth
          disableClearable
          className={styles.textfield}
          options={countryList}
          getOptionLabel={(option) => option.name ? option.name + ", " + option.country : option}
          onChange={(e, value) => handleOnSearch(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="search"
              label="Country"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
        />
        <IconButton type="submit" className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode}>
          <img src={searchIcon} alt="search" className={styles.icon}/>
        </IconButton>
      </form>
    </React.Fragment>
  );
}
