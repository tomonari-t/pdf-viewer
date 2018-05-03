import React from 'react';
import './App.scss';
import PDFViewerComponent from '../PDFViewer/PDFViewer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import icon from './avator.jpeg';
import ArrowBack from '@material-ui/icons/ArrowBack.js';
import MoreVert from '@material-ui/icons/MoreVert.js';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';
import PDFComment from '../PDFComment/PDFComment';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingTop: 64
  },
  pdfcomment: {
    minHeight: '100vh'
  }
};

class App extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={this.props.classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton>
              <ArrowBack/>
            </IconButton>
            <div
              className={this.props.classes.flex}
            ></div>
            <IconButton>
              <MoreVert />
            </IconButton>
            <IconButton
            aria-haspopup="true"
            color="inherit"
            >
              <Avatar
              alt="user"
              src={icon}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid
          container spacing={0}
          className={this.props.classes.content}
        >
          <Grid item xs={9}>
            <PDFViewerComponent />
          </Grid>
          <Grid
            item xs={3}
            className={classes.pdfcomment}
          >
            <PDFComment></PDFComment>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
