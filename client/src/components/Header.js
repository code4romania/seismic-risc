import React from "react"
import { Layout, Menu, Button } from "antd"
import logo from "../logo.svg"
import { Link } from "react-router-dom";

const { Header } = Layout

export default props => (
  <Header style={{ background: "none" }}>
    <div className="App-logo">
      <Link to="/"><img src={logo} alt="Seismic Risc logo"></img></Link>
    </div>
    <Menu theme="light" mode="horizontal" className="App-menu">
      <Menu.Item key="about">Despre</Menu.Item>
      <Menu.Item key="guide">Ghid pentru asociații de proprietari</Menu.Item>
      <Menu.Item key="legislation">Legislație</Menu.Item>
      <Menu.Item key="bucharest">Bucureștiul vulnerabil</Menu.Item>
      <Menu.Item key="contact">Contact</Menu.Item>
      <Menu.Item key="add">
        <Button type="primary" icon="plus-circle" size="large">
          Adaugă o clădire
        </Button>
      </Menu.Item>
    </Menu>
  </Header>
)
