import React from "react"
import { Row, Col, Card } from "antd"

const StatisticCard = props => (
  <Card style={{ border: "none", backgroundColor: "#ee741b" }}>
    <div>
      <h1 style={{ color: "white" }}>{props.value}</h1>
      <h3 style={{ color: "white" }}>{props.text}</h3>
    </div>
  </Card>
)

export default () => {
  return (
    <Row
      gutter={[8, 32]}
      type="flex"
      justify="space-around"
      style={{ margin: "2rem" }}>
      <Col span={8}>
        <StatisticCard value={6121} text="oameni sub risc" />
      </Col>
      <Col span={8}>
        <StatisticCard value={458} text="clădiri evaluate" />
      </Col>
      <Col span={8}>
        <StatisticCard value={84} text="clădiri consolidate" />
      </Col>
    </Row>
  )
}
