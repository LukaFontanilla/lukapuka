import {createClient} from 'contentful'

export const getSpaceEntries = async () => {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID ?? '',
        accessToken: process.env.CONTENTFUL_API_KEY ?? ''
      })
    const entries = await client.getEntries()
    if(entries) {
        const data = entries.items.map((e) => {
            return {params: {slug: e.sys.id} }
        })
        return data
    }
}

export const getEntry = async (entry) => {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID ?? '',
        accessToken: process.env.CONTENTFUL_API_KEY ?? ''
    })
    const entryData = await client.getEntry(entry)
    return {
       entry,
       entryData
    }
}