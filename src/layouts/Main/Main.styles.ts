import { keyframes } from "tss-react"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles({
  name: "main",
})(theme => {
  return {
    root: {
      // height: "100vh",
      // overflow: "hidden",
      backgroundColor: "white",
    },
  }
})

export default useStyles
