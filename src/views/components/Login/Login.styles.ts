import { FONT_NOTO_SANS } from "@/assets/fonts"
import { makeStyles } from "tss-react/mui"


const useStyles = makeStyles({
  name: "Login",
})(theme => {
  return {
    root: {
          width: "100%",
          backgroundColor: "rgba(249, 251, 255, 1)",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
      },
      containerViewInfo: {
          height: '200px',
          backgroundColor: 'red',
      },
      title: {
          fontFamily: FONT_NOTO_SANS,
          fontSize: 32,
          fontWeight: '500',
          lineHeight: '48px',
          color: 'rgba(0, 74, 173, 1)',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          paddingTop: 24,
          paddingBottom: 16,
      },
      linkSigIn: {
          color: 'rgba(24, 134, 231, 1)',
          textDecoration: 'underline',
      },
      contentInput: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 16,
          paddingLeft: 16,
          paddingRight: 16,
      },
      codeCountry: {
          fontFamily: FONT_NOTO_SANS,
          fontSize: 10,
          fontWeight: '500',
          lineHeight: '15px',
          color: 'rgba(231, 105, 24, 1)',
          padding: 2,
          backgroundColor: 'rgba(253, 243, 237, 1)'
      },
      buttonLogin: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
          gap: 16,
          padding: 16,
          borderRadius: 50,
          backgroundColor: 'rgba(226, 226, 226, 1)',
          fontFamily: FONT_NOTO_SANS,
          fontSize: 16,
          fontWeight: '500',
          lineHeight: '24px',
          color: 'rgba(167, 167, 167, 1)',
          boxShadow: 'none',
          '&:hover': {
              backgroundColor: 'rgba(226, 226, 226, 1)',
              boxShadow: 'none',
          },
      },
      buttonLoginActivities: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
          gap: 16,
          padding: 16,
          borderRadius: 50,
          backgroundColor: 'rgba(231, 105, 24, 1)',
          fontFamily: FONT_NOTO_SANS,
          fontSize: 16,
          fontWeight: '500',
          lineHeight: '24px',
          color: 'rgba(252, 252, 252, 1)',
          boxShadow: 'none',
          '&:hover': {
              backgroundColor: 'rgba(231, 105, 24, 1)',
          }
      },
      contentButtonLogin: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: 16,
      },
      resetPassword: {
          fontFamily: FONT_NOTO_SANS,
          fontSize: 16,
          fontWeight: '500',
          lineHeight: '24px',
          color: 'rgba(24, 134, 231, 1)',
          textDecoration: 'underline',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
      },
      error: {
          fontFamily: FONT_NOTO_SANS,
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '21px',
          color: 'red'
      }
  }
})

export default useStyles
