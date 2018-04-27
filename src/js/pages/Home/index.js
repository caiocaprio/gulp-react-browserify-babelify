import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import Link from "../../components/atoms/Link";
import Button from "../../components/atoms/Button";
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
          <h1>Nextel</h1> 
          <Button className="btn btn-secondary" onClick={e => this.onClickEvent(e)}>teste</Button>
          <p>novo site ta saindo, mas por enquanto acesse o <Link page="http://nextel.com.br" className="btn-teste">atual</Link></p>
        </div>
      </div>
    );
  }
}

export default Home; 


