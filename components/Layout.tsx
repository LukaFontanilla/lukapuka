import {Footer} from './Footer'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import {Nav} from './Nav'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, createRef, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import {useDarkModeContext} from '../context/darkModeContext'
import TravelOne from '../public/travel-is-fun1.json'
import TravelTwo from '../public/travel-is-funtest.json'
import TravelThree from '../public/travel-is-fun3.json'

export const Layout: React.FC = ({children}) => {
    const darkMode = useDarkModeContext()
    const player = createRef<Player>()
    const containerRef = useRef<HTMLInputElement>()
    const scrollRef = createRef<HTMLInputElement>()
    const [scrollPosition, setScrollPosition] = useState<number[]>([])
    const { asPath } = useRouter()

    // Intersection Observer
    const options = {
        rootMargin: "0px",
        threshold: 0.25
    }

    const callbackFunction = (entries:any) => {
        entries.forEach((entry:any) => {
            console.log("Entry: ",entry)
            if(entry.isIntersecting) {
                // figure out better way to transition animation along with scroll
                if(asPath === '/') {
                    const heroCss = { height: '40rem', width: '50rem',position:'absolute', right:'0rem',top:'0rem',zIndex:'-1',transition: 'all 1s ease-in' }
                    const hero = document.getElementById("hero")
                    if(hero) Object.assign(hero.style,heroCss);
                }
                const scrollSection = document.getElementById("scrollSection")
                if(scrollSection) {
                    scrollSection.style.overflowY = ""
                    scrollSection.style.maxHeight = ""
                    scrollSection.style.paddingTop = "0rem"
                    if(player.current) {
                        player.current.play()
                    }
                }
            }
        })
    }

    useEffect(() => {
        const scrollOpacity = document.getElementById("scrollOpacity")
        if(scrollOpacity) {
            console.log(parseFloat(scrollOpacity?.style.opacity) + 0.015)
            scrollOpacity.style.opacity = String(parseFloat(scrollOpacity?.style.opacity) + 0.01425)
        }
    }, [scrollPosition])

    useEffect(() => {
        if(!darkMode.value) {
            const observer = new IntersectionObserver(callbackFunction, options)
            if(containerRef.current) {
               observer.observe(containerRef.current)
            }

            return () => {
                if(containerRef.current) {
                    observer.unobserve(containerRef.current)
                }
            }
        }

    },[darkMode.value, containerRef, options])
    
    useEffect(() => {
        if(!darkMode.value) {
            var timer: any = null;
            window.addEventListener('scroll', function() {
                if(timer !== null) {
                if(player.current) {
                    player.current.play()
                    clearTimeout(timer);        
                    }   
                }
                timer = setTimeout(function() {
                    if(player.current) {
                        player.current.pause()      
                    }             
                }, 15);
            }, false);
        }
    },[darkMode.value])

    const onScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = scrollRef.current && scrollRef.current.scrollTop
        // console.log(document.getElementById("scrollSection").getBoundingClientRect())
        if(containerRef.current !== undefined && scrollTop) {
            setScrollPosition([scrollTop,containerRef.current.scrollHeight])
        }
      }
    
    const animationStyles = (pagePath: string) => {
        return (
            pagePath === '/' ? 
                { height: '70rem', width: '60rem',position:'absolute',top:'-6rem', right:'-6rem',zIndex:'-1' } // for homepage
            :
                { height: '12rem', width: '50rem',position:'absolute',top:'4.5rem', right:'8rem',zIndex:'-1' } // for all others
        )
    }

    const animationDisplay = (pagePath: string) => {
        console.log(pagePath)
        if(pagePath === '/') return TravelOne
        if(pagePath === '/art') return TravelTwo
        if(pagePath.includes('/blogs')) return TravelThree
    }

    const AnimationComponent = () => {
        if(asPath === '/') {
            return (
                <>
                <div style={{padding: '4rem 0rem 18rem 0rem', maxHeight:'2rem', display: 'flex', flexDirection:'row', 
                justifyContent:'space-between', alignContent:'flex-end',alignItems:'flex-end'
                }}>
                    <h1 className="title">
                        Luka "lukapuka" Fontanilla △▼△▼△▼△▼△
                    </h1>
                </div>
                <Player
                    id="hero"
                    ref={player} // set the ref to your class instance
                    autoplay={true}
                    loop={true}
                    controls={true}
                    src={JSON.stringify(animationDisplay(asPath))}
                    // @ts-ignore
                    style={animationStyles(asPath)}
                />
                <div id="scrollOpacity" style={{opacity: '0.01'}}>
                    <div ref={scrollRef} id="scrollSection" onScroll={onScroll} className={styles.hideScrollBar} style={{paddingTop: '60rem', maxHeight:'40rem', overflowY:"scroll"}}>
                        {/* @ts-ignore */}
                        <div className={styles.main} ref={containerRef}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
            )
        } else {
            return (
                <>
                <Player
                    ref={player} // set the ref to your class instance
                    autoplay={true}
                    loop={true}
                    controls={true}
                    src={JSON.stringify(animationDisplay(asPath))}
                    // @ts-ignore
                    style={animationStyles(asPath)}
                />
                <div ref={scrollRef} id="scrollSection" onScroll={onScroll} className={styles.hideScrollBar} style={{paddingTop: '2rem'}}>
                    {/* @ts-ignore */}
                    <div className={styles.main} ref={containerRef}>
                        {children}
                    </div>
                </div>
            </>
            )
        }
    }

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
            {!darkMode.value ?
                <>{AnimationComponent()}</>
            :
                <div className={styles.main}>
                    {children}
                </div>
            }
            <Footer />
        </div>
        </div>
        </>
    )
}