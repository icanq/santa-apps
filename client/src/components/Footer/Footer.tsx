import React from 'react';
import style from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={style.footer}>
    Made with{' '}
    <a href='https://glitch.com' className={style.link}>
      Glitch
    </a>
    !
  </footer>
);

export default Footer;
