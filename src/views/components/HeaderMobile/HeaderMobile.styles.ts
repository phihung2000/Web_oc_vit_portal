import { FONT_NOTO_SANS } from "@/assets/fonts"
import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles({
  name: "HeaderMobile",
})(theme => {
  return {
    root: {
        width: "100%",
        backgroundColor: '#F9FBFF',
        height: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    img: {
        width: '100px',
        height: '50px',
    },
    contentUser: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    name: {
        fontFamily: FONT_NOTO_SANS,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '24px',
    }
  }
})

export default useStyles
