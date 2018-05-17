import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { informClose } from "../actions";
import { connect } from "react-redux";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class Inform extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.props.informClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.informOpen}
          autoHideDuration={10000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.props.informMessages.map(object => {
                return object += ". ";
              })}
            </span>
          }
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

Inform.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    informOpen: state.informReducer.inform.open,
    informMessages: state.informReducer.inform.messages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    informClose: () => {
      return dispatch(informClose());
    }
  };
};

// export default withStyles(styles)(Inform);
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Inform)
);
