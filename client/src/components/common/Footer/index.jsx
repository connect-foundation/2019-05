import React, { Fragment } from 'react';
import './Footer.scss';


const Footer = () => (
  <footer className="footer">
    <FooterCategoryBlock title="Footer" contents={["this", "is", "footer"]} />
  </footer>
);


const FooterCategoryBlock = ({ title, contents }) => (
  <Fragment className="footer__list">
    <h1 className="footer__list-header">{title}</h1>
    <ul className="footer__list-items">
      {contents.map(content => <li>{content}</li>)}
    </ul>
  </Fragment>
)


export default Footer;