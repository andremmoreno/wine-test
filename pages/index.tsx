import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import WineCard from '../components/WineCard'
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

      <Navbar />
      <Main>
        { wines.map((wine) => {
          return <WineCard key={ wine.id } wine={ wine } />
        }) }
      </Main>
    </div>
  )
}

export default Home

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
`
