import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Layout} from '../components/Layout'
import { DarkModeWrapper } from '../context/darkModeContext'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    // using dark mode provider to give the ../components/codeBlock & Nav components a shared state value to subscribe to
    <DarkModeWrapper>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </DarkModeWrapper>
  )
}

export default MyApp
