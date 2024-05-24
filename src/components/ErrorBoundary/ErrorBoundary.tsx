import AppButton from "@/components/AppButton"
import AppContainer from "@/components/AppContainer"
import AppLink from "@/components/AppLink"
import { storageService } from "@/services"
import { Typography } from "@mui/material"
import { Component } from "react"
import { withTranslation } from "next-i18next"

import { withStyles } from "tss-react/mui"

import type { WithTranslation } from "react-i18next"

interface Props extends WithTranslation<"translation", "common"> {
  children?: React.ReactNode
  classes?: Partial<Record<"root", string>>
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error.message)
    storageService.clearLocal()
  }

  public render() {
    const { classes, children, t } = this.props

    if (this.state.hasError) {
      return (
        <div>
          <AppContainer maxWidth="md">
            <div className={classes!.root}>
              <Typography variant="h1" fontWeight={600}>
                500
              </Typography>
              <Typography variant="h5" fontWeight={500}>
                {t("Oops! something went wrong")}
              </Typography>
              <div>
                <Typography
                  variant="body1"
                  align="center"
                  color="common.grey"
                  marginBottom={1.25}>
                  {t("Please again in a few minutes")}
                </Typography>
                <Typography
                  variant="body1"
                  marginBottom={1.25}
                  align="center"
                  color="common.grey"
                  textTransform={"lowercase"}>
                  {t("Or")}
                </Typography>
              </div>
              <AppButton
                variant="contained"
                color="primary"
                component={AppLink}
                href="/">
                {t("Go to home")}
              </AppButton>
            </div>
          </AppContainer>
        </div>
      )
    }

    return children
  }
}

const ErrorBoundaryStyled = withStyles(ErrorBoundary, theme => {
  return {
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing(2.5),
    },
  }
})

const ErrorBoundaryStyledWithTranslation =
  withTranslation()(ErrorBoundaryStyled)

export default ErrorBoundaryStyledWithTranslation
