import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType, GetStaticProps } from 'next'
import { useState, ReactNode } from 'react';
import {projectDetails} from '../lib/notion'
import styled from "styled-components"
import {useDarkModeContext} from '../context/darkModeContext'
import { DarkMode } from 'use-dark-mode';

interface ProjectStaticProps {
  completed: Array<Record<string, any>>, 
  inProgress: Array<Record<string, any>>, 
  nextUp: Array<Record<string, any>>, 
  noStatus: Array<Record<string, any>>
}

export const getStaticProps: GetStaticProps<ProjectStaticProps> = async () => {
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
  const [display, SetDisplay] = useState<any>('attribute')
  const darkMode = useDarkModeContext()

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
        <div id={b.block_id} onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br/>
      <h2 className="subTitle">In-Progress</h2><br />
      <div>{inProgress.map((b) =>
        <>
        <div id={b.block_id} onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br />
      <h2 className="subTitle">Next Up</h2><br />
      <div>{nextUp.map((b) =>
        <>
        <div id={b.block_id} onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div><br />
      <h2 className="subTitle">No Status</h2><br />
      <div>{noStatus.map((b) =>
        <>
        <div id={b.block_id} onClick={() => SetProject(b)} className="subTitle2"><b>{formatUrl(b.url)}</b></div>
        </>
      )}</div>
      </div>
      </div>
      <div style={{display:'flex', flexDirection:'column',position:'relative', width:'50%', overflowX:'scroll'}}>
      <h2 className="subTitle">Project Details</h2>
      <div style={{display:'flex', justifyContent:'space-between', alignContent:'flex-start', paddingBottom:'1rem', width:'50%'}}>
      <p className="blogRowText" onClick={()=> SetDisplay('attributes')}>Attributes</p>
      <p className="blogRowText" onClick={()=> SetDisplay('details')}>Details</p>
      </div>
      <div style={{flexShrink:0, flexBasis:'100%', flex:1, overflowY:'scroll'}}>
        {project && display ? 
        <>
          {display === 'details' ? 
          <>
            {project.blocks.map((b: Record<string,any>) => 
              ProjectDetails(b,darkMode)
            )}
          </>
          :
          <>
            {Object.keys(project.properties).map((val) => 
            <>
            <ProjectProperties darkMode={darkMode} projectKey={val} properties={project.properties[val]} />
            </>
            )}
          </>
          }
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

const ProjectCardWrapper = styled.p`
    margin: 0.1rem;
    padding: 0.2rem;
    text-align: center;
    text-decoration: none;
    border: 0.1rem solid ${props => props.darkMode ? 'white' : 'black'};
    border-radius: 2rem;
    transition: color 0.15s ease, border-color 0.15s ease;
    max-width: 6rem;
    font-size: 0.8em;
    color: ${props => props && props.color !== 'default' ? props.color : '#4D4DFF' };
    border-color: ${props => props && props.color !== 'default' ? props.color : '#4D4DFF' };

    &:hover,
    &:focus,
    &:active {
      color: ${props => props.darkMode ? 'white' : 'black'};
      border: 0.1rem solid ${props => props.darkMode ? 'white' : 'black'};
    }
  `;

interface ProjectCardsProps {
  color: string,
  darkMode: boolean,
  children: React.ReactNode
}

const ProjectCards: React.FC<ProjectCardsProps> = ({color, darkMode, children}) => {

  return (
    <>
      <ProjectCardWrapper color={color} darkMode={darkMode}>
      {children}
      </ProjectCardWrapper>
    </>
  )
}

interface ProjectPropertiesProps {
  projectKey:string,
  properties:Record<string,any>,
  darkMode: DarkMode
}

const ProjectProperties: React.FC<ProjectPropertiesProps> = ({projectKey, properties, darkMode}) => {
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

const Blocks = (block:Record<string, any>, darkMode:DarkMode) => {
  switch(block.type) {
    case 'paragraph':
      return (
        <>
        <p style={{color: `${darkMode.value ? 'white' : 'black'}`}}>{block.text[0]?.plain_text ?? 'No Project Details Defined'}</p>
        </>
      )
    case "to_do":
    return (
      <div>
        <label >
          {/* <input type="checkbox" defaultChecked={block.checked} />{" "} */}
          <li style={{color: `${darkMode.value ? 'white' : 'black'}`}}>{block.text[0]?.plain_text ?? 'No Project Details Defined'}</li>
        </label>
      </div>
    );
  }
}

const ProjectDetails = (block: Record<string, any>, darkMode: DarkMode) => {
  if(!block.parent) {
    return (
      <>
    {Blocks(block, darkMode)}
    </>
    )
  } else {
    return (
      <>
      {Blocks(block.parent,darkMode)}
      {block.children.map((child: Record<string, any>) =>  {
        if(child.parent) {
          return (
            <ul>
            {Blocks(child.parent, darkMode)}
            </ul>
          )
        } else {
          return (
            <ul>
            {Blocks(child, darkMode)}
            </ul>
          )
        }
      }
      )}
      </>
    )
  }
}



export default Projects