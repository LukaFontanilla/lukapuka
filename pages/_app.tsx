import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/Layout'
import { DarkModeWrapper } from '../context/darkModeContext'
import Script from 'next/script'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script strategy="lazyOnload" id="my-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          })
        `}
      </Script>

      {/* using dark mode provider to give the ../components/codeBlock & Nav components a shared state value to subscribe to */}
      <DarkModeWrapper>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </DarkModeWrapper>
    </>
  )
}

export default MyApp
