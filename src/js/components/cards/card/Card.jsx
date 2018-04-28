import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { more: false };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({ more: !state.more }));
    }
    render() {
        return (
            <div className={`card` + (!this.props.className ? `` : ` ` + this.props.className)}>
            {this.props.children ? this.props.children : ``}
            </div>
        );
    }
}

  
Card.defaultProps = {
    className:'',
}

export default Card;
