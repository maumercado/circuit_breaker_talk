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
          <FontAwesomeIcon icon={faTwitter} size="2x" inverse pull="right" />
        </a>
        <a href={'https://www.github.com/maumercado'} className={'github social'}>
            <FontAwesomeIcon icon={faGithub} size="2x" inverse />
        </a>
      <a href={'https://www.instagram.com/maumercado'} className={'instagram social'}>
        <FontAwesomeIcon icon={faInstagram} size="2x" inverse pull="right"/>
      </a>
      </React.Fragment>

  );
}