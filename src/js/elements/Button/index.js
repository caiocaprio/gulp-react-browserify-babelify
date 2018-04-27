import React from 'react';
import PropTypes from 'prop-types'

/**
 * @default {type:'button', className:'btn btn-primary'}
 * @param {any} {type, ...props } 
 * @returns Button Element
 */
const Button = ({type, ...props }) => {
    return <button {...props}/>;  
}

Button.propTypes = {
    disabled:PropTypes.bool,
    type: PropTypes.string
}
  
Button.defaultProps = {
    type: 'button',
    className:'btn btn-primary',
}
 

export default Button;