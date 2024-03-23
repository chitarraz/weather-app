// search history item card
import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
// @mui/material
import { useTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
// css
import styles from '../../assets/css/weather/listItem.module.css';
import searchLight from '../../assets/icons/light/search.svg';
import deleteLight from '../../assets/icons/light/delete.svg';
import searchDark from '../../assets/icons/dark/search.svg';
import deleteDark from '../../assets/icons/dark/delete.svg';

export default function ListItem(props) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // componentDidMount
  React.useEffect(() => {
  },[]);

  return (
    <React.Fragment>
      <Paper elevation={0} className={styles.paper} data-theme={theme.palette.mode}>
        <Typography>Johor, MY</Typography>
        <div className={styles.rightContent}>
          <Typography className={styles.datetime} data-theme={theme.palette.mode}>{moment().format("DD-MM-YYYY hh:mm a")}</Typography>
          <IconButton className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode}>
            <img src={theme.palette.mode==='dark' ? searchDark : searchLight} alt="search" className={styles.icon}/>
          </IconButton>
          <IconButton className={styles.iconButton} aria-label="delete" size="small" data-theme={theme.palette.mode}>
            <img src={theme.palette.mode==='dark' ? deleteDark : deleteLight} alt="delete" className={styles.icon}/>
          </IconButton>
        </div>
      </Paper>
    </React.Fragment>
  );
}
