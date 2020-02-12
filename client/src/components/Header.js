import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import logo from "../logo.svg";
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
          <Trans>About</Trans>
        </Menu.Item>
        <Menu.Item key="guide">
          <Trans>Homeowners associations guide</Trans>
        </Menu.Item>
        <Menu.Item key="legislation">
          <Trans>Legislation</Trans>
        </Menu.Item>
        <Menu.Item key="bucharest">
          <Trans>Vulnerable Bucharest</Trans>
        </Menu.Item>
        <Menu.Item key="contact">
          <Trans>Contact us</Trans>
        </Menu.Item>
        <Menu.Item key="add">
          <Button type="primary" icon="plus-circle" size="large">
            <Trans>Add a building</Trans>
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
