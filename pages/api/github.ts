import type { NextApiRequest, NextApiResponse } from 'next'

const fetchPublicProjects = async () => {
    const data = await fetch('https://api.github.com/users/LukaFontanilla/repos')
    const repos =  await data.json()
    const displayRepos = ["dynamic-dashboard-control-extension","ef_education_extension","looker_oauth","sdk-examples"]
    const filteredRepos = repos
        .filter((r:any) => displayRepos.includes(r.name))
        .map((r:any) => {
            const {id, name, html_url, created_at, updated_at, language, description} = r
            return {id, name, html_url, created_at, updated_at, language, description}
        })
    return filteredRepos
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = await fetchPublicProjects()
  res.status(200).json(data)
}