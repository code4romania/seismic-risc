import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import Tfsg from '../../images/tfsg.svg';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" className="aboutTextBox">
      <Col sm={24} md={20} className="aboutTextBoxCol">
        <Paragraph className="aboutTextBox-paragraph">
          <Trans id="about.project_details" />
        </Paragraph>
      </Col>
      <Col sm={24} md={4}>
        <img src={Tfsg} alt="Tech For Social Good" />
      </Col>
    </Row>
  );
};
