import {graphql, StaticQuery} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Footer from './footer'
import Header from './header'

import styles from './layout.module.css'


const query = graphql`{
  site {
    siteMetadata {
      description
      title
    }
  }
}`


/**
 * Layout
 */
const Layout = ({children, heading}) => (
  <StaticQuery
    query={query}
    render={(data) => (
      <div className={styles.layout}>
        <div className={styles.header}>
          <Header heading={heading} />
        </div>
        <div className={styles.content}>
          <main className={styles.main}>
            {children}
          </main>
          <div className={styles.footer}>
            <Footer siteTitle={data.site.siteMetadata.title} />
          </div>
        </div>
      </div>
    )}
  />
)
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
}

export default Layout
