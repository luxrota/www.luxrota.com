import { globalHistory } from '@reach/router'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Heading from './heading'
import styles from './header.module.css'


const Header = ({date, readtime, title}) => {
  let SubHeader

  // subheader not for home page
  if (globalHistory.location.pathname != '/') {
    SubHeader = (
      <div className={styles.subheader}>
        <div>{date}</div>
        <div>{readtime}</div>
        <div>
          <Link to="/">Home</Link> &gt;
        </div>
      </div>
    )
  }

  return (
    <header className={styles.header}>
      <Heading>{title}</Heading>
      {SubHeader}
    </header>
  )
}
Header.propTypes = {
  date: PropTypes.object,
  readtime: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Header
