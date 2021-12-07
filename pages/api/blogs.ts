import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient} from 'contentful'
import {Entry} from 'contentful'

const getSpaceEntries = async () => {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID ?? '',
        accessToken: process.env.CONTENTFUL_API_KEY ?? ''
      })
    const entries = await client.getEntries()
    if(entries) return entries.items
}

export default async function handler(
    req: NextApiRequest,
    res: any
  ) {
    const spaceData: Entry<unknown>[] | undefined = await getSpaceEntries()
    res.status(200).json(spaceData)
  }