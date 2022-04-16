import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartCard from "../CartCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  isOpenCart: boolean,
  setIsOpenCart: Function,
  cart: IWines[],
  setCart: Function,
}

const Cart: React.FC<Props> = ({ isOpenCart, setIsOpenCart, cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalCart, setTotalCart] = useState<number>(0)
  
  useEffect(() => {
    const totalItems = cart.reduce((acc, obj,) => acc + (obj.quantity || 1), 0);
    setTotalCart(totalItems);
    const price = cart.reduce((acc, obj,) => acc + ((obj.quantity || 1) * obj.priceMember), 0)
    setTotalPrice(price)
  }, [cart])

  return (
    <div>
      <Background 
        isOpenCart={ isOpenCart }
        onClick={ () => setIsOpenCart(false) }
      />
      <CardSide isOpenCart={ isOpenCart }>
        <div>
          <CloseCart
            onClick={ () => setIsOpenCart(false) }
          >
            <ArrowBackIcon />
            { `WineBox (${totalCart})` }
          </CloseCart>
        </div>
        <MainCart>
          { cart?.map((each) => 
            <CartCard 
              key={ each.id }
              wine={ each }
              cart={ cart }
              setCart={ setCart }
              setTotalPrice={ setTotalPrice }
              setTotalCart={ setTotalCart }
            />
          )}
        </MainCart>
        <Total>
          <h2>Total</h2>
          <PriceMember>
            R$
            <span>
              <span>
                { totalPrice
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[0]
                },
              </span>
              { totalPrice
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 }).split(',')[1] || 0
              }
            </span>
          </PriceMember>
        </Total>
        <BtnFinish>
          Finalizar Pedido
        </BtnFinish>
      </CardSide>
    </div>
  )
}

export default Cart

interface ICart {
  isOpenCart: boolean;
};

const CardSide = styled.div<ICart>`
  display: ${({ isOpenCart }) => (isOpenCart ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  width: 20%;
  height: 100%;
  background-color: #FFF;
  top: 0;
  right:0;
  z-index: 1;
  @media (max-width: 800px) {
    width: 80%;
  }
`

const MainCart = styled.div`
  overflow-y: scroll;
`

const Background = styled.div<ICart>`
  display: ${({ isOpenCart }) => (isOpenCart ? "block" : "none")};
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000a5;
  top: 0;
  right:0;
`
const BtnFinish = styled.button`
  width: 80%;
  height: 35px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  color: #FFF;
  background-color: #369f36;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 8px;
  }
`

const CloseCart = styled.button`
  display: flex; 
  cursor: pointer;
  border: none;
  border-bottom: 1px solid #000;
  border-radius: 0px;
  font-size: 20px;
  background-color: #FFF;
  width: 100%;
  text-align: left;
  padding: 10px;
`

const PriceMember = styled.p`
  font-size: 12px;
  color: #B6116E;
  span {
    font-size: 12px;
    span {
      font-size: 24px;
    }
  }
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  h2 {
    color: #666666;
  }
`