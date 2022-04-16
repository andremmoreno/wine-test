import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  quantity?: number,
  volume?: string,
}

interface Props {
  wine: IWines,
  setCart: Function,
  cart: IWines[],
  setTotalPrice: Function,
  setTotalCart: Function,
}

const CartCard: React.FC<Props> = ({ wine, cart, setCart, setTotalPrice, setTotalCart }) => {
  const [prductQt, setProductQt] = useState<number>(wine.quantity || 1)
  const price = (wine.quantity || 1) * wine.priceMember

  useEffect(() => {
    const newQt = cart.find((each) => each.id === wine.id)
    setProductQt((newQt?.quantity || 1))
  }, [cart, wine])

  const handleClick = (id: number, num: number) => {
    cart.find((each) => {
      if (each.id === id) {
        (each.quantity as number) += num
      }
    })
    setTotalCart((prev: number) => prev + num);
    setTotalPrice((prev: number) => prev + (num * wine.priceMember))
    setProductQt((prev) => prev + num);

    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
  };

  return (
    <Card>
        <MainInfo>
          <Link href={`/${wine.id}`} passHref>  
            <WineImage
              src={ wine.image }
              alt={ wine.name }
            />
          </Link>
          <Info>
            <span>{ wine.name }</span>
            <span>{ wine.size || wine.volume }</span>
            <Country>{ wine.country }</Country>
            <PriceQuantity>
            <CountInput>
              <button
                onClick={ () => handleClick(wine.id, -1) }
                disabled={ prductQt === 1 }
              > 
                -
              </button>
              <span>{ `${ prductQt }` }</span>
              <button
                onClick={ () => handleClick(wine.id, 1) }
              >
                +
              </button>
            </CountInput>
              <PriceMember>
                R$
                <span>
                  <span>
                    { price
                      .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[0]
                    },
                  </span>
                  { price
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[1] || 0
                  }
                </span>
              </PriceMember>
            </PriceQuantity>
          </Info>
        </MainInfo>
    </Card>
  )
}

export default CartCard

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F5F5F5;
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid #4f4f4f;

  :hover {
    border-bottom: 2px solid #262626;
  }
`

const WineImage = styled.img`
  width: 72px;
  height: 110px;
  cursor: pointer;
`

const PriceMember = styled.p`
  font-size: 12px;
  color: #B6116E;
  span {
    font-size: 12px;
    span {
      font-size: 20px;
    }
  }
`

const PriceQuantity = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 0px 10px;
`

const Country = styled.p`
  color: #999999;
  font-size: 12px;
  margin: 5px 0;
`

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  span {
    font-size: 14px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`

const CountInput = styled.div`
  width: 30%;
  background-color: #F5F5F5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #000;
  span {
    color: #000;
  }
  button {
    cursor: pointer;
    box-shadow: none;
    background-color: #F5F5F5;
    width: 30px;
    height: 30px;
    border-style: none;
    color: #000;
    :hover {
      color: #000000;
    }
  }
`
