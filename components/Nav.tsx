import React from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Spheres from './threeFiber'
import {useDarkModeContext} from '../context/darkModeContext'

export const Nav: React.FC = () => {
    const darkMode = useDarkModeContext()
    return (
        <>
            <div className={styles.nav}>
                <Link href="/" passHref><p className="footerRowText">Home</p></Link>
                <Link href="/blogs" passHref><p className="footerRowText">Blog</p></Link>
                <Link href="/art" passHref><p className="footerRowText">Art</p></Link>
                <Link href="/projects" passHref><p className="footerRowText">Project Plans</p></Link>
                <div className={styles.footerRowTextIcon} onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
                <Spheres />
                </div>
            </div>
        </>
    )  
}