import {Link} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Logo from '../images/luxrota.svg'
import styles from './footer.module.css'

const year = new Date().getFullYear()


const Footer = ({siteTitle}) => (
  <footer className={styles.footer}>
    <div className={styles.brand}>
      <Link to='/' className={styles.link}>
        {/* TODO need hide actual text here too */}
        <img alt={siteTitle} className={styles.logo} src={Logo} />
      </Link>
    </div>
    <div className={styles.legal}>
      © {year} Lux Rota LLC
    </div>
  </footer>
)
Footer.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}
export default Footer
