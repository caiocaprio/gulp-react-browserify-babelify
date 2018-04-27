import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import Button from "../../elements/Button";
import {H1,H2} from "../../elements/Heading";
// import Bundle from 'Bundle'


class Home extends Component {
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
          {/* <H1 className="logo">Nextel</H1> 
          <H2 className="h2">Home</H2>  */}
          <Button className="btn btn-secondary" onClick={e => this.onClickEvent(e)}>teste</Button>
          <p>novo site ta saindo, mas por enquanto acesse o 
            <Link to="/contato"  className="btn-teste">contato</Link>
            </p>
        </div>
      </div> 
    );
  }
}

export default withRouter(Home); 


