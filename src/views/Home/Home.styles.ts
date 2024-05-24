import { FONT_NOTO_SANS } from "@/assets/fonts"
import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles({
  name: "home",
})(theme => {
  return {
    root: {
        width: "100%",
        backgroundColor: '#F9FBFF',
    },
    header: {
        width: "100%",
        backgroundColor: '#F9FBFF',
        paddingLeft: 16,
        paddingRight: 16,
    },
    containerBody: {
      backgroundColor: 'yellow',
      display: 'flex',
      flexDirection: 'row',
      width: "100%",
    },
    containerLeft: {
        width: "100%",
        backgroundColor: '#F9FBFF',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        paddingTop: 32,
    },
    containerRight: {
        width: "100%",
        backgroundColor: '#F9FBFF',
        display: 'flex',
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    contentLeft: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 16,
        gap: 16,
    },
    buttonManager: {
        width: '100%',
        height: 50,
        fontFamily: FONT_NOTO_SANS,
        fontSize: 16,
        fontWeight: 500,
        background: 'linear-gradient(45deg, #F4DDA0, #F1C27D, #E3A857)',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    title: {
      fontFamily: FONT_NOTO_SANS,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: '32px',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    containerModal: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      height: '30%',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      margin: 'auto',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    },
    titleAsk: {
      fontFamily: FONT_NOTO_SANS,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: '32px',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      paddingTop: 32,
    },
    contentModal: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      width: '100%',
      padding: 16,
    },
    buttonCancel: {
      width: '40%',
      height: 50,
      fontFamily: FONT_NOTO_SANS,
      fontSize: 16,
      fontWeight: 500,
      backgroundColor: '#F4DDA0',
    },
    buttonSuccess: {
      width: '40%',
      height: 50,
      fontFamily: FONT_NOTO_SANS,
      fontSize: 16,
      fontWeight: 500,
      background: 'linear-gradient(45deg, #F4DDA0, #F1C27D, #E3A857)',
    },
  }
})

export default useStyles
