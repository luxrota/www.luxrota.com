import PropTypes from 'prop-types'
import React from 'react'

import styles from './acronym.module.css'


const Acronym = ({children, title}) => (
  <abbr className={styles.acronym} title={title}>
    {children}
  </abbr>
)
Acronym.propTypes = {
  children:   PropTypes.node.isRequired,
  title:      PropTypes.string,
}
export default Acronym
