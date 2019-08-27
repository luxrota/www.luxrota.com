import PropTypes from 'prop-types'
import React from 'react'

import styles from './paragraph.module.css'


const Paragraph = ({children}) => (
  <p className={styles.paragraph}>
    {children}
  </p>
)
Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Paragraph
