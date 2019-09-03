import PropTypes from 'prop-types'
import React from 'react'

import styles from './image.module.css'


const Image = ({src}) => (
  <img className={styles.image} src={src} />
)
Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
