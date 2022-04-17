import Link from "next/link";
import React from "react";
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
}

interface Props {
  wine: IWines,
  setCart: Function,
}

const WineCard: React.FC<Props> = ({ wine, setCart }) => {
  const memberPrice: string[] = wine.priceMember
    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')

  const addToCart = (wine: IWines) => {
    const cart = localStorage.getItem("cart");
    let a: IWines[] = [];
    a = JSON.parse(cart as string) || [];

    if (!a.find((each) => each.id === wine.id )) {
      (wine.quantity as number) = 1
      a.push(wine);
    } 
    else {
      a.find((each) => {
        if (each.id === wine.id) {
          (each.quantity as number) += 1
        }
      })
    }

    localStorage.setItem('cart', JSON.stringify(a));
    setCart(a);
  }

  return (
    <Card data-testid={`card-test-${wine.id}`}>
      <Link href={`/${wine.id}`} passHref>
        <MainInfo>
          <WineImage
            src={ wine.image }
            alt={ wine.name }
          />
          <p>{ wine.name }</p>
          <div>
            <Price>
              { `R$${ wine.price.toLocaleString('pt-br', {minimumFractionDigits: 2}) }` }
            </Price>
            <Discount>
              { `${ wine.discount }% OFF` }
            </Discount>
          </div>
          <PriceMember>
            { 'SÓCIO WINE ' }
            <span>
              R$
              <span>
                { memberPrice[0] }
              </span>
              ,{ memberPrice[1] || 0 }
            </span>
          </PriceMember>
          <PriceNonMember>
            NÃO SÓCIO 
            <span>
              { ` R$${ wine.priceNonMember.toLocaleString('pt-br', {minimumFractionDigits: 2}) }` }
            </span>
          </PriceNonMember>
        </MainInfo>
      </Link>
      <BtnAdd
        onClick={ () => addToCart(wine) }
      >
        ADICIONAR
      </BtnAdd>
    </Card>
  )
}

export default WineCard

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  width: 250px;
  height: 400px;
  margin: 10px;
`

const WineImage = styled.img`
  width: 100px
`

const Price = styled.span`
  text-decoration: line-through;
  color: gray;
`
const Discount = styled.span`
  color: #FFF;
  font-size: 12px;
  background-color: orange;
  border-radius: 5px;
  margin-left: 5px;
  padding: 3px 5px;
`

const PriceMember = styled.p`
  font-size: 12px;
  span {
    color: #B6116E;
    font-size: 12px;
    span {
      font-size: 24px;
    }
  }
`

const PriceNonMember = styled.p`
  font-size: 12px;
  color: #999999;
  margin-top: 0px;
`

const BtnAdd = styled.button`
  width: 250px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 12px;
  color: #FFF;
  background-color: #369f36;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 8px;
  }
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  background-color: #FFF;
  border-radius: 15px;
  width: 250px;
  height: 350px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 8px;
  }
`
