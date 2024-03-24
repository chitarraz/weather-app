// Search bar
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// @mui/material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
// core components
import TextField from "../../shared-components/CustomTextField";
// service + store
import { GetCoordinatesByLocationName } from "../../services/WeatherService";
import { setValues } from "../../store/general";
// css
import styles from '../../assets/css/weather/search.module.css';
import searchIcon from '../../assets/icons/white/search.svg';

export default function SearchBar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const countryList = useSelector(store => store.weather.countryList);
  const [searchText, setsearchText] = React.useState('');

  const handleOnChange = (e) => {
    setsearchText(e.target.value);
  };

  const handleOnSearch = (e, value) => {
    const history = JSON.parse(localStorage.getItem("history")) ?? [];
    if (value) {  // select from dropdown
      localStorage.setItem('history', JSON.stringify([{...value, datetime: moment()}, ...history]));
      window.location.reload();
    } else if (countryList[0]) {  // press enter/button, select first result from country list
      localStorage.setItem('history', JSON.stringify([{...countryList[0], datetime: moment()}, ...history]));
      window.location.reload();
    } else {  // if no result from country list
      dispatch(setValues({error: "We couldn't find any results matching your search"}));
    }
    setsearchText('');
  };

  React.useEffect(() => {
    if (searchText !== '') {
      dispatch(GetCoordinatesByLocationName({searchText}));
    }
  },[dispatch, searchText]);

  return (
    <React.Fragment>
      <form className={styles.textfieldContainer}  onSubmit={(e) => handleOnSearch(e)}>
        <Autocomplete
          id="search"
          freeSolo
          fullWidth
          disableClearable
          className={styles.textfield}
          options={countryList}
          getOptionLabel={(option) => option.name + ", " + option.country}
          onChange={(e, value) => handleOnSearch(e, value)}
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
              onChange={(e) => handleOnChange(e)}
            />
          )}
        />
        <IconButton className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode} onClick={(e) => handleOnSearch(e)}>
          <img src={searchIcon} alt="search" className={styles.icon}/>
        </IconButton>
      </form>
    </React.Fragment>
  );
}
