import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Dropdown, Layout } from 'antd';
import { DownOutlined, GlobalOutlined, MenuOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import logo from '../../logo.svg';

import { useGlobalContext } from '../../context';

const { Header } = Layout;

const LANGUAGES = {
  en: 'English',
  ro: 'Română',
  // hu: 'Magyar',
};

export default () => {
  const { currentLanguage, languageChange } = useGlobalContext();
  const [langText, setLangText] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const items = useMemo(() => {
    return langText.map((language) => ({
      label: language,
      key: language,
    }));
  }, [langText]);

  const filterLanguages = (currentLang) => {
    return Object.entries(LANGUAGES)
      .filter(([key]) => key !== currentLang)
      .map((pair) => pair[1]);
  };

  const handleLanguageBtnClick = ({ key: language }) => {
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
              <img src={logo} alt="Bulina Roșie logo" />
            </Link>
          </div>
          <ul className={`App-menu ${showMenu ? 'show' : ''}`}>
            <li>
              <NavLink className="menu-item" to="/despre" exact activeClassName="active">
                <Trans>About Project</Trans>
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
              <Button
                className="add-building"
                type="primary"
                ghost
                size="large"
                href="/adauga-cladire"
              >
                <PlusCircleFilled />
                <span>
                  <Trans>Add a building</Trans>
                </span>
              </Button>
            </li>
          </ul>
          <Dropdown
            menu={{
              items,
              onClick: handleLanguageBtnClick,
            }}
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
