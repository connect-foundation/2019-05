import React from 'react';
import './Footer.scss';
import PropTypes from 'prop-types';

const Footer = () => (
  <footer className="footer">
    <FooterCategoryBlock title="Footer" contents={['this', 'is', 'footer']} />
  </footer>
);

const FooterCategoryBlock = ({ title, contents }) => (
  <div className="footer__list">
    <h1 className="footer__list-header">{title}</h1>
    <ul className="footer__list-items">
      {contents.map((content, idx) => (
        <li key={idx.toString()}>{content}</li>
      ))}
    </ul>
  </div>
);

FooterCategoryBlock.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.string),
};

FooterCategoryBlock.defaultProps = {
  title: 'default title',
  contents: ['1,2,3'],
};
export default Footer;
