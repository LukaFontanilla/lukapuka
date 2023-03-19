import type { InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.css'
import {projectDetails} from '../lib/notion'
import {useDarkModeContext} from '../context/darkModeContext'
import ListeningChart from '../components/ListeningChart'
import FollowMe from '../components/FollowMe'


export async function getStaticProps() {
  const data = await fetch('https://api.github.com/users/LukaFontanilla/repos')
  const repos =  await data.json()
  const displayRepos = ["dynamic-dashboard-control-extension","zendesk_lookml_action","lukapuka","sdk-examples"]
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
        <h2 className="subTitle">
          Embedded Analytics, Developer Products @ the big G
        </h2>
        <p className={styles.codeBody}>
          Hello!
          I'm Luka. I develop both practical and non practical applications by trade... and work with data. 
          In my personal life I mostly surf around Santa Cruz County with close friends, hike/run in our coastal mountains, and experiement with different food recipes while dancing with my indoor mini trees to a variety of music.{' '}
          <br/>
          <br />
          {/* <blockquote style={{borderLeft: '2px solid #ccc',padding: '0.5em 10px'}}>This website is both a personal project with the</blockquote> */}
          This website is both a personal project, a canvas for expirementing with new technologies but also a place to share who I am what I do and hopefully expose curious minds to neat content and applications.
        </p>
        <p className={styles.description2}>Technologies & Languages I work with Daily:</p>
        <p className={styles.codeBody}>Google Cloud Products | Any & All Javascript | Python | DuckDB | Data Viz </p>
        <br />
        <div className={styles.visCard}>
          <div className={styles.nomobile}>
          {!darkMode.value ? 
          <></>
          :
          <>
          <p className={styles.description2}>Randomized Data Gen</p>
          <br />
          <ListeningChart type="animatedGradient"/>  
          </>
          }
          </div>
        </div>
        <div style={{marginTop:'1rem'}}></div>
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
            <a href={r.html_url} target="_blank" rel="noreferrer">
            <div className={styles.footerRow2}>
              <h2 className="subTitle">
              {/* <a href={r.html_url} target="_blank" rel="noreferrer"> */}
              {r.name}
              {/* </a> */}
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
            </a>
            </div>
          </div>
        </div>
        )}
    </>
  )
}

export default Home


