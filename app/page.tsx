import Image from 'next/image'
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '@/sanity/env'

const client = createClient({
  projectId,
  dataset,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
})

export default async function Home() {
  const data = await client.fetch<any[]>(
    `*[_type == "post"]`,
    {}
    // {
    //   // You can set any of the `cache` and `next` options as you would on a standard `fetch` call
    //   cache: 'force-cache',
    //   next: { tags: ['pages'] },
    // }
  )

  const list = data.map((d) => <li key={d._id}>{d.title}</li>)

  return <ul>{list}</ul>
}
