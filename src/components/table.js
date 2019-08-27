import PropTypes from 'prop-types'
import React from 'react'

import styles from './table.module.css'


const Table = ({children}) => (
  <table className={styles.table}>
    {children}
  </table>
)
Table.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Table
