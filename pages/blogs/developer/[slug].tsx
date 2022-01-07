import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import {Entry} from 'contentful'
import ReactMarkdown from 'react-markdown'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {getSpaceEntries, getEntry} from '../../../lib/contentful'
import CodeBlock from "../../../components/codeBlock"
import ListeningChart from "../../../components/ListeningChart"

interface paramsType {
  params : {
    slug: string
  }
}

interface entryType {
  entry: {
    entry: string
    entryData: Entry<any>
  }
}

const components = {
  code: CodeBlock.code,
  h1: (props) => <h1 className="subTitle" style={{marginTop:'1rem', marginBottom:'2rem'}}>{props.children}</h1>,
  h2: (props) => <h2 className="blogText">{props.children}</h2>,
  h3: (props) => <h3 className="blogText">{props.children}</h3>,
  p: (props) => <p className="blogText">{props.children}</p>,
  ul: (props) => <ul className="blogText">{props.children}</ul>,
  ol: (props) => <ol className="blogText">{props.children}</ol>,
  br: () => <br />,
  hr: () => <hr className="divider"/>,
  tr: (props) => <tr className="blogText" style={{borderTop:'0.1rem solid #c6cbd1', borderRadius:'3rem'}}>{props.children}</tr>,
  th: (props) => <th className="blogText" style={{padding: '6px 13px',border:'0.1rem solid #dfe2e5',borderRadius:'0.5rem'}}>{props.children}</th>,
  td: (props) => <td className="blogText" style={{padding: '6px 13px',border:'0.1rem solid #dfe2e5',borderRadius:'0.5rem'}}>{props.children}</td>,
  P: (props) => <p style={{textAlign:"center", marginTop: '2rem'}} className="blogText">{props.children}</p>,
  blockquote: (props) => <p className={styles.blockquote}>{props.children}</p>,
  ListeningChart
}

export async function getStaticProps({params}: paramsType) {
  const entry = await getEntry(params.slug)
  const markdownContentOne = await serialize(entry.entryData.fields.introductionParagraph)
  const markdownContentTwo = await serialize(entry.entryData.fields.sectionOneParagraph ?? null)

  return { 
    props: {
      entry: entry,
      markdownContent: [markdownContentOne, markdownContentTwo]
    }
  }
}

export async function getStaticPaths() {
  const entries = await getSpaceEntries('blogPost')
  return {
    paths: entries,
    fallback: false
  }
}

const Blog = ({entry,markdownContent}: {entry: entryType["entry"], markdownContent:Record<any,any>}) => {
  const tags = entry.entryData.fields.topicTags.split(',').map((e:string) => e.trim())
  return (
    <>
     {/* <div style={{paddingTop: "0.5rem", paddingLeft: "0.5rem", justifyContent: "flex-start"}}>
     <span onClick={() => router.back()}><FontAwesomeIcon icon={faArrowLeft} style={{fontSize: "2.5rem"}}/></span>
     </div> */}
      {/* <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}> */}
      {/* <div style={{width: '100%', overflow: 'hidden'}}> */}
        <h1 className="subTitle">
          {entry.entryData.fields.header}
        </h1>
        <div className={styles.footerRow}>
          {tags.map((t:string,key:string) => 
            <p key={t} className="blogRowText">{t}</p>
          )}
        </div>
        <div className={styles.grid2}>
        <Image alt='' src={`https:${entry.entryData.fields.blogImage.fields.file.url}`} width={entry.entryData.fields.blogImage.fields.file.details.image.width} height={entry.entryData.fields.blogImage.fields.file.details.image.height} className={styles.imageStyle}/>
        <br />
        <div style={{paddingTop: "2rem", padding: "0.5rem", justifyContent: "flex-start"}}>
        <h2 className="subTitle">{entry.entryData.fields.introductionHeader}</h2>
        </div>
        <div className={styles.cardBlog}>
        {/* <ReactMarkdown className="blogText" children={markdownContent[0]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}/> */}
        <MDXRemote {...markdownContent[0]} components={components}/>
        {/* @ts-expect-error */}
        <MDXRemote {...markdownContent[1]} components={components}/>
        {/* <ReactMarkdown components={CodeBlock} className="blogText" children={markdownContent[1]} rehypePlugins={[rehypeRaw]}  */}
        {/* remarkPlugins={[remarkGfm]} */}
        {/* /> */}
        </div>
        </div>
      {/* </main>
    </div> */}
    {/* </div> */}
    </>
  )
}

export default Blog
