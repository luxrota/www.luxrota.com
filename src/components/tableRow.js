import PropTypes from 'prop-types'
import React from 'react'

import styles from './tableRow.module.css'


const TableRow = ({children}) => (
  <tr className={styles.tableRow}>
    {children}
  </tr>
)
TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}
export default TableRow
