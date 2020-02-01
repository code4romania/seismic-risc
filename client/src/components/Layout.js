import React from "react"
import { Layout } from "antd"
import Header from "./Header"
import SocialBar from "../components/SocialBar/SocialBar"

import "../App.css"

const { Footer, Content } = Layout

export default ({ children }) => (
  <div className="App">
    <Layout style={{ background: "none" }}>
      <Header />
      <Content>{children}</Content>
      <Footer>
        <SocialBar/>
      </Footer>
    </Layout>
  </div>
)
