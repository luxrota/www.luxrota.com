import PropTypes from 'prop-types'
import React from 'react'

import styles from './aside.module.css'


const Aside = ({ children }) => (
  <aside className={styles.aside}>
    {children}
  </aside>
)
Aside.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Aside
