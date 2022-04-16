import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import Cart from "../Cart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
  cart: IWines[],
  setCart: Function,
}

const Navbar: React.FC<Props> = ({ cart, setCart }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  return (
    <Nav>
      <NavDiv>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Link href="/" passHref>
          <Logo src="https://img.wine.com.br/logo/wine/black/wine.svg" /> 
        </Link>
      </NavDiv>
      <UserDivCel>
        <Avatar />
        <CartBtn
          onClick={ () => setIsOpenCart(true) }
        />
      </UserDivCel>

      <Menu isOpen={isOpen}>
        <MenuLink>Clube</MenuLink>
        <CurrentLink href="/">Loja</CurrentLink>
        <MenuLink>Produtores</MenuLink>
        <MenuLink>Ofertas</MenuLink>
        <MenuLink>Eventos</MenuLink>
      </Menu>
      <UserDiv>
        <Avatar />
        <CartBtn
          onClick={ () => setIsOpenCart(true) }
        />
      </UserDiv>
      <Cart 
        isOpenCart={ isOpenCart }
        setIsOpenCart={ setIsOpenCart }
        cart={ cart }
        setCart={ setCart }
      />
    </Nav>
  );
};

export default Navbar;

interface IMenuProps {
  isOpen: boolean
}

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #67bc98;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  :hover {
    color: #e95ab2;
  }
  @media (max-width: 1000px) {
    padding: 1rem 1rem;
  }
`;

const CurrentLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #e95ab2;
  transition: all 0.3s ease-in;
  font-size: 1.1rem;
  border-bottom: 5px solid #e95ab2;
  @media (max-width: 1000px) {
    padding: 1rem 1rem;
  }
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`

const Nav = styled.div`
  padding: 0 10%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const Menu = styled.div<IMenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #FFF;
  @media (max-width: 800px) {
    overflow: hidden;
    border-radius: 5px;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  span {
    height: 3px;
    width: 25px;
    background: #000;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 800px) {
    display: flex;
  }
`;

const UserDivCel = styled.div`
  display: none;
  div {
    margin: 10px;
  };
  @media (max-width: 800px) {
    display: flex;
  }
`

const CartBtn = styled(ShoppingCartIcon)`
  color: gray;
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 50%;
  font-size: 42px;
  padding: 3px;
  margin-top: auto;
  margin-bottom: auto;
`

const UserDiv = styled.div`
  display: flex;
  div {
    margin: 10px;
  };
  @media (max-width: 800px) {
    display: none;
  }
`