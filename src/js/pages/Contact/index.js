import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
// import { Link } from 'react-router-dom'
import Button from "../../elements/Button";
// import Bundle from 'Bundle'


class Contact extends Component {
  constructor(props){
    super(props);
  }

  onClickEvent(e){
    console.log('clicou...') 
  }
  
  render(){
    return (
      <div className="container">
        <div className="">
          <h1>Nextel</h1> 
          <h2>Contato</h2> 
          <Button className="btn btn-secondary" onClick={e => this.onClickEvent(e)}>teste</Button>
          <p>novo site ta saindo, mas por enquanto acesse o 
            <Link to="/"  className="btn-teste">atual</Link>
            </p>
        </div>
      </div> 
    );
  }
}

export default withRouter(Contact); 


