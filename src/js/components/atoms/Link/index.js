import React from 'react';
import PropTypes from 'prop-types'

/**
 * @default {type:'link', target:'_self'}
 * @param {any} {type, ...props } 
 * @returns Link Element
 */
const Link = ({type, ...props }) => {
    return <link {...props}/>;   
}

Link.propTypes = {
    target:PropTypes.string,
    type: PropTypes.string,
    href:PropTypes.string
}
  
Link.defaultProps = {
    href:'#',
    target:'_self'
}
 

export default Link;