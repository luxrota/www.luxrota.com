import PropTypes from 'prop-types'
import React from 'react'

import styles from './list.module.css'


const List = ({children}) => {
  const ListTag = 'ul'
  return (
    <ListTag className={styles.list}>
      {children}
    </ListTag>
  )
}
List.propTypes = {
  children: PropTypes.node.isRequired,
}
export default List
