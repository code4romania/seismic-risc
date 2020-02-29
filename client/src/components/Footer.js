import React from "react";
import { Row, Col, Typography, Input } from "antd";

const { Title, Text } = Typography;

function subscribe(event) {
  const email = event.target.value;
  console.log(`TODO: send email to ${email}`);
}

const Footer = props => {
  const [textStyle, setTextStyle] = React.useState({
    textAlign: window.innerWidth > 768 ? "start" : "center"
  });

  const updateWidth = () => {
    const width = window.innerWidth;
    if (width < 768) {
      textStyle.textAlign = "center";
      setTextStyle(textStyle);
    } else {
      textStyle.textAlign = "start";
      setTextStyle(textStyle);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  return (
    <div className="App-footer">
      <div className="footer-inside">
        <Row type="flex" justify="space-between" gutter={[0, 40]}>
          <Col md={8} xs={24} style={textStyle}>
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
                <Row style={textStyle}>
                  <Title level={4} strong>
                    Abonează-te la newsletter
                  </Title>
                  <Input
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Introdu adresa de e-mail si apasă ENTER"
                    onPressEnter={subscribe}
                  />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col style={textStyle}>
                    <Text level={4}>
                      © 2019 Code for Romania.
                      <br />
                      Organizație neguvernamentală independentă, neafiliată
                      politic și apolitică.
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
