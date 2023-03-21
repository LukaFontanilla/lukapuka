import React, {useState, useEffect, Suspense, lazy, useRef} from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useDarkModeContext} from '../context/darkModeContext'
// import Spheres from './threeFiber'
import dynamic from 'next/dynamic'
// const Spheres = dynamic(() => import('./threeFiber'),{ssr:true});

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
            <Suspense fallback={<></>}>
                {/* <Spheres /> */}
            </Suspense>
        )
    }

    return (
        <>
            <div className={styles.nav} style={{opacity:'1'}} id="nav">
                <Link href="/" passHref><p className="footerRowText">Home</p></Link>
                <Link href="/blogs" passHref><p className="footerRowText">Blog</p></Link>
                <Link href="/art" passHref><p className="footerRowText">Art</p></Link>
                {/* <Link href="/visualizations" passHref><p className="footerRowText">Visualizations</p></Link> */}
                <Link href="/projects" passHref><p className="footerRowText">Project Plans</p></Link>
                <div className={styles.footerRowTextIcon} 
                onClick={darkMode.value ? darkMode.disable : darkMode.enable} onMouseOver={handleHover}>
                    {/* {renderSphere()} */}
                    {/* <Spheres /> */}
                    {/* XO */}
                    <DarkModeToggle />
                </div>
            </div>
        </>
    )  
}

const DarkModeToggle = () => {
    const darkMode = useDarkModeContext()

    useEffect(() => {
        Array.from(document.getElementsByTagName("path")).forEach((el) => el.id === "petals" ? darkMode.value ? el.setAttribute("stroke","white") : el.setAttribute("stroke","black") : console.log(''))
    },[darkMode.value])
    return (
        <div style={{position:'relative', right:'17rem', top:'-4.5rem'}}>
        <svg style={{overflow: "visible", margin: "0px"}}>
            <g className="flower"><path id="petals" fill="none" stroke="white" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(0)scale(0.2)"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(22.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(45)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(67.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(90)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(112.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(135)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(157.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(180)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(202.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(225)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(247.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(270)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(292.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(315)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><path id="petals" fill="none" stroke="rgb(255, 255, 255)" strokeWidth="2" d="M2,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 2,0" transform="translate(300,100)rotate(337.5)scale(0.2)" strokeDasharray="291.75946044921875 291.75946044921875" strokeDashoffset="0"></path><circle r="60" fill="none" transform="translate(300, 100)scale(0.6)" style={{filter: "url(&quot;#motionFilter&quot;);"}}></circle></g><defs><filter id="motionFilter" width="400%" x="-100%"><feGaussianBlur in="SourceGraphic" stdDeviation="18 6"></feGaussianBlur></filter></defs>
        </svg>
        </div>
    )
}