import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
//import App from './App';
import logo from './test.jpg'

import * as serviceWorker from './serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem,Image,Grid,Row,Col,SplitButton } from 'react-bootstrap';

class Navi extends React.Component {
  render() {
    return (
      <div className="Navi">
        
   <Navbar>
  <Nav style={{display:"flex", flexDirection:"row"}}>
    <NavItem eventKey={1} href="#home">Home</NavItem>
    <NavItem eventKey={2} href="#name">News</NavItem>
        
    <NavItem eventKey={3} href="#heat map">Heat Map</NavItem>
        
    <NavItem eventKey={4} href="#stats">Stats</NavItem>
    <NavItem eventKey={5} href="#Login">About</NavItem>


    <NavItem eventKey={5} href="#Login">Login</NavItem>

  </Nav>
</Navbar>
      </div>
    )
  }
}

class Logo extends React.Component{
    render(){
        return(
            <div>
         <Image src="http://i67.tinypic.com/dmr14o.jpg"  responsive />
   
            </div>
            )
    }
}

class info extends React.Component{
    render(){
        return(
        <div>
            
        </div>
            )
    }
}



class App extends React.Component{
    render(){
        return(
            <div>
            <Navi/>
            <Logo/>
            </div>
            )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
