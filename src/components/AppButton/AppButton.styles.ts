import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles<void, "edgeStart" | "edgeEnd">({
  name: "appButton",
  uniqId: "kta7lJ",
})((theme, _, classes) => {
  return {
    contained: {
      boxShadow: theme.app.shadows[0],
      "&:hover": {
        boxShadow: theme.app.shadows[0],
      },
    },
    disableElevation: {
      boxShadow: "none",
      "&:hover": {
        boxShadow: theme.app.shadows[0],
      },
    },
    outlined: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    borderRadiusRounded: {
      borderRadius: theme.shape.borderRadius,
    },
    borderRadiusRoundedCircle: {
      borderRadius: "50px",
    },
    edgeStart: {
      marginLeft: theme.spacing(-2.75),
    },
    edgeEnd: {
      marginRight: theme.spacing(-2.75),
    },
    sizeSmall: {
      padding: theme.spacing(0.5, 1.25),
      [`&.${classes.edgeStart}`]: {
        marginLeft: theme.spacing(-1.25),
      },
      [`&.${classes.edgeEnd}`]: {
        marginRight: theme.spacing(-1.25),
      },
    },
    sizeMedium: {
      padding: theme.spacing(1, 2.75),
    },
    sizeLarge: {
      padding: theme.spacing(1.5, 4.25),
      [`&.${classes.edgeStart}`]: {
        marginLeft: theme.spacing(-4.25),
      },
      [`&.${classes.edgeEnd}`]: {
        marginRight: theme.spacing(-4.25),
      },
    },
  }
})

export default useStyles
