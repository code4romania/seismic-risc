import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { DownOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import logo from '../logo.svg';

import { useGlobalContext } from '../context';

const { Header } = Layout;

const LANGUAGES = {
  en: 'English',
  ro: 'Română',
  // hu: 'Magyar',
};

const languageMenu = (langText, handleMenuClick) => {
  return (
    <Menu onClick={(e) => handleMenuClick(e.key)}>
      {langText.map((language) => (
        <Menu.Item key={language}>{language}</Menu.Item>
      ))}
    </Menu>
  );
};

export default () => {
  const { currentLanguage, languageChange } = useGlobalContext();
  const [langText, setLangText] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const filterLanguages = (currentLang) => {
    return Object.entries(LANGUAGES)
      .filter(([key]) => key !== currentLang)
      .map((pair) => pair[1]);
  };

  const handleLanguageBtnClick = (language) => {
    const locale = Object.keys(LANGUAGES).find((key) => LANGUAGES[key] === language);
    languageChange(locale);
    setLangText(filterLanguages(locale));
  };

  useEffect(() => {
    setLangText(filterLanguages(currentLanguage));
  }, []);

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
          <NavLink to="/blog" activeClassName="active">
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            <Trans>Contact us</Trans>
          </NavLink>
        </li>
      </ul>
      <Dropdown overlay={() => languageMenu(langText, handleLanguageBtnClick)} trigger={['click']}>
        <Button>
          <GlobalOutlined />
          <DownOutlined />
        </Button>
      </Dropdown>
      <Button className="App-menu-button" onClick={handleMenuClick}>
        <MenuOutlined />
      </Button>
      <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={handleMenuClick} />
    </Header>
  );
};
