import PropTypes from 'prop-types'
import React from 'react'

import styles from './preformat.module.css'


const Preformat = ({children}) => (
  <pre className={styles.preformat}>
    {children}
  </pre>
)
Preformat.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Preformat
