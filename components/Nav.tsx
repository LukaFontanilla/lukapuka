import React, {useState, useEffect, Suspense, lazy} from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useDarkModeContext} from '../context/darkModeContext'
const Spheres = lazy(() => import('./threeFiber'));

export const Nav: React.FC = () => {
    const darkMode = useDarkModeContext()
    const [isMounted, setIsMounted] = useState(false);
        useEffect(() => {
            setIsMounted(true);
    }, []);

    return (
        <>
            <div className={styles.nav}>
                <Link href="/" passHref><p className="footerRowText">Home</p></Link>
                <Link href="/blogs" passHref><p className="footerRowText">Blog</p></Link>
                <Link href="/art" passHref><p className="footerRowText">Art</p></Link>
                <Link href="/projects" passHref><p className="footerRowText">Project Plans</p></Link>
                <div className={styles.footerRowTextIcon} onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
                {!isMounted || navigator?.connection?.saveData || !matchMedia('(min-width: 768px)').matches ? null : (
                <Suspense fallback={null}>
                    <Spheres />
                </Suspense>
                )}
                </div>
            </div>
        </>
    )  
}