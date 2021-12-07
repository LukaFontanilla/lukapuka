import React from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Spheres from '../pages/threeFiber'
import {useDarkModeContext} from '../context/darkModeContext'

export const Nav: React.FC = () => {
    const darkMode = useDarkModeContext()
    return (
        <>
            <div className={styles.nav}>
                <Link href="/"><p className="footerRowText">Home</p></Link>
                <Link href="/blogs"><p className="footerRowText">Blog</p></Link>
                <Link href="/projects"><p className="footerRowText">Project Plans</p></Link>
                <div className={styles.footerRowTextIcon} onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
                <Spheres />
                </div>
            </div>
        </>
    )  
}