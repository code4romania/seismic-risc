import React from 'react';
import { Layout, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import FooterLogo from './FooterLogo';

import Mkbt from '../../images/MKBT-logo-black.png';
import CfR from '../../images/footer_CfR.svg';
import Tfsg from '../../images/footer_tfsg.svg';

import { useGlobalContext } from '../../context';

const { Text } = Typography;
const { Footer } = Layout;

const FooterFragment = () => {
  const { currentLanguage } = useGlobalContext();

  return (
    <Footer className="footer">
      <div className="container">
        <div className="footer__logos">
          <FooterLogo
            label={<Trans>A project by </Trans>}
            href={`https://mkbt.ro/?lang=${currentLanguage}`}
            src={Mkbt}
            height="70px"
          />
          <FooterLogo
            label={<Trans>Implemented by </Trans>}
            href={`https://tfsg.code4.ro/${currentLanguage}`}
            src={Tfsg}
            height="50px"
          />
          <FooterLogo
            label={<Trans>Designed by </Trans>}
            href={`https://code4.ro/${currentLanguage}`}
            src={CfR}
            height="50px"
          />
        </div>
        <div className="footer__links">
          <Link to="/despre">
            <Text>
              <Trans>About the project</Trans>
            </Text>
          </Link>
          <Link to="/adauga-cladire">
            <Text>
              <Trans>Add a building</Trans>
            </Text>
          </Link>
          <a
            href={`https://code4.ro/${currentLanguage === 'ro' ? 'ro/doneaza' : 'en/donate'}`}
            target="_blank"
            rel="noreferrer"
            className="footer__donate"
          >
            <Text>
              <Trans>Donate</Trans>
            </Text>
          </a>
        </div>
        <div className="footer__links">
          <Link to="/politica-de-confidentialitate">
            <Text>
              <Trans>Privacy policy</Trans>
            </Text>
          </Link>
          <Link to="/termeni-si-conditii">
            <Text>
              <Trans>Terms &amp; conditions</Trans>
            </Text>
          </Link>
        </div>
      </div>
    </Footer>
  );
};

export default FooterFragment;
