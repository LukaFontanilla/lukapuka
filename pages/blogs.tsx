import type { NextPage,NextApiRequest, NextApiResponse, InferGetStaticPropsType } from 'next'
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {createClient} from 'contentful'
import {EntryCollection, Entry, EntryFields } from 'contentful'
import ReactMarkdown from 'react-markdown'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_API_KEY ?? ''
  })
  const entries = await client.getEntries()
  return { props: {entries}}
}

const Blogs = ({entries}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredBlogPosts = entries.items
    .filter((e: Entry<any>) => 
      e.fields.topicTags.split(',').includes(searchValue.toLowerCase())
    );
  let distinctTags: Set<string> = new Set()
  const allTags = entries.items.forEach((e:Entry<any>) => {
    e.fields.topicTags.split(',').map((t:string) => distinctTags.add(t))
  })
  const developerBlogs = entries.items.filter((e:Entry<any>) => e.sys.contentType.sys.id === "blogPost")
  const shortStoryBlogs = entries.items.filter((e:Entry<any>) => e.sys.contentType.sys.id === "shortStory")

  return (
      <>
        <h2 className="title">
          Blog △▼△▼△▼△▼△
        </h2>
        <p className={styles.codeBody}>
          So you've come across my personal blog, <code className={styles.codeBody}>{' '}Welcome!</code>
          The content here is mainly broken into two portions: content around heinous short stories while written in one go sunken into my <code className={styles.codeBody}>{' '}couch</code>, and developer content (lots of Looker and GCP content)
          from building full data pipelines (ingestion to data app) to apps that render floating 3D images of Stitch in an astral plane
        </p>
        <h3 className="subTitle">
            Search for Blogs by Topic
          </h3>
        <div className={styles.footerRow}>
          {searchValue && <p className="footerRowText" onClick={() => setSearchValue('')}>X</p>}
          {distinctTags && Array.from(distinctTags).map((t) =>
          // 
            <p className="footerRowText" onClick={(e) => {
              // casting type otherwise typescript throws error stating that textContent doesn't exist
              const target = e.target as HTMLElement
              setSearchValue(target.textContent ?? '')
            }}>{t}</p>
          )}
        </div>
        {!searchValue &&  (
        <>
        <h3 className="subTitle">
          Developer Blogs
        </h3>
        <div className={styles.grid}>
        {!searchValue && (developerBlogs.map((v:Entry<any>,k) => 
            <>
            <div className={styles.card}>
            <Image className={styles.imageStyleCard} src={`https:${v.fields.thumbnail.fields.file.url}`} width={v.fields.thumbnail.fields.file.details.image.width} height={v.fields.thumbnail.fields.file.details.image.height}/>
            <Link href={`/blogs/developer/${v.sys.id}`}>
                <h3 className="subTitle2">{v.fields.header}</h3>
            </Link>
            </div>
            </>
        ))}
        </div>
        <h3 className="subTitle">
          Short Stories
        </h3>
        {!searchValue && (shortStoryBlogs.map((v:Entry<any>,k) => 
            <>
            <div className={styles.card}>
            <Image className={styles.imageStyleCard} src={`https:${v.fields.thumbnail.fields.file.url}`} width={v.fields.thumbnail.fields.file.details.image.width} height={v.fields.thumbnail.fields.file.details.image.height}/>
            <Link href={`/blogs/short-story/${v.sys.id}`}>
                <h3 className="subTitle2">{v.fields.title}</h3>
            </Link>
            </div>
            </>
        ))}
        </>
        )}
        {searchValue && (
        <>
        <h3 className="subTitle">
          All Content
        </h3>
        <div className={styles.grid}>
        {filteredBlogPosts.map((v:Entry<any>,k) => 
            <>
            <div className={styles.card}>
            <Image className={styles.imageStyleCard} src={`https:${v.fields.thumbnail.fields.file.url}`} width={v.fields.thumbnail.fields.file.details.image.width} height={v.fields.thumbnail.fields.file.details.image.height}/>
            {v.sys.contentType.sys.id === 'shortStory' ? 
            <>
            <Link href={`/blogs/short-story/${v.sys.id}`}>
                <h3 className="subTitle2">{v.fields.header ? v.fields.header : v.fields.title}</h3>
            </Link>
            </>
            :
            <>
            <Link href={`/blogs/developer/${v.sys.id}`}>
                <h3 className="subTitle2">{v.fields.header ? v.fields.header : v.fields.title}</h3>
            </Link>
            </>
            }
            </div>
            </>
        )}
        </div>
        </>
        )}
        </>
  )
}

export default Blogs
