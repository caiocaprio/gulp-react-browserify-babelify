import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import Button from "../../elements/Button";
import Alert from "../../elements/Alert";
import Card from "../../components/Cards/Card/Card";
import CardBody from "../../components/Cards/Card/CardBody";
import CardImage from "../../components/Cards/Card/CardImage";
import {H1,H2,H5} from "../../elements/Heading";
// import Bundle from 'Bundle' 


class Home extends Component {
  constructor(props){
    super(props);
  }

  onClickEvent(e){
    alert("MLK TU É ZICA MEMO!")
  }
  
  render(){
    return (
      <div className="container">
        <div className="">
          <H1 className="logo">Nextel</H1> 
          <H2 className="h2">Home</H2> 
          <Alert className="alert-primary">Agora você é menino da gente!</Alert>
          <Button className="btn btn-secondary" onClick={e => this.onClickEvent(e)}>Não Clique!</Button>

          <div class="container">
            <div class="row">            
              <div class="col-sm">
                <Card>
                  <CardImage src="/assets/img/planos/plan-m.jpg"/>
                  <CardBody>
                    <H5>Plano de 3GB</H5>
                    <p>teste</p>
                    <Link to="/planos/3gb" className="btn btn-primary">Comprar</Link>
                  </CardBody>
                </Card> 
              </div>

              <div class="col-sm">
                <Card>
                  <CardImage src="/assets/img/planos/plan-m.jpg"/>
                  <CardBody>
                    <H5>Plano de 5GB</H5>
                    <p>teste</p>
                    <Link to="/planos/3gb" className="btn btn-primary">Comprar</Link>
                  </CardBody>
                </Card> 
              </div>

              <div class="col-sm">
                <Card>
                  <CardImage src="/assets/img/planos/plan-m.jpg"/>
                  <CardBody>
                    <H5>Plano de 10GB</H5>
                    <p>teste</p>
                    <Link to="/planos/3gb" className="btn btn-primary">Comprar</Link>
                  </CardBody>
                </Card> 
              </div>
            </div>
          </div>
          
   
          <p>novo site ta saindo, mas por enquanto acesse o 
            <Link to="/contato"  className="btn-teste">contato</Link>
            </p>
        </div>
      </div> 
    );
  }
}

export default withRouter(Home); 


