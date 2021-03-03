import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

import Facebook from '../images/footer_fb_icon.svg';
import Instagram from '../images/footer_instagram_logo.svg';
import YouTube from '../images/footer_youtube_logo.svg';
import Github from '../images/footer_github_logo.svg';
import Mkbt from '../images/footer_mkbt.svg';
import CfR from '../images/footer_CfR.svg';
import Tfsg from '../images/footer_tfsg.svg';

const { Text } = Typography;

const Footer = () => {
  return (
    <div className="App-footer">
      <div className="footer-inside">
        <Row type="flex" justify="center" gutter={[40, 20]} style={{ margin: '2rem 0rem' }}>
          <Col>
            <Text>
              <Trans>Proiect realizat de </Trans>
            </Text>
            <img src={Mkbt} alt="" height="40px" />
          </Col>
          <Col>
            <Text>
              <Trans>Proiectat de </Trans>
            </Text>
            <img src={CfR} alt="" height="40px" />
          </Col>
          <Col>
            <Text>
              <Trans>Implementat de </Trans>
            </Text>
            <img src={Tfsg} alt="" height="40px" />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" gutter={[0, 20]} style={{ alignItems: 'center' }}>
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
          <Button
            style={{
              width: '15rem',
              height: '3.5rem',
              backgroundColor: '#7BCF95',
              borderColor: '#7BCF95',
              radius: '3px',
            }}
          >
            <Text
              style={{
                fontFamily: 'Titillium Web',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              <Trans>Donate</Trans>
            </Text>
          </Button>
        </Row>
        <Row style={{ margin: '2rem 0px' }}>
          <hr />
        </Row>
        <Row type="flex" justify="center">
          <Col md={2}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={Facebook} alt="" />
            </a>
          </Col>
          <Col md={2}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={Instagram} alt="" />
            </a>
          </Col>
          <Col md={2}>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <img src={YouTube} alt="" />
            </a>
          </Col>
          <Col md={2}>
            <a href="github" target="_blank" rel="noreferrer">
              <img src={Github} alt="" />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
