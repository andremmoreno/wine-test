import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import api from './api/api'

interface IWines {
  avaliations: number,
  classification: string,
  country: string,
  discount: number,
  flag: string,
  id: number,
  image: string,
  name: string,
  price: number,
  priceMember: number,
  priceNonMember: number,
  rating: number,
  region: string,
  size: string,
  sommelierComment: string,
  type: string,
}

const Home: NextPage = () => {
  const [wines, setWines] = useState<IWines[]>([])
  const [page, setPage] = useState<Number>(1)

  useEffect(() => {
    api.get(`products?page=${page}&limit=10`).then(response => {
      setWines(response.data.items)
      console.log(response.data);
      
    })
  }, [page])

  return (
    <div>
      <Head>
        <title>Wine</title>
      </Head>

      <main>
        { wines.map((wine) => {
          return <h3 key={ wine.id }>{ wine.name }</h3>
        }) }
      </main>
    </div>
  )
}

export default Home
