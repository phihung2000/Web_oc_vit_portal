import { ToastContainer } from "react-toastify"
import { appWithTranslation } from "next-i18next"
import * as locales from "@mui/material/locale"
import { Open_Sans, Faustina, Gupter, Poppins, Roboto } from "next/font/google"
import localFont from 'next/font/local'
import { DefaultSeo } from "next-seo"
import AOS, { type Aos } from "aos"
import { type NextPage } from "next"
import { type UseTranslationResponse } from "react-i18next"
import { type AppProps } from "next/app"

import nextI18NextConfig from "@@/next-i18next.config"
import { createEmotionCacheApp, createEmotionCacheMui } from "@/libs"
import defaultTheme from "@/assets/theme"
import { commonConfig } from "@/utils/config"
import { storageService } from "@/services"

import { TssCacheProvider } from "tss-react"
import { CacheProvider, EmotionCache } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { viVN } from '@mui/material/locale'
import LoadingScreenOverlay from "@/components/LoadingScreenOverlay"
import ErrorBoundary from "@/components/ErrorBoundary"
import AlertDialog from "@/components/AlertDialog"
import RouterLoadingLinearProgress from "@/components/RouterLoadingLinearProgress"

import { useTranslation } from "next-i18next"

import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import "@/assets/scss/app.scss";
import React from "react"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    pageProps: P,
    appProps: {
      translation: UseTranslationResponse<"common", any> // Add the missing type argument
    },
  ) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCacheMui?: EmotionCache
  emotionCacheApp?: EmotionCache
}

type SupportedLocales = keyof typeof locales

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const BebasKai = localFont({
  src: [
    {
      path: '../assets/fonts/BebasNeue-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BebasNeue-Regular.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/BebasNeue-Regular.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-bebaskai"
})
const clientSideEmotionCacheMui = createEmotionCacheMui()
const clientSideEmotionCacheApp = createEmotionCacheApp()

const theme = createTheme(defaultTheme)

export const AOSContext = createContext<Aos | undefined>(undefined)

const AOSProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const aosRef = useRef(AOS)

  useEffect(() => {
    aosRef.current.init()
  }, [])

  return (
    <AOSContext.Provider value={aosRef.current}>{children}</AOSContext.Provider>
  )
}

const InitializeMyApp = () => {
  const handleUpdateScheme = (matcher: MediaQueryList) => () => {
    const lightSchemeIcon = document.querySelector("link#light-scheme-icon")!
    const darkSchemeIcon = document.querySelector("link#dark-scheme-icon")!
    if (matcher.matches) {
      document.head.append(darkSchemeIcon)
    } else {
      document.head.append(lightSchemeIcon)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const matcher = window.matchMedia("(prefers-color-scheme: dark)")
      matcher.addListener(handleUpdateScheme(matcher))
      handleUpdateScheme(matcher)()
      return () => {
        matcher.removeListener(handleUpdateScheme(matcher))
      }
    }
  }, [])

  return null
}

const TIMEOUT = 60000 * 15;

const MyApp: React.FunctionComponent<MyAppProps> = props => {
  const {
    Component,
    emotionCacheMui = clientSideEmotionCacheMui,
    emotionCacheApp = clientSideEmotionCacheApp,
    pageProps,
  } = props

  const locale =
    ((pageProps?._nextI18Next?.initialLocale || "").replace(
      "-",
      "",
    ) as SupportedLocales) ||
    nextI18NextConfig.i18n.defaultLocale.replace("-", "")

  const headerLocale =
    ((pageProps?._nextI18Next?.initialLocale || "").replace(
      "-",
      "_",
    ) as string) || nextI18NextConfig.i18n.defaultLocale.replace("-", "_")

  const getLayout = Component.getLayout ?? (page => page)
  const translation = useTranslation()

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [theme, locale],
  )

  const curVersion = storageService.getLocalItem("version")

  if (curVersion !== commonConfig.APP_VERSION) {
    storageService.clearLocal()
    storageService.saveLocalItem("version", commonConfig.APP_VERSION)
  }

  return (
    <>

      <DefaultSeo
        defaultTitle={commonConfig.DOCUMENT_TITLE}
        titleTemplate={`%s | ${commonConfig.DOCUMENT_TITLE}`}
        openGraph={{
          type: "website",
          locale: headerLocale,
          siteName: commonConfig.DOCUMENT_TITLE,
        }}
      />
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily},
            ${BebasKai.style.fontFamily};
        }
      `}</style>
      <CacheProvider value={emotionCacheMui}>
        <TssCacheProvider value={emotionCacheApp}>
          <ThemeProvider theme={themeWithLocale}>
            <AOSProvider>
              <main className={`${BebasKai.variable}`}>
                <RouterLoadingLinearProgress />
                <CssBaseline />
                <InitializeMyApp />
                <ErrorBoundary>
                  {getLayout(<Component {...pageProps} />, pageProps, {
                    translation,
                  })}
                </ErrorBoundary>
                <AlertDialog />
                <LoadingScreenOverlay />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar
                  closeOnClick
                />
              </main>
            </AOSProvider>
          </ThemeProvider>
        </TssCacheProvider>
      </CacheProvider>
    </>
  )
}

export default appWithTranslation(MyApp, {
  ...nextI18NextConfig,
  // use: [intervalPlural],
  // interpolation: {
  //   ...(nextI18NextConfig as any)?.interpolation,
  //   format: (value, format) => {
  //     if (format === "lowerFirst" && typeof value === "string")
  //       return value.charAt(0).toLowerCase() + value.slice(1)
  //     return value
  //   },
  // },
})
