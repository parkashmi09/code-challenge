import styled from "styled-components";

export const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;

  @media (max-width: 490px) {
    padding-left: 40px;
    padding-right: 40px;
  }

`;

export const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  margin-top:10px;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: normal;
`;

export const CheckboxInput = styled.input`
  margin-right: 8px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const HeaderContainer = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    transition: color 0.3s ease;

    &:hover {
      color: #f0f0f0;
    }
  }
`;

export const HomePageContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

export const HomeHeading = styled.h2`
  color: #333;
`;

export const HomeParagraph = styled.p`
  color: #555;
  line-height: 1.5;
`;
