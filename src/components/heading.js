import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './heading.module.css'

const Heading = ({children, id, level}) => {
  const HeadingTag = `h${level}`
  return (
    <HeadingTag id={id}
                className={classnames(styles.heading, styles[HeadingTag])}
                >
      {children}
    </HeadingTag>
  )
}
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  level: PropTypes.oneOf(1, 2, 3, 4, 5, 6),
}
Heading.defaultProps = {
  level: 1,
}

export default Heading
