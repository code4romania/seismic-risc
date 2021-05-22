import React from 'react';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

import { ReactComponent as Facebook } from '../images/footer_fb_icon.svg';
import { ReactComponent as Instagram } from '../images/footer_instagram_logo.svg';
import { ReactComponent as Twitter } from '../images/footer_twitter_logo.svg';
import { ReactComponent as Github } from '../images/footer_github_logo.svg';
import Mkbt from '../images/MKBT-logo-black.png';
import CfR from '../images/footer_CfR.svg';
import Tfsg from '../images/footer_tfsg.svg';

import { useGlobalContext } from '../context';

const { Text } = Typography;
const { Footer } = Layout;

const FooterFragment = () => {
  const { currentLanguage } = useGlobalContext();

  return (
    <Footer className="App-footer">
      <div className="footer-inside container">
        <Row className="logos-row" type="flex" gutter={[0, 20]} style={{ margin: '2rem 0' }}>
          <Col className="logo-col" sm={24} md={8}>
            <Text>
              <Trans>A project by </Trans>
            </Text>
            <a href={`https://mkbt.ro/?lang=${currentLanguage}`}>
              <img src={Mkbt} alt="" height="40px" />
            </a>
          </Col>
          <Col className="logo-col" sm={24} md={8}>
            <Text>
              <Trans>Designed by </Trans>
            </Text>
            <a href={`https://code4.ro/${currentLanguage}`}>
              <img src={CfR} alt="" height="40px" />
            </a>
          </Col>
          <Col className="logo-col" sm={24} md={8}>
            <Text>
              <Trans>Implemented by </Trans>
            </Text>
            <a href={`https://tfsg.code4.ro/${currentLanguage}`}>
              <img src={Tfsg} alt="" height="40px" />
            </a>
          </Col>
        </Row>
        <Row className="footer-links" type="flex" justify="space-between" gutter={[0, 20]}>
          <Col>
            <Link to="/parteneri">
              <Text>
                <Trans>Partners</Trans>
              </Text>
            </Link>
          </Col>
          <Col>
            <Link to="/despre">
              <Text>
                <Trans>About the project</Trans>
              </Text>
            </Link>
          </Col>
          <Col>
            <Link to="/adauga-cladire">
              <Text>
                <Trans>Add a building</Trans>
              </Text>
            </Link>
          </Col>
          <Col>
            <Link to="/politica-de-confidentialitate">
              <Text>
                <Trans>Privacy policy</Trans>
              </Text>
            </Link>
          </Col>
          <Col>
            <Link to="/termeni-si-conditii">
              <Text>
                <Trans>Terms &amp; conditions</Trans>
              </Text>
            </Link>
          </Col>
          <Button href="https://code4.ro/en/donate">
            <Text
              style={{
                fontFamily: "'Titillium Web', sans-serif",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '16px',
                lineHeight: '50px',
              }}
            >
              <Trans>Donate</Trans>
            </Text>
          </Button>
        </Row>
        <Row style={{ margin: '2rem 0px' }}>
          <hr />
        </Row>
        <Row type="flex" justify="center" style={{ color: '#000' }}>
          <Col xs={6} sm={2}>
            <a href="https://www.facebook.com/code4romania" target="_blank" rel="noreferrer">
              <Facebook style={{ height: '32px' }} />
            </a>
          </Col>
          <Col xs={6} sm={2}>
            <a href="https://www.instagram.com/code4romania" target="_blank" rel="noreferrer">
              <Instagram style={{ height: '32px' }} />
            </a>
          </Col>
          <Col xs={6} sm={2}>
            <a href="https://twitter.com/code4romania" target="_blank" rel="noreferrer">
              <Twitter style={{ height: '32px' }} />
            </a>
          </Col>
          <Col xs={6} sm={2}>
            <a href="https://github.com/code4romania/seismic-risc" target="_blank" rel="noreferrer">
              <Github style={{ height: '32px' }} />
            </a>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterFragment;
