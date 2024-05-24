import { commonHelpers } from "@/utils/helpers"
import { url } from "inspector"
import { keyframes } from "tss-react"
import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles({
  name: "home",
})(theme => {
  return {
    root: {
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "relative",
      backgroundColor: 'white',
    },
    containerMenu: {
      backgroundColor: 'rgba(121, 128, 134, 0.1)',
      display: "flex",
      flexDirection: "column",
      height: "100%",
      alignItems: "center",
      paddingTop: "20px",
    },
    contentMenu: {
      flexDirection: "column",
      height: "auto",
      alignItems: "center",
      // backgroundColor: 'rgba(121, 128, 134, 0.1)',
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",
      width: 'auto',
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    titleMenu: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      backgroundColor: 'rgba(46, 97, 113, 1)',
      width: "100%",
      paddingLeft: "20px",
      paddingRight: "20px",
      borderTopRightRadius: "10px",
      borderTopLeftRadius: "10px",
      color: 'rgba(183, 159, 173)',
    },
    content1: {
      width: "100%",
      padding: "10px",
      backgroundColor: 'white',
      borderBottom: "1px solid #f0f0f0",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    },
    content: {
      height: '100%', 
      overflow: 'auto',
      backgroundColor: 'white',
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  }
})

export default useStyles
