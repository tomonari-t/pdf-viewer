import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add.js';
import RemoveIcon from '@material-ui/icons/Remove';
import { inject } from 'mobx-react';

const styles = {
  btnContainer: {
    position: 'fixed',
    left: '70%',
    bottom: '10px',
    zIndex: 10
  },
  btn: {
    marginTop: '10px'
  }
};

@inject('pdfViewer')
class PDFControllerComponent extends React.Component {

  zoomUp = () => {
    this.props.pdfViewer.scaleUp();
  }

  zoomDown = () => {
    this.props.pdfViewer.scaleDown();
  }

  render = () => {
    const classes = this.props.classes;
    return (
      <div className={classes.btnContainer}>
      <div className={classes.btn}>
        <Button mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
          <NavigateBeforeIcon />
        </Button>
      </div>
      <div className={classes.btn}>
        <Button onClick={this.zoomUp} mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
      </div>
      <div className={classes.btn}>
        <Button onClick={this.zoomDown}  mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
          <RemoveIcon />
        </Button>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(PDFControllerComponent);
