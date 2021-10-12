import React, { useCallback } from 'react';
import { Trans } from '@lingui/macro';

import copyToClipboardIcon from '../../images/copy-to-clipboard.svg';
import facebookLogo from '../../images/facebook.svg';
import twitterLogo from '../../images/twitter.svg';
import whatsappLogo from '../../images/whatsapp.svg';
import telegramLogo from '../../images/telegram.svg';

const URL = 'https://seismic-risc.now.sh';

function Sharing() {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(URL);
  }, []);

  return (
    <div className="sharing">
      <Trans>Share:</Trans>
      <a className="sharing-icon" onClick={copyToClipboard}>
        <img src={copyToClipboardIcon} alt="" />
      </a>
      <a
        className="sharing-icon"
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${URL}`}
      >
        <img src={facebookLogo} alt="" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        className="sharing-icon"
        href={`https://twitter.com/share?url=h${URL}`}
        data-size="large"
      >
        <img src={twitterLogo} alt="" />
      </a>
      <a
        className="sharing-icon"
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/?text=${URL}`}
        data-size="large"
      >
        <img src={whatsappLogo} alt="" />
      </a>
      <a
        className="sharing-icon"
        target="_blank"
        rel="noreferrer"
        href={`https://telegram.me/share/url?url=h${URL}`}
        data-size="large"
      >
        <img src={telegramLogo} alt="" />
      </a>
    </div>
  );
}

export default Sharing;
