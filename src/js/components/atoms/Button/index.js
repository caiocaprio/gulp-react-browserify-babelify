import React, { Component } from 'react';
import PropTypes from 'prop-types'
/*<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>*/

const STATE = {
    ACTIVE: 'active',
    FOCUS: 'focus',
    DISABLE:'disabled',
    HOVER:'hover',
    OUT:'out'
};

export default class Button extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            class:''
        }
    }
    
    render() {
        return (
            <button {...props} className={`btn ` + props.className}>{text}</button>    
        );
    }
}

// const Button = ({text, ...props }) => {
//     return <button {...props} className={`btn ` + props.className}>{text}</button>;    
// }

// Button.propTypes = {
//     className: PropTypes.string,
//     text: PropTypes.string,
//     type: PropTypes.string
// }
  
// Button.defaultProps = {
//     text:'Button',
//     type: 'button',
//     className:'btn btn-primary',
// }
 

// export default Button;