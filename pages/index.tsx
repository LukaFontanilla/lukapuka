import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {projectDetails} from '../lib/notion'
import {useDarkModeContext} from '../context/darkModeContext'
import ListeningChart from '../components/ListeningChart'
import FollowMe from '../components/FollowMe'


export async function getStaticProps() {
  const data = await fetch('https://api.github.com/users/LukaFontanilla/repos')
  const repos =  await data.json()
  const displayRepos = ["dynamic-dashboard-control-extension","ef_education_extension","looker_oauth","sdk-examples"]
  const filteredRepos = repos
    .filter((r:any) => displayRepos.includes(r.name))
    .map((r:any) => {
      const {id, name, html_url, created_at, updated_at, language, description} = r
      return {id, name, html_url, created_at, updated_at, language, description}
    })
  const{completed} = await projectDetails()
  return { props: {filteredRepos, completed}}
}

const Home = ({filteredRepos, completed}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const darkMode = useDarkModeContext()

  return (
    <>
        <div style={{maxHeight:'2rem', display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent:'flex-end',alignItems:'flex-end'}}>
          <h1 className="title">
            Luka "lukapuka" Fontanilla △▼△▼△▼△▼△
          </h1>
          {/* <Image src="/ocean-flower-purple copy.png" height="200rem" width="200rem"/> */}
        </div>
        <h2 className="subTitle">
          Customer Engineer, Developer Products @ Google Cloud / Looker
        </h2>
        <p className={styles.codeBody}>
          Hello!
          I'm Luka. I develop both practical and non practical applications by trade... and work with data. 
          In my personal life I mostly surf around SC with close friends, hike/run in our coastal mountains, and experiement with different food recipes while dancing with my indoor mini trees to a variety of music.{' '}
          <br/>
          <br />
          {/* <blockquote style={{borderLeft: '2px solid #ccc',padding: '0.5em 10px'}}>This website is both a personal project with the</blockquote> */}
          Jamstack but also a place to share who I am what I do and hopefully expose curious minds to neat content and applications.
        </p>
        <p className={styles.description2}>Technologies I work with Daily:</p>
        <p className={styles.codeBody}>Looker - BigQuery - Cloud Functions - Python - Javascript - Reactjs - Nextjs - PlanetScale </p>
        <br />
        <div className={styles.visCard}>
          <p className={styles.description2}>2021 Spotify Listening History</p>
          <br />
          <div className={styles.nomobile}>
          {!darkMode.value ? 
          <div className={styles.codeBody}>
          <ListeningChart />
          </div>
          :
          <ListeningChart />  
          }
          </div>
        </div>
        <FollowMe darkMode={darkMode}/>
        <br />
        <hr className="divider"/>
        <br />
        <br />
        <h3 className="title">
          Developer Projects / Github Work In-Progress
        </h3>
        {filteredRepos.map((r:any) => 
        <div className={styles.box} key={r.id}>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: '0.15rem'}}>
            <div className={styles.boxDivider}></div>
            <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
            <div className={styles.footerRow2}>
              <h2 className="subTitle">
              <a href={r.html_url} target="_blank" rel="noreferrer">
              {r.name}
              </a>
              </h2>
              <p className="subTitle2">
              {r.created_at.split('T')[0]}
              </p>
            </div>
            {r.language ?
            <p className="blogRowText">
              {r.language}
            </p>
            :
            <></>
            }
            {r.description?.length &&
            <p className={styles.codeBody}>
              {r.description}
            </p>
            }
            </div>
          </div>
        </div>
        )}
    </>
  )
}

export default Home


