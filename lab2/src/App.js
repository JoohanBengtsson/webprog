import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import ComposeSalad from './ComposeSalad';
import ComposeSaladModal from "./ComposeSaladModal";
import ViewOrder from './ViewOrder';
import Salad from "./Salad"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let API = "http://localhost:8080/";

class App extends Component {
  /*
  state = {
    index: 1,
    inventory: {},
    salads: []  
  };
  */
 constructor(props) {
  super(props)
  this.state = {
    index: 1,
    order: JSON.parse(window.localStorage.getItem("order"))?.map(salad => new Salad(salad.foundation, ...salad.proteins, ...salad.extras, salad.dressing)) || [],
    inventory: {},
    //selectedSalad: undefined
  }
}

  componentDidMount() {
    var urls = ["foundations", "proteins", "extras", "dressings"];
    var inventory = {};
    
    Promise.all(urls.map(url => {
      return fetch(API+url)
      .then(res => res.json())
      .then(items=>{
        return Promise.all(items.map(i => {
          return fetch(API+url+"/"+i)
          .then(res => res.json())
          .then(ingr => inventory[i]=ingr)
        }))
      })
    })).then(()=>this.setState({inventory}));
  }

  /*
  addSalad = obj => {
    obj.id = this.state.index;
    const salad = [...this.state.salads, obj];
    this.setState({salads: salad});
    this.setState({index: this.state.index + 1});
  };
  */

  addSalad = (thisSalad) => {
    this.setState(state=>{
      let newOrderList = [...state.order.filter(salad=>salad !== thisSalad), thisSalad];
      window.localStorage.setItem("order", JSON.stringify(newOrderList))
      return {order:newOrderList}
    });
  }

  placeOrder = (success) => {
    if(this.state.order.length)
      fetch(API+"/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(this.state.order)
      }).then(res=>{
        success(res.ok)
      }).catch(res=>{
        success(false)
      });
    else success(false, "empty")
  }

  deleteSalad = (thatSalad) => {
    this.setState(state=>{
      let newOrderList = [...state.order.filter(salad=>salad !== thatSalad)];
      window.localStorage.setItem("order", JSON.stringify(newOrderList))
      return {order:newOrderList}
    });
  }

  clear = () => {
    localStorage.removeItem('order');
    this.state.order = [];
  };

  render() {
    const composeElements = (params) => <ComposeSalad {...params} inventory={this.state.inventory} addSalad = {this.addSalad} />;
    const viewElements = (params) => <ViewOrder {...params} order = {this.state.order} clearOrder = {this.clear} remove={this.deleteSalad} placeOrder={this.placeOrder}/>;
    const placed = (props) => <h3>Din order är placerad!</h3>
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1 className="display-4">Don Joels salladsbar</h1>
            <p className="lead">
              "En sallad om dagen är bra för magen"
            </p>
            <p className="lead2">
              -Joel Järlesäter, 2021
            </p>
          </div>
          <ul className = "nav nav-pills">
            <li className = "nav-item">
              <Link className = "nav-link" to='compose-salad'>
                Komponera din egen salad
              </Link>
            </li>
            <li className = "nav-item">
              <Link className = "nav-link" to='view-order'>
                Visa ordrar
              </Link>
            </li>
          </ul>
          <Route path = "/compose-salad" render={composeElements}/>
          <Route path = "/view-order" render={viewElements}/>
          <Route path = "/order-placed" render={placed}/>
        </div>
      </Router>
    );
  }
}

export default App;
