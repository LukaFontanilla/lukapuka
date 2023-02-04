import type { NextApiRequest, NextApiResponse } from 'next'

export default async function dbHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.query)
    const duckdb = require('duckdb');
    const db = new duckdb.Database(':memory:');
    const con = db.connect()
    const execute = (statement:any) => new Promise((resolve, reject) => {
        con.all(statement, function (err: any, res:any) {
        if (err) {
            reject(err);
        }
        db.close()
        resolve(res)
        });
    })
    // enable http parquet import - https://duckdb.org/docs/guides/import/http_import
    await execute(`INSTALL httpfs;`)
    await execute(`LOAD httpfs;`)
    
    console.log("Loaded httpfs module. Calling public cloud storage bucket...")

    const data = await execute(`
        SELECT *
        FROM read_parquet('https://storage.googleapis.com/luka-test-bucket-parquet/exchange_rate2023-5.parquet')
    `)
    res.status(200).send(data)
//   const { query, method } = req

//   switch (method) {
//     case 'GET':
//       // Get data from your database
//       res.status(200).json({ id, name: `User ${id}` })
//       break
//     case 'PUT':
//       // Update or create data in your database
//       res.status(200).json({ id, name: name || `User ${id}` })
//       break
//     default:
//       res.setHeader('Allow', ['GET', 'PUT'])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
}