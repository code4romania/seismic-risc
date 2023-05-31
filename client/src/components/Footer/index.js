import React from 'react';
import { Layout, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../context';

const { Text } = Typography;
const { Footer } = Layout;

const FooterFragment = () => {
  const { currentLanguage } = useGlobalContext();

  return (
    <Footer className="footer">
      <div className="container">
        <div className="footer__links">
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
