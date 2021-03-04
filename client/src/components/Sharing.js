import React from 'react';
import { Trans } from '@lingui/macro';

import facebookLogo from '../images/facebook.svg';
import twitterLogo from '../images/twitter.svg';
import telegramLogo from '../images/telegram.svg';

function Sharing() {
  return (
    <div className="sharing">
      <Trans> Distribuie pe:</Trans>
      <a
        target="_blank"
        rel="noreferrer"
        className="twitter-share-button"
        href="https://twitter.com/share?url=https://seismic-risc.now.sh"
        data-size="large"
      >
        <img src={twitterLogo} alt="" style={{ padding: '.5rem' }} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/sharer/sharer.php?u=https://seismic-risc.now.sh"
      >
        <img src={facebookLogo} alt="" style={{ padding: '.5rem' }} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://telegram.me/share/url?url=https://seismic-risc.now.sh"
        data-size="large"
      >
        <img src={telegramLogo} alt="" style={{ padding: '.5rem' }} />
      </a>
    </div>
  );
}

export default Sharing;
