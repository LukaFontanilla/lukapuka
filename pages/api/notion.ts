import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY });
const pageId = process.env.NOTION_PAGE_ID;
// console.log(notion)

// interface pageDataLayout {
//     block_id: string,
//     created_timed: string,
//     properties: Record<string, any>,
//     url: string,
//     blocks: 
// }

const getPageInfo = async () => {
    const {results} = await notion.databases.query({ database_id: pageId });
    // console.log(results)
    const results1 = await notion.databases.retrieve({ database_id: pageId });
    // const page = await notion.pages.retrieve({page_id: 'cc149aed-2ef1-4581-8b0d-559b170f7150'})
    // grab properties of each page to grab status title and other Attributes
    // use blocks.children.list on each page to grab the block children, loop through that and grab the different text fields to enrich data
    const recurse = async (b,parent_id,id) => {
        let parent;
        if(b.has_children) {
            // let parent;
            // checks for possible block types, some of these will never have children, probably can check notion api source to confirm and just leave some in the else condition
            if(b.paragraph) { const {type,paragraph:{text}} = b; parent = {type,text,parent_id,id} }
            if(b.to_do) { const {type, to_do:{text,checked}} = b; parent = {type,text,checked,parent_id,id} }
            if(b.heading_1) { const {type,heading_1:{text}} = b; parent = {type,text,parent_id,id} }
            if(b.heading_2) { const {type,heading_2:{text}} = b; parent = {type,text,parent_id,id} }
            if(b.heading_3) { const {type,heading_3:{text}} = b; parent = {type,text,parent_id,id} }
            if(b.bulleted_list_item) { const {type,bulleted_list_item:{text}} = b; parent = {type,text,parent_id,id} }
            if(b.divider) {null}
            const {results} = await notion.blocks.children.list({block_id: b.id})
            // if there are children then grab the child block id's map over them an recurse
            const children = await Promise.all(results.map(async (c) => {return await recurse(c, b.id, c.id)}))
            return {parent, children}
        } else {
            if(b.paragraph) { const {type,paragraph:{text}} = b;  return {type,text,parent_id,id} }
            if(b.to_do) {const {type, to_do:{text,checked}} = b; return {type,text,checked,parent_id,id} }
            if(b.heading_1) { const {type,heading_1:{text}} = b; return parent = {type,text,parent_id,id} }
            if(b.heading_2) { const {type,heading_2:{text}} = b; return parent = {type,text,parent_id,id} }
            if(b.heading_3) { const {type,heading_3:{text}} = b; return parent = {type,text,parent_id,id} }
            if(b.bulleted_list_item) { const {type,bulleted_list_item:{text}} = b; return parent = {type,text,parent_id,id} }
            if(b.divider) { return null}
        }
    }
    let pagesData = new Array()
    await Promise.all(results.map(async (p) => {
        let pageData = new Object()
        try {
            const {results} = await notion.blocks.children.list({block_id: p.id})
            let pageBlocksData;
            if(results.length > 0) {
                pageBlocksData = await Promise.all(results.map(async (b) => {
                    const data = await recurse(b,b.id,b.id)
                    return data
                }))
            }
            pageData['block_id'] = p.id
            pageData['created_time'] = p.created_time
            pageData['properties'] = p.properties
            pageData['url'] = p.url
            pageData['blocks'] = pageBlocksData
            pagesData.push(pageData)
        } catch(e){
            console.log(`There was an error fetching children and setting properties for block id: ${p.id}}`)
        }
    }))
    return pagesData
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    const data = await getPageInfo()
    const completedProj = data.filter((p) => p.properties.Status.select?.name === 'Completed')
    const inProgressProj = data.filter((p) => p.properties.Status.select?.name === 'In Progress')
    const nextUpProj = data.filter((p) => p.properties.Status.select?.name === 'Next Up')
    const noStatusProj = data.filter((p) => p.properties.Status.select?.name === undefined)

    res.status(200).json(completedProj)
  }