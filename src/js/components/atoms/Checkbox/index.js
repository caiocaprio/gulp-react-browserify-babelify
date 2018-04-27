
import React, {Component} from 'react';

/**
 * @class Checkbox
 * @extends {Component}
 * @return Checkbox Element
 */
class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked:PropTypes.bool,
};

export default Checkbox;





/**
 * @default: {labelOn:'checkbox', labelOff:'checkbox'}
 * @class CheckboxWithLabel
 * @extends {Component}
 * @return CheckboxWithLabel Element
 */
class CheckboxWithLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}

CheckboxWithLabel.propTypes = {
  onChange: PropTypes.func,
  checked:PropTypes.bool,
  labelOn:PropTypes.string,
  labelOff:PropTypes.string
};

CheckboxWithLabel.defaultProps = {
  labelOn:'checkbox',
  labelOff:'checkbox'
};

export default CheckboxWithLabel;



