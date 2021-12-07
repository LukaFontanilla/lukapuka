import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import { useState } from 'react';
import Link from 'next/link'
import {projectDetails} from '../lib/notion'
import styled from "styled-components"
import {useDarkModeContext} from '../context/darkModeContext'

export async function getStaticProps() {
  const {completed, inProgress, nextUp, noStatus} = await projectDetails()
  return { props: {
    completed,
    inProgress,
    nextUp,
    noStatus
    }
  }
}
// grab title from urls
const formatUrl = (url: string) => {
  let formattedUrl = url.split('.so/')
  let titleData = formattedUrl[1].split('-')
  titleData.pop()
  return titleData.join(' ')
}


const Projects = ({completed, inProgress, nextUp, noStatus}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [project, SetProject] = useState<any>()

  return (
      <>
      <div style={{display:"flex", justifyContent:'space-between', maxHeight:'30rem', alignContent:'space-between', width:'100%'}}>
      <div style={{display:'flex', flexDirection:'column', position:'relative', width:'50%'}}>
      <h2 className="subTitle">Project List</h2>
      {/* <h2 className="subTitle2">🙤 · ┈┈┈┈┈┈ · ꕥ · ┈┈┈┈┈┈ · 🙦</h2><br /> */}
      <div style={{overflowY:'scroll'}}>
      <h2 className="subTitle">Completed</h2><br />
       <div>{completed.map((b) =>
        <>
        {/* <div className="subTitle2">{b.block_id}</div> */}
        <div onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br/>
      <h2 className="subTitle">In-Progress</h2><br />
      <div>{inProgress.map((b) =>
        <>
        {/* <div className="subTitle2">{b.block_id}</div> */}
        <div onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br />
      <h2 className="subTitle">Next Up</h2><br />
      <div>{nextUp.map((b) =>
        <>
        {/* <div className="subTitle2">{b.block_id}</div> */}
        <div onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br />
      <h2 className="subTitle">No Status</h2><br />
      <div>{noStatus.map((b) =>
        <>
        {/* <div className="subTitle2">{b.block_id}</div> */}
        <div onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div>
      </div>
      </div>
      <div style={{display:'flex', flexDirection:'column',position:'relative', width:'50%', overflowY:'scroll', overflowX:'scroll'}}>
      <h2 className="subTitle">Project Details</h2>
      <div style={{flexShrink:0, flexBasis:'100%', flex:1}}>
        {project ? 
        <>
        <p>
        {project.block_id}
        </p>
        {Object.keys(project.properties).map((val) => 
        <>
        {/* <p>{val}</p> */}
        <ProjectProperties projectKey={val} properties={project.properties[val]} />
        </>
        )}
         </>
        :
        <></>
        }
      </div>
      </div>
      </div>
      </>
  )
}

const ProjectCards: React.FC<string | any > = ({color, darkMode, children}) => {
  const ProjectCardWrapper = styled.p`
    margin: 0.1rem;
    padding: 0.2rem;
    text-align: center;
    text-decoration: none;
    border: 0.1rem solid ${darkMode ? 'white' : 'black'};
    border-radius: 2rem;
    transition: color 0.15s ease, border-color 0.15s ease;
    max-width: 6rem;
    font-size: 0.8em;
    color: ${color && color !== 'default' ? color : '#4D4DFF' };
    border-color: ${color && color !== 'default' ? color : '#4D4DFF' };

    &:hover,
    &:focus,
    &:active {
      color: ${darkMode ? 'white' : 'black'};
      border: 0.1rem solid ${darkMode ? 'white' : 'black'};
    }
  `;

  return (
    <>
      <ProjectCardWrapper>
      {children}
      </ProjectCardWrapper>
    </>
  )
}

const ProjectProperties = ({projectKey, properties}) => {
  const darkMode = useDarkModeContext()
  switch(properties.type) {
    case 'select':
      return (
        <>
        {properties['select'] !== null && (
        <>
          <p style={{color: `${darkMode.value ? 'white' : 'black'}`}}> {projectKey}</p>
          <ProjectCards color={properties['select'].color} darkMode={darkMode.value}>{properties['select'].name}</ProjectCards>
        </>
        )}
        </>
      )
    case 'multi_select':
      return (
        <>
        <p style={{color: `${darkMode.value ? 'white' : 'black'}`}}>{projectKey}</p>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
        {properties['multi_select'].map((p:any) =>
            <ProjectCards color={p.color} darkMode={darkMode.value}>{p.name}</ProjectCards>
        )}
        </div>
        </>
      )
    default:
      return (
        <></>
      )
  }
}

export default Projects