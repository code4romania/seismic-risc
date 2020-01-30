import React from "react"
import { Row, Col, Typography } from "antd"

const { Paragraph } = Typography

export default () => {
  return (
    <Row
      gutter={[64, 32]}
      type="flex"
      justify="space-around"
      style={{ margin: "1rem", textAlign: "left" }}>
      <Col sm={24} md={12}>
        <Paragraph ellipsis={{ rows: 10, expandable: true }}>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like) Many desktop publishing packages and
          web page editors now use Lorem Ipsum as their default model text, and
          a search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Paragraph>
      </Col>
      <Col sm={24} md={12}>
        <Paragraph ellipsis={{ rows: 10, expandable: true }}>
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like) Many desktop publishing packages and
          web page editors now use Lorem Ipsum as their default model text, and
          a search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like)..
        </Paragraph>
      </Col>
    </Row>
  )
}
