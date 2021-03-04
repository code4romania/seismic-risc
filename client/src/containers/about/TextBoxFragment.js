import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import Tfsg from '../../images/tfsg.svg';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" className="aboutTextBox">
      <Col sm={24} md={12} className="aboutTextBoxCol">
        <Paragraph className="aboutTextBox-paragraph">
          <Trans>
            #NumeProiect este proiectat de Code for Romania în Civic Labs și dezvoltat pro-bono de
            către voluntarii organizației noastre. Acest proiect nu are nicio altă sursă de
            finanțare și este administrat în întregime din donațiile voastre.
          </Trans>
        </Paragraph>
      </Col>
      <Col sm={24} md={12}>
        <img src={Tfsg} alt="Tech For Social Good" />
      </Col>
    </Row>
  );
};
