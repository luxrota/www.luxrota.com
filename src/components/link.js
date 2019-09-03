import { Link as LinkInternal } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import LinkExternal from './linkExternal'

import styles from './link.module.css'


/**
 *
 */
const Link = ({children, href}) => {
  let LinkComponent = LinkExternal  // external link default
  if (/^\/(?!\/)/.test(href)) {
    LinkComponent = LinkInternal    // internal link override
  }

  return (
    <LinkComponent className={styles.link} to={href}>
      {children}
    </LinkComponent>
  )
}
Link.propTypes = {
  children: PropTypes.node.isRequired,
  href:     PropTypes.string.isRequired,
}

export default Link
