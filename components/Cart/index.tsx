import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  isOpenCart: boolean,
  setIsOpenCart: Function,
}

const Cart: React.FC<Props> = ({ isOpenCart, setIsOpenCart }) => {

  return (
    <div>
      <Background isOpenCart={ isOpenCart }/>
    <CardSide isOpenCart={ isOpenCart }>
      <button
        onClick={ () => setIsOpenCart(false) }
      >
        Fechar
      </button>
    </CardSide>
    </div>
  )
}

export default Cart

interface ICart {
  isOpenCart: boolean;
};

const CardSide = styled.div<ICart>`
  display: ${({ isOpenCart }) => (isOpenCart ? "block" : "none")};
  position: fixed;
  width: 30%;
  height: 100%;
  background-color: #FFF;
  top: 0;
  right:0;
  z-index: 1;
  @media (max-width: 800px) {
    width: 80%;
  }
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
