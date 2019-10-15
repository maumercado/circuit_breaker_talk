import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

export default function SocialFollow() {
  return (
      <React.Fragment>
        <a href={'https://www.twitter.com/maumercado'} className={'twitter social'}>
          <FontAwesomeIcon icon={faTwitter} size="1x" />
        </a>
        <a href={'https://www.github.com/maumercado'} className={'github social'}>
            <FontAwesomeIcon icon={faGithub} size="1x" />
        </a>
      <a href={'https://www.instagram.com/maumercado'} className={'instagram social'}>
        <FontAwesomeIcon icon={faInstagram} size="1x" />
      </a>
      </React.Fragment>

  );
}