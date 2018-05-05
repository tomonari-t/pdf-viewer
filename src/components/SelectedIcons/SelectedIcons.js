import React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { observer, inject } from 'mobx-react';
import { autorun } from 'mobx';

const styles = theme => ({
  buttonsContaier: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#555',
    borderRadius: '2px'
  },
  small: {
    color: 'white'
  }
});

@inject('pdfViewer', 'selected')
@observer
class SelectedIconsComponent extends React.Component {

  getPosition = (rects, offset) => {
    const firstRectIndex = rects.length - 1;
    let { x } = rects[firstRectIndex];
    const pageNum = this.props.selected.pageNum;
    const viewport = this.props.pdfViewer.viewport;
    const pageHeight = viewport.height;
    const lineHeight = rects[firstRectIndex].height;
    const OFFSET_Y = 5;
    x = x + (rects[firstRectIndex].width/2);
    const y = offset.y  + ((pageNum - 1) * pageHeight) + lineHeight + OFFSET_Y;
    return { x, y };
  }

  render() {
    const classes = this.props.classes;
    const selectedRects = this.props.selected.getSelectedRects();
    if (selectedRects.rects) {
      const { x, y } = this.getPosition(selectedRects.rects, selectedRects.offset);
      const buttonPosition = {top: `${y}px`, left: `${x}px`};
      return (
        <div className={classes.buttonsContaier} style={buttonPosition}>
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