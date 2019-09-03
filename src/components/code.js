import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './code.module.css'


const Code = ({children, className}) => (
  <code className={classnames(className, styles.code)}>
    {children}
  </code>
)
Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Code
