import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import {Entry} from 'contentful'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {getSpaceEntries, getEntry} from '../../../lib/contentful'
import CodeBlock from "../../../components/codeBlock"

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

export async function getStaticProps({params}: paramsType) {
  const entry = await getEntry(params.slug)
  return { 
    props: {
      entry: entry,
      markdownContent: [entry.entryData.fields.introductionParagraph, entry.entryData.fields.sectionOneParagraph ?? null]
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
        <ReactMarkdown className="blogText" children={markdownContent[0]} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}/>
        {/* @ts-expect-error */}
        <ReactMarkdown components={CodeBlock} className="blogText" children={markdownContent[1]} rehypePlugins={[rehypeRaw]} 
        remarkPlugins={[remarkGfm]}
        />
        </div>
        </div>
      {/* </main>
    </div> */}
    {/* </div> */}
    </>
  )
}

export default Blog
