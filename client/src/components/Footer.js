import React from 'react';
import { Row, Col, Typography, Input } from 'antd';

const { Title, Text } = Typography;

// eslint-disable-next-line
function subscribe(e) {
  // const email = e.target.value;
  // TODO console.log(`TODO: send email to ${email}`);
}

const Footer = () => {
  return (
    <div className="App-footer">
      <div className="footer-inside">
        <Row type="flex" justify="space-between" gutter={[0, 40]}>
          <Col md={8} xs={24}>
            <Title level={4}>Link-uri utile</Title>
            <Row>
              <a href="/termeni-si-conditii">
                <Text>Termeni şi condiţii</Text>
              </a>
            </Row>
            <Row>
              <a href="/politica-de-confidentialitate">
                <Text>Politica de confidenţialitate</Text>
              </a>
            </Row>
            <Row>
              <a href="https://code4.ro/ro/codul-de-conduita">
                <Text>Codul de Conduită</Text>
              </a>
            </Row>
            <Row>
              <a href="https://code4.ro/ro">
                <Text>Code for Romania</Text>
              </a>
            </Row>
            <Row>
              <a href="mailto: contact@code4.ro">
                <Text>Contact</Text>
              </a>
            </Row>
          </Col>

          <Col md={8} xs={24} justify="space-between">
            <Row gutter={[0, 40]}>
              <Col>
                <Row>
                  <Title level={4} strong>
                    Abonează-te la newsletter
                  </Title>
                  <Input
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Introdu adresa de e-mail si apasă ENTER"
                    onPressEnter={subscribe}
                  />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Text level={4}>
                      © 2019 Code for Romania.
                      <br />
                      Organizație neguvernamentală independentă, neafiliată politic și apolitică.
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
