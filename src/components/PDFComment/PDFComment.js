import React from 'react';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Comment from '@material-ui/icons/Comment.js';
import { Divider } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import icon from '../App/avator.jpeg';
import IconButton from 'material-ui/IconButton';
import MoreVert from '@material-ui/icons/MoreVert.js';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#F9F9F9',
    position: 'fixed',
    overflow: 'auto',
    minHeight: '100vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  li: {
    backgroundColor: '#fff'
  }
});


class PDFCommentComponent extends React.Component {
  render = () => {
    const classes = this.props.classes;
    return (
      <List
        className={classes.root}
        component="nav"
      >
        <ListItem>
          <ListItemIcon>
            <Comment/>
          </ListItemIcon>
          <ListItemText primary='Comment' />
        </ListItem>
        <Divider inset/>
        <ListItem
          className={classes.li}
          divider
        >
          <ListItemAvatar>
            <Avatar
            alt="Remy Sharp"
            src={icon}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary={
              <p>
                Greyhound divisively hello coldly wonderfully
                marginally far upon excluding.
                <span>@L123</span>
              </p>
            }
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit">
              <MoreVert />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(PDFCommentComponent);