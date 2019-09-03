import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './linkExternal.module.css'


/**
 *
 */
const LinkExternal = ({children, className, to}) => {
  return (
    <a className={classnames(className, styles.linkExternal)} href={to}>
      {children}
    </a>
  )
}
LinkExternal.propTypes = {
  children:   PropTypes.node.isRequired,
  className:  PropTypes.string,
  to:         PropTypes.string.isRequired,
}

export default LinkExternal
