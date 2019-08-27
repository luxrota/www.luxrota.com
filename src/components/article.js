import PropTypes from 'prop-types'
import React from 'react'

import styles from './article.module.css'


const Article = ({ children }) => (
  <article className={styles.article}>
    {children}
  </article>
)
Article.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Article
