import PropTypes from 'prop-types'
import React from 'react'

import styles from './listItem.module.css'


const ListItem = ({children}) => {
  return (
    <li className={styles.listItem}>
      {children}
    </li>
  )
}
ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ListItem
