import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import styles from "./header.module.css";

const { Header } = Layout;

export default ({ currentLanguage, languageChangeCallback }) => {
  const [langText, setLangText] = useState("English");

  return (
    <Header style={{ background: "none" }}>
      <div className="App-logo">
        <img src={logo} alt="Seismic Risc logo"></img>
      </div>
      <Menu
        style={{ float: "right" }}
        theme="light"
        mode="horizontal"
        className="App-menu"
        selectable={false}
      >
        <Menu.Item key="about">
          <Trans>Despre</Trans>
        </Menu.Item>
        <Menu.Item key="guide">
          <Trans>Ghid pentru asociații de proprietari</Trans>
        </Menu.Item>
        <Menu.Item key="legislation">
          <Trans>Legislație</Trans>
        </Menu.Item>
        <Menu.Item key="bucharest">
          <Trans>Bucureștiul vulnerabil</Trans>
        </Menu.Item>
        <Menu.Item key="contact">
          <Trans>Contact</Trans>
        </Menu.Item>
        <Menu.Item key="add">
          <Button type="primary" icon="plus-circle" size="large">
            <Trans>Adaugă o clădire</Trans>
          </Button>
        </Menu.Item>
        <Menu.Item key="lang">
          <div
            className={styles.languageChangeButton}
            onClick={() => {
              if (currentLanguage === "en") {
                languageChangeCallback("ro");
                setLangText("English");
              } else {
                languageChangeCallback("en");
                setLangText("Romană");
              }
            }}
          >
            {langText}
          </div>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
