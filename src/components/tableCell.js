import PropTypes from 'prop-types'
import React from 'react'

import styles from './tableCell.module.css'


const TableCell = ({children}) => (
  <td className={styles.tableCell}>
    {children}
  </td>
)
TableCell.propTypes = {
  children: PropTypes.node.isRequired,
}
export default TableCell
