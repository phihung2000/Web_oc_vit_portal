import { FONT_NOTO_SANS } from "@/assets/fonts"
import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles({
  name: "home",
})(theme => {
  return {
    root: {
        width: "100%",
        backgroundColor: '#F9FBFF',
        height: 'auto',
    },
    buttonAdd: {
        width: 200, 
        height: 50, 
        fontFamily: 'Noto Sans', 
        fontSize: 16, 
        fontWeight: 500, 
        // background: 'linear-gradient(45deg, #F4DDA0, #F1C27D, #E3A857)', 
        marginBottom: 16
    },
    contentButton: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 16
    }
  }
})

export default useStyles
