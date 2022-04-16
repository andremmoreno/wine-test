import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import api from './api/api'
import Link from 'next/link'
import Rating from '@mui/material/Rating';

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
  volume?: string,
  quantity?: number,
}

interface IQuery {
  id: number,
}

const Home: NextPage = () => {
  const [wine, setWine] = useState<IWines>();
  const [cart, setCart] = useState<IWines[]>([])
  const [quantity, setQuantity] = useState<number>(0);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    api.get(`products`).then(response => {
      const wineDetails = response.data.items[parseInt(id as string)]
      setWine(wineDetails)
    })

    const products = localStorage.getItem('cart')
    if (products) {
      setCart(JSON.parse(products as string));
    }
  }, [id])

  const handleClick = (num: number) => {
    setQuantity((prevState) => prevState + num)
  }

  const addToCart = (wine: IWines) => {
    const cart = localStorage.getItem("cart");
    let a: IWines[] = [];
    a = JSON.parse(cart as string) || [];

    if (!a.find((each) => each.id === wine.id )) {
      (wine.quantity as number) = quantity;
      a.push(wine);
    } 
    else {
      a.find((each) => {
        if (each.id === wine.id) {
          (each.quantity as number) += quantity;
        }
      })
    }
    setQuantity(0);
    localStorage.setItem('cart', JSON.stringify(a));
    setCart(a);
  }

  return (
    <div>
      <Head>
        <title>Wine</title>
      </Head>
      <Navbar cart={ cart } setCart={ setCart } />
      <Main>
        <Link href='/' passHref>
          <BackBtn>{ '< Voltar' }</BackBtn>
        </Link>
        <WineDiv>
          <HeaderInfoCel>
            <h3>{ wine?.name }</h3>
            <Info>
              <CountryImg 
                src={ wine?.flag }
              />
              <InfoText>{ wine?.country }</InfoText>
              <InfoText>{ wine?.type }</InfoText>
              <InfoText>{ wine?.classification }</InfoText>
              <InfoText>{ wine?.size || wine?.volume }</InfoText>
              <div>
                <Rating
                  value={ wine?.rating || 0 }
                />
                <InfoText>({ wine?.avaliations || 0 })</InfoText>
              </div>
            </Info>
          </HeaderInfoCel> 
          <ImgDiv>
            <WineImage
              src={ wine?.image }
              alt={ wine?.name }
              />
          </ImgDiv>
          <InfoDiv>
            <Info>
              <HeaderInfo>
                <h3>{ wine?.name }</h3>
                <Info>
                  <CountryImg 
                    src={ wine?.flag }
                  />
                  <InfoText>{ wine?.country }</InfoText>
                  <InfoText>{ wine?.type }</InfoText>
                  <InfoText>{ wine?.classification }</InfoText>
                  <InfoText>{ wine?.size }</InfoText>
                  <>
                    <Rating
                      value={ wine?.rating || 0 }
                      size="small"
                      />
                    <InfoText>({ wine?.avaliations || 0 })</InfoText>
                  </>
                </Info>
              </HeaderInfo> 
            </Info>
            <PriceMember>
              R$
              <span>
                <span>
                  { wine?.priceMember
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[0]
                  },
                </span>
                { wine?.priceMember
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[1] || 0
                }
              </span>
            </PriceMember>
            <PriceNonMember>
              NÃO SÓCIO 
              <span>
                { ` R$ ${ wine?.priceNonMember.toLocaleString('pt-br', {minimumFractionDigits: 2}) }/UN` }
              </span>
            </PriceNonMember>
            <h5>Comentário do Sommelier</h5>
            <p>{ wine?.sommelierComment }</p>
            <AddCartDiv>  
              <CountInput>
                <button
                  disabled={ quantity === 0 }
                  onClick={() => handleClick(-1)}
                > 
                  -
                </button>
                <span>{ `${ quantity }` }</span>
                <button
                  onClick={() => handleClick(1)}
                >
                  +
                </button>
              </CountInput>
              <BtnAdd
                onClick={ () => addToCart(wine as IWines) }
              >
                ADICIONAR
              </BtnAdd>
            </AddCartDiv>
          </InfoDiv>
        </WineDiv>
      </Main>

    </div>
  )
}

export default Home

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
`

const BackBtn = styled.button`
  border: none;
  width: 90px;
  background-color: #F5F5F5;
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: #e95ab2;  
  }
  @media (max-width: 800px) {
    display: none;
  }
`

const WineDiv = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`

const ImgDiv = styled.div`
  width: 40%;

  @media (max-width: 800px) {
    width: 60%
  }
`

const WineImage = styled.img`
  width: 100%
`

const InfoDiv = styled.div`
  width: 55%;

  @media (max-width: 800px) {
    width: 80%
  }
`

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    justify-content: center;
    align-items: center;
    align-content: center;
  }
`

const HeaderInfo = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`

const HeaderInfoCel = styled.div`
  display: none;
  text-align: center;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const InfoText = styled.span`
  margin-right: 10px;
  color: gray;
`

const CountryImg = styled.img`
  width: 16px;
  margin-right: 5px;
`

const PriceMember = styled.h2`
  color: #B6116E;
  margin-bottom: 0px;
  span {
    font-size: 30px;
    span {
      font-size: 40px;
    }
  }
`

const PriceNonMember = styled.p`
  font-size: 18px;
  color: gray;
  margin-top: 0px;
`

const AddCartDiv = styled.div`
  display: flex;
  background-color: #369f36;
  width: 70%;
  @media (max-width: 800px) {
    width: 100%;
  }
`

const CountInput = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    color: #FFF;
  }
  button {
    cursor: pointer;
    box-shadow: none;
    width: 30px;
    height: 30px;
    border-style: none;
    border-radius: 50%;
    border: 1px solid #FFF;
    background-color: #369f36;
    color: #FFF;
    :hover {
      border: 1px solid #000000;
      color: #000000;
    }
  }
`

const BtnAdd = styled.button`
  cursor: pointer;
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: #FFF;
  background-color: #369f36;
  :hover {
    color: #000000;
  }
`
