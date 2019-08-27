import PropTypes from 'prop-types'
import React from 'react'

import styles from './tableHeading.module.css'


const TableHeading = ({ children }) => (
  <td className={styles.tableHeading}>
    {children}
  </td>
)
TableHeading.propTypes = {
  children: PropTypes.node.isRequired,
}
export default TableHeading
