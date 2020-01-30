import React from "react"
import HereMap from "../../components/HereMap"
import { Tabs } from "antd"
const { TabPane } = Tabs

const dummyPoints = [
  [44.4368, 26.1125],
  [44.4398, 26.1195],
]

export default () => {
  return (
    <Tabs size="large" animated={false} defaultActiveKey="1" onChange={null}>
      <TabPane tab="Toate clădirile cu risc seismic" key="all">
        <HereMap points={dummyPoints} />
      </TabPane>
      <TabPane tab="Clasa U1 de risc seismic" key="classU1">
        <HereMap points={dummyPoints} />
      </TabPane>
      <TabPane tab="Clasa U2 de risc seismic" key="classU2">
        <HereMap points={dummyPoints} />
      </TabPane>
      <TabPane tab="Clasa U3 de risc seismic" key="classU3">
        <HereMap points={dummyPoints} />
      </TabPane>
    </Tabs>
  )
}
