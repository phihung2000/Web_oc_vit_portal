/* eslint-disable @next/next/no-css-tags */
import { Children } from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"

import theme from "@/assets/theme"
import { createEmotionCacheApp, createEmotionCacheMui } from "@/libs"
import nextI18nextConfig from "@@/next-i18next.config"

export default class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? nextI18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" href="favicon-light.ico" id="dark-scheme-icon" />
          <link rel="icon" href="favicon.ico" id="light-scheme-icon" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Faustina:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.NextPublic = {
                  lang: "${currentLocale}"
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const emotionCacheMui = createEmotionCacheMui()
  const emotionCacheApp = createEmotionCacheApp()
  const { extractCriticalToChunks: extractCriticalToChunksMui } =
    createEmotionServer(emotionCacheMui)
  const { extractCriticalToChunks: extractCriticalToChunksApp } =
    createEmotionServer(emotionCacheApp)

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => props =>
      (
        <App
          emotionCacheMui={emotionCacheMui}
          emotionCacheApp={emotionCacheApp}
          {...props}
        />
      ),
    })
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStylesApp = extractCriticalToChunksMui(initialProps.html)
  const emotionStyleTagsApp = emotionStylesApp.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  const emotionStylesMui = extractCriticalToChunksApp(initialProps.html)
  const emotionStyleTagsMui = emotionStylesMui.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      ...emotionStyleTagsApp,
      ...emotionStyleTagsMui,
    ],
  }
}
