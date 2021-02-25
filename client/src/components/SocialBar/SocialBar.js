import React from 'react';
import { Trans } from '@lingui/macro';
import facebookLogo from '../../images/facebook_grey.png';
import instagramLogo from '../../images/instagram_grey.png';
import linkedinLogo from '../../images/linkedin_grey.png';
import twitterLogo from '../../images/twitter_grey.png';

const donateLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '24px',
  height: '64px',
  background: 'rgba(31, 185, 74, 0.7)',
  borderRadius: '3px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  margin: '0 2px',
  borderTopRightRadius: '0',
  borderBottomRightRadius: '0',
  padding: '0 5px',
};

const socialImageStyle = {
  width: '100%',
  height: '100%',
};

const socialLinkStyle = {
  marginLeft: '2px',
  display: 'inline-flex',
  height: '64px',
  width: '64px',
};

const flexRow = {
  display: 'flex',
  justifyContent: 'flex-end',
  maxHeight: '64px',
};

const SocialBar = () => {
  return (
    <div style={flexRow}>
      <a
        style={socialLinkStyle}
        href="https://www.facebook.com/code4romania"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={facebookLogo} style={socialImageStyle} alt="Facebook" />
      </a>
      <a
        style={socialLinkStyle}
        href="https://www.instagram.com/code4romania"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={instagramLogo} style={socialImageStyle} alt="Instagram" />
      </a>
      <a
        style={socialLinkStyle}
        href="https://www.linkedin.com/company/code4romania"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkedinLogo} style={socialImageStyle} alt="LinkedIn" />
      </a>
      <a
        style={socialLinkStyle}
        href="https://twitter.com/Code4Romania"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={twitterLogo} style={socialImageStyle} alt="Twitter" />
      </a>

      <a
        style={donateLinkStyle}
        target="_blank"
        rel="noopener noreferrer"
        href="https://code4.ro/ro/doneaza/"
      >
        <Trans>DONATE</Trans>
      </a>
    </div>
  );
};

export default SocialBar;
