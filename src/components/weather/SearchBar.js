// Search bar
import React from "react";
// @mui/material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// core components
import TextField from "../../shared-components/CustomTextField";
//css
import styles from '../../assets/css/weather/search.module.css';
import searchIcon from '../../assets/icons/white/search.svg';

export default function SearchBar() {
  const theme = useTheme();

  // componentDidMount
  React.useEffect(() => {
  },[]);

  return (
    <React.Fragment>
      <div className={styles.textfieldContainer}>
        <TextField
          className={styles.textfield}
          fullWidth
          id="search"
          label="Country"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode}>
          <img src={searchIcon} alt="search" className={styles.icon}/>
        </IconButton>
      </div>
    </React.Fragment>
  );
}
