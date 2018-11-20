import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from "prop-types"
import classNames from "classnames"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import WarningIcon from "@material-ui/icons/Warning"
import { withStyles } from "@material-ui/core/styles"
import { showNotification } from "../../actions/NotificationActionCreater"

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
})

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

const Notification = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    props.showNotification(false, "", props.notificationNature)
  }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={props.notificationIsShown}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={props.notificationNature}
            message={props.notificationMessage}
          />
        </Snackbar>
      </div>
    )
  }

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showNotification }, dispatch)

const mapStateToProps = state => {
  const { notificationReducer } = state
  const { isShown, message, nature } = notificationReducer
  return {
    notificationIsShown: isShown,
    notificationMessage: message,
    notificationNature: nature,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

