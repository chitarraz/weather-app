// search history item card
import React from "react";
import { useDispatch } from "react-redux";
// @mui/material
import { useTheme } from '@mui/material/styles';

import { ColorModeContext } from '../../config/color-context';
import styles from '../../assets/css/layout/main.module.css';
import Switch from "../../shared-components/Switch";
import WeatherCard from "../weather/WeatherCard";

export default function Main() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  // componentDidMount
  React.useEffect(() => {
  },[]);

  return (
    <React.Fragment>
      <div className={styles.container} data-theme={theme.palette.mode}>
        <Switch 
          checked={theme.palette.mode==="dark"}
          onChange={() => colorMode.toggleColorMode()}
        />
        <WeatherCard />
      </div>
    </React.Fragment>
  );
}
