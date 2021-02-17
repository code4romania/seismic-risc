import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input } from 'antd';
import { Trans } from '@lingui/macro';

import { useGlobalContext } from '../context';

const { Title, Text } = Typography;

// eslint-disable-next-line
function subscribe(e) {
  // const email = e.target.value;
  // TODO console.log(`TODO: send email to ${email}`);
}

const Footer = () => {
  const { currentLanguage } = useGlobalContext();
  const [newsletterPlaceholderText, setNewsletterPlaceholderText] = useState('');

  useEffect(() => {
    switch (currentLanguage) {
      case 'ro':
        setNewsletterPlaceholderText('Introdu adresa de e-mail si apasă ENTER');
        break;

      case 'hu':
      default:
        setNewsletterPlaceholderText('Insert the e-mail address and press ENTER');
    }
  }, [currentLanguage]);

  return (
    <div className="App-footer">
      <div className="footer-inside">
        <Row type="flex" justify="space-between" gutter={[0, 40]}>
          <Col md={8} xs={24}>
            <Title level={4}>
              <Trans>Useful links</Trans>
            </Title>
            <Row>
              <a href="/termeni-si-conditii">
                <Text>
                  <Trans>Terms &amp; conditions</Trans>
                </Text>
              </a>
            </Row>
            <Row>
              <a href="/politica-de-confidentialitate">
                <Text>
                  <Trans>Privacy policy</Trans>
                </Text>
              </a>
            </Row>
            <Row>
              <a href={`https://code4.ro/${currentLanguage}/codul-de-conduita`}>
                <Text>
                  <Trans>Code of conduct</Trans>
                </Text>
              </a>
            </Row>
            <Row>
              <a href={`https://code4.ro/${currentLanguage}`}>
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
                    <Trans>Subscribe to the newsletter</Trans>
                  </Title>
                  <Input
                    style={{ width: '100%' }}
                    size="large"
                    placeholder={newsletterPlaceholderText}
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
                      <Trans>
                        An independent, non-partisan, non-political, non-govermental organization.
                      </Trans>
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
