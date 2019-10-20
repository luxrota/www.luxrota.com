import {Link} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Logo from './Logo'
import styles from './footer.module.css'

const year = new Date().getFullYear()


const Footer = ({siteTitle}) => (
  <footer className={styles.footer}>
    <div className={styles.brand}>
      <Link to='/' className={styles.link}>
        {/* TODO need hide actual text here too */}
        <Logo />
      </Link>
    </div>
    <div className={styles.legal}>
      © {year} {siteTitle} LLC
    </div>
  </footer>
)
Footer.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Footer
