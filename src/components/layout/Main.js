// search history item card
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// @mui/material
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// store
import { setValues } from "../../store/general";
// css
import { ColorModeContext } from '../../config/color-context';
import styles from '../../assets/css/layout/main.module.css';
import Switch from "../../shared-components/Switch";
import WeatherCard from "../weather/WeatherCard";

export default function Main() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const error = useSelector(store => store.general.error);

  // componentDidMount
  React.useEffect(() => {
  },[]);

  return (
    <React.Fragment>
      <div className={styles.container} data-theme={theme.palette.mode}>
        <div className={styles.switch}>
          <Switch 
            checked={theme.palette.mode==="dark"}
            onChange={() => colorMode.toggleColorMode()}
          />
        </div>
        <WeatherCard />
      </div>
      <Snackbar 
        open={error !== false} 
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000} 
        onClose={()=>dispatch(setValues({error: false}))}
      >
        <Alert severity="error" elevation={6} variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
