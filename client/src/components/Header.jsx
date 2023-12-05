import React from "react";
import { Link } from 'react-router-dom';
import { HeaderContainer, Navigation } from "./StyledComponent";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <Navigation>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user-profile">User Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
