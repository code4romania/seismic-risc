import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import logo from '../logo.svg';

const { Header } = Layout;

export default ({ currentLanguage, languageChangeCallback }) => {
  const [langText, setLangText] = useState('English');
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Header className={showMenu ? 'overlay' : ''}>
      <div className="App-logo">
        <Link to="/">
          <img src={logo} alt="Seismic Risc logo" />
        </Link>
      </div>
      <ul className={`App-menu ${showMenu ? 'show' : ''}`}>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <Trans>About</Trans>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ghid" activeClassName="active">
            <Trans>Guide</Trans>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            <Trans>Contact us</Trans>
          </NavLink>
        </li>
      </ul>
      <div
        className="languageChangeButton"
        role="button"
        onClick={() => {
          if (currentLanguage === 'en') {
            languageChangeCallback('ro');
            setLangText('English');
          } else {
            languageChangeCallback('en');
            setLangText('Romană');
          }
        }}
      >
        {langText}
      </div>
      <Button className="App-menu-button" onClick={handleMenuClick}>
        <MenuOutlined />
      </Button>
      <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={handleMenuClick} />
    </Header>
  );
};
