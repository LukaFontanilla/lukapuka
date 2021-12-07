import {Footer} from './Footer'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {Nav} from './Nav'
import React from 'react'


export const Layout: React.FC = ({children}) => {
    return (
        <>
        <div className={styles.subContainer}>
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
            <Nav />
            </div>
                <div className={styles.main}>
                    {children}
                </div>
            <div>
            <Footer />
            </div>
        </div>
        </div>
        </>
    )
}