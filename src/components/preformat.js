import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './preformat.module.css'


const Preformat = ({children, className}) => (
  <pre className={classnames(className, styles.preformat)}>
    {children}
  </pre>
)
Preformat.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Preformat
