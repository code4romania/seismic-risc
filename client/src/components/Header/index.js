import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { DownOutlined, GlobalOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import logo from '../../logo.svg';

import { useGlobalContext } from '../../context';

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

const languageButtons = (langText, handleBtnClick) => {
  return (
    <li className="language-btn-mobile">
      <GlobalOutlined />
      {langText.map((language) => (
        <Button key={language} onClick={() => handleBtnClick(language)} type="link">
          {language}
        </Button>
      ))}
    </li>
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
    <div className="navbar">
      <Header className={showMenu ? 'overlay' : ''}>
        <div className="container">
          <div className="App-logo">
            <Link to="/">
              <img src={logo} alt="Seismic Risc logo" />
            </Link>
          </div>
          <ul className={`App-menu ${showMenu ? 'show' : ''}`}>
            <li>
              <NavLink className="menu-item" to="/despre" exact activeClassName="active">
                <Trans>About</Trans>
              </NavLink>
            </li>
            <li>
              <NavLink className="menu-item" to="/ghid" activeClassName="active">
                <Trans>Guide</Trans>
              </NavLink>
            </li>
            <li>
              <NavLink className="menu-item" to="/blog" activeClassName="active">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink className="menu-item" to="/contact" activeClassName="active">
                <Trans>Contact us</Trans>
              </NavLink>
            </li>
            <li>
              <Button className="add-building" href="/adauga-cladire">
                <PlusCircleOutlined />
                <span>
                  <Trans>Add a building</Trans>
                </span>
              </Button>
            </li>
            {languageButtons(langText, handleLanguageBtnClick)}
          </ul>
          <Dropdown
            className="language-btn-desktop"
            overlay={() => languageMenu(langText, handleLanguageBtnClick)}
            trigger={['click']}
          >
            <Button>
              <GlobalOutlined />
              <DownOutlined />
            </Button>
          </Dropdown>
          <Button className="App-menu-button" onClick={handleMenuClick}>
            <MenuOutlined />
          </Button>
          <div className={`overlay ${showMenu ? 'show' : ''}`} onClick={handleMenuClick} />
        </div>
      </Header>
    </div>
  );
};
