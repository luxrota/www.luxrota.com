import PropTypes from 'prop-types'
import React from 'react'

import Heading from './heading'
import styles from './header.module.css'


const Header = ({heading}) => (
  <header className={styles.header}>
    <div className={styles.heading}>
      <Heading>{heading}</Heading>
    </div>
  </header>
)
Header.propTypes = {
  heading: PropTypes.string.isRequired,
}
export default Header
