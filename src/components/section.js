import PropTypes from 'prop-types'
import React from 'react'

import styles from './section.module.css'


const Section = ({children}) => (
  <section className={styles.section}>
    {children}
  </section>
)
Section.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Section
