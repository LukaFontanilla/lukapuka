import React, {useState, useEffect, Suspense, lazy, useRef} from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useDarkModeContext} from '../context/darkModeContext'
const Spheres = lazy(() => import('./threeFiber'));

export const Nav: React.FC = () => {
    const darkMode = useDarkModeContext()
    const [isUsed, setIsUsed] = useState(false);
    const handleHover = () => {
        setIsUsed(true)
    }

    const renderSphere = () => {
        if(!isUsed || !matchMedia('(min-width: 768px)').matches) {
            return (
                <div style={{
                    display: "flex",
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%"}}>
                </div>
            )
        }

        if(isUsed && !matchMedia('(min-width: 768px)').matches) {
            return (
                <div style={{
                    display: "flex",
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%"}}>
                </div>
            )
        }

        return (
            <Suspense fallback={null}>
                <Spheres />
            </Suspense>
        )
    }

    return (
        <>
            <div className={styles.nav}>
                <Link href="/" passHref><p className="footerRowText">Home</p></Link>
                <Link href="/blogs" passHref><p className="footerRowText">Blog</p></Link>
                <Link href="/art" passHref><p className="footerRowText">Art</p></Link>
                <Link href="/projects" passHref><p className="footerRowText">Project Plans</p></Link>
                <div className={styles.footerRowTextIcon} onClick={darkMode.value ? darkMode.disable : darkMode.enable} onMouseOver={handleHover}>
                    {renderSphere()}
                </div>
            </div>
        </>
    )  
}