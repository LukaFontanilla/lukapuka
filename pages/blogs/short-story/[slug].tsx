import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import { Entry } from 'contentful'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { getSpaceEntries, getEntry } from '../../../lib/contentful'

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
        entry
      }
    }
  }
  
  export async function getStaticPaths() {
    const entries = await getSpaceEntries('shortStory')
    return {
      paths: entries,
      fallback: false
    }
  }

  const storyBlog = ({entry}: entryType) => {
    const tags = entry.entryData.fields.topicTags.split(',').map((e:string) => e.trim())
  
    return (
      <>
        <h1 className="subTitle">
          {entry.entryData.fields.title}
        </h1>
        <div className={styles.footerRow}>
          {tags.map((t:string, key:string) => 
            <p key={t} className="blogRowText">{t}</p>
          )}
        </div>
        <div className={styles.grid2}>
        <Image alt='' src={`https:${entry.entryData.fields.thumbnail.fields.file.url}`} width={entry.entryData.fields.thumbnail.fields.file.details.image.width} height={entry.entryData.fields.thumbnail.fields.file.details.image.height } className={styles.imageStyle}/>
        <br/>
        <ReactMarkdown  className="blogText" children={entry.entryData.fields.body} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}/>
        </div>
      </>
    )
    }

    export default storyBlog;