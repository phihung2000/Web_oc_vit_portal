import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles({
  name: "appSvgIcon",
})((theme, params, classes) => {
  return {
    root: {
      fill: "currentColor",
      transition: `fill ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} 0ms`,
    },
    strokeColor: {
      fill: "none",
      stroke: "currentcolor",
      transition: `stroke ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut} 0ms`,
    },
  }
})

export default useStyles
