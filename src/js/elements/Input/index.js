import React from 'react';
import PropTypes from 'prop-types'

/**
 * @default {class:form-control, type:text}
 * @param {any} {type, ...props } 
 * @returns Input Element
 */
const Input = ({type, ...props }) => {
    return <input {...props} className={`form-control ` + props.className}/>;  
}

Input.propTypes = {
    disabled:PropTypes.bool,
    type: PropTypes.string
}
  
Input.defaultProps = {
    type: 'text',
    className:'form-control',
}
 

export default Input;