import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { observer, inject } from 'mobx-react';

const styles = theme => ({
  buttonsContaier: {
    position: 'absolute',
    top: '102px',
    zIndex: 10,
    backgroundColor: '#555',
    left: '60px',
    borderRadius: '2px'
  },
  small: {
    color: 'white'
  }
});

@inject('selected')
@observer
class SelectedIconsComponent extends React.Component {

  render = () => {
    const classes = this.props.classes;
    const isShow = this.props.selected.isShow;
    if (isShow) {
      return (
        <div className={classes.buttonsContaier}>
          <IconButton
            className={classes.small}
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            className={classes.small}
            >
            <CommentIcon/>
          </IconButton>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(SelectedIconsComponent);