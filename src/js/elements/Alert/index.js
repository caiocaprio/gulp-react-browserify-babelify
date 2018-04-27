import React from 'react';
import PropTypes from 'prop-types'

/**
 * @default {class:alert, type:text}
 * @param {any} {type, ...props } 
 * @returns Alert Element
 */
const Alert = ({type, ...props }) => {
    return <div {...props} className={`alert ` + props.className} role="alert"/>;
}

Alert.propTypes = {
    disabled:PropTypes.bool,
    type: PropTypes.string
}
  
Alert.defaultProps = {
    type: 'text',
    className:'alert',
}
 

export default Alert;