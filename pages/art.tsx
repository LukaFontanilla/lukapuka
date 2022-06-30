import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Art = () => {
    return (
        <>
        <h2 className="title">
          Art △▼△▼△▼△▼△
        </h2>
        <p className={styles.codeBody}>
          Welcome to my art page! My art is mainly focused around seaweed prints (accomplished through seaweed pressing, photocopying and visual design), and 
          pieces that pull through my own personal sketches. All pieces incorporate a linear gradient/color scheme, additionally each of these are built into their own
          reusable card components that accept a few props: color (limited to the color duplicates created in figma), dark mode, as well as an optional animation.
        </p>
        <h3 className="subTitle">
            Search for Art Pieces by Tag
        </h3>
        <h3 className="subTitle">
            海の花　Series
        </h3>
        <div className={styles.artGrid}>
            <>
            <div className={styles.artCard}>
            <Image src="/ocean-flower-purple copy.png" 
            // height="200rem" width="200rem" 
            quality={98} placeholder="blur" sizes="20vw"/>
            </div>
            <div className={styles.artCard}>
            <Image src="/ocean-flower copy.png" 
            // height="200rem" width="200rem" 
            quality={98} placeholder="blur" sizes="20vw"/>
            </div>
            <div className={styles.artCard}>
            <Image src="/ocean-flower-purple copy.png" 
            // height="200rem" width="200rem" 
            quality={98} placeholder="blur" sizes="20vw"/>
            </div>
            <div className={styles.artCard}>
            <Image src="/ocean-flower-purple copy.png" 
            // height="200rem" width="200rem" 
            quality={98} placeholder="blur" sizes="20vw"/>
            </div>
            <div className={styles.artCard}>
            <Image src="/ocean-flower-purple copy.png" 
            // height="200rem" width="200rem" 
            quality={98} placeholder="blur" sizes="20vw"/>
            </div>
            </>
        </div>
        <hr className="divider"/>
        </>
    )
}

export default Art