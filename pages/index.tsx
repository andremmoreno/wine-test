import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import WineCard from '../components/WineCard'
import Pagination from '@mui/material/Pagination';
import api from './api/api'
import Filter from '../components/Filter'
import Cart from '../components/Cart'

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

interface IData {
  totalPages: number,
  totalItems: number,
  items: IWines[],
}

const Home: NextPage = () => {
  const [data, setData] = useState<IData>();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [cart, setCart] = useState<IWines[]>([])

  useEffect(() => {
    api.get(`products?page=${page}&limit=9&filter=${filter}`).then(response => {
      setData(response.data);
    })
    const products = localStorage.getItem('cart')
    if (products) {
      setCart(JSON.parse(products as string));
    }
    window.scrollTo(0, 0);
  }, [page, filter])

  return (
    <div>
      <Head>
        <title>Wine</title>
      </Head>
      <Navbar cart={ cart } setCart={ setCart } />
      <Filter setFilter={ setFilter } setPage={ setPage }/>
      <Main>
        <ProductsCount><strong>{ `${data?.totalItems || ''} ` }</strong>produtos encontrados</ProductsCount>
        <CardSection>
          { data?.items.map((wine) => {
            return <WineCard key={ wine.id } wine={ wine } setCart={ setCart } />
          }) }
        </CardSection>
        <PagDiv>
          <Pagination 
            onChange={ (_event, page) => setPage(page) }
            count={ data?.totalPages }
            color="secondary"
            shape="rounded"
            />
        </PagDiv>
      </Main>
    </div>
  )
}

export default Home

const CardSection = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
`

const Main = styled.div`
  max-width: 900px;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
`

const PagDiv = styled.div`
  display: flex;
  margin: 20px auto ;
  justify-content: center;
`

const ProductsCount = styled.p`
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  @media (max-width: 800px) {
    text-align: center;
  }
`
