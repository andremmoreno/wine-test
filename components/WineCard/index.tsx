import React from "react";
import styled from "styled-components";
import Image from 'next/image'

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

interface Props {
  wine: IWines,
}

interface ILoader {
  src: string,
  width: number,
  quality: number,
}

const WineCard: React.FC<Props> = ({ wine }) => {
  const memberPrice: string[] = wine.priceMember
    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')

  return (
    <Card>
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
            { memberPrice[0] },
          </span>
          { memberPrice[1] || 0 }
        </span>
        </PriceMember>
      <PriceNonMember>
        NÃO SÓCIO 
        <span>
          { ` R$${ wine.priceNonMember.toLocaleString('pt-br', {minimumFractionDigits: 2}) }` }
        </span>
      </PriceNonMember>
      <BtnAdd>
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
  height: 350px;
  margin: 10px;
  background-color: #FFF;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
    color: #af03af;
    font-size: 12px;
    span {
      font-size: 24px;
    }
  }
`

const PriceNonMember = styled.p`
  font-size: 12px;
  color: gray;
  margin-top: 0px;
`
const BtnAdd = styled.button`
  width: 250px;
  height: 35px;
  border-radius: 5px;
  color: #FFF;
  background-color: #369f36
`
