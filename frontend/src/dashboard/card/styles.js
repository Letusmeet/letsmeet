
import styled from 'styled-components';
import bg from './cardbg.jpg'

export const Wrapper = styled.div`
  padding: 2rem 0;
`;

export const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 8fr;
  gap: 1.2rem 1.2rem;
  img{
    width:120px;
    height: 100px;
    =
  }
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    img{
      width:120px;
      height: 100px;
    }
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.11);

  h4 {
    color: ${({ theme }) => (theme === 'light' ? '#212121' : '#3f51b5')};
  }

  p {
    color: ${({ theme }) => (theme === 'light' ? '#707070' : '#c7c7c7')};
  }
`;

export const Content = styled.div`
  padding: 1rem 0;
  color:white;
  div{
    display: flex;
  }
  div h4{
    margin-top:10%;
    margin-left:2%;
    color:white;
  }
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#3f51b5')};
  div {
    
    display: flex;
    &:first-child {
      margin-right: 0.5rem;
    }

    img {
      margin: 0;
    }

    svg path {
      fill: ${({ theme }) => (theme === 'light' ? '#000' : '#3f51b5')};
    }

    span {
      color: ${({ theme }) => (theme === 'light' ? '#000' : '#3f51b5')};
      margin-left: 0.5rem;
    }
  }
`;

export const Card = styled.div`
  padding: 1rem;
  background: rgb(12 26 45 / 74%);
  height: 100%;
`;
