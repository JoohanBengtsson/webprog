import React, {Component } from "react";
import SaladSelect from "./SaladSelect";
import SaladCheckbox from "./SaladCheckbox";
import Salad from "./Salad"

class ComposeSalad extends Component {
  constructor(props) {
      super(props);
      this.state = {
          foundation: "",
          proteins: [],
          extras: [],
          dressing: "",
          price: 0
      };
      //Handlar .bind(this) om att behålla referensen till objektet när man lämanr det för t.ex. standardbiblioteket?
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange = event => {
    event.target.parentElement.classList.add("was-validated");
    const name = event.target.getAttribute("name");
    const value = event.target.value;

    try {
      const newPrice = this.state.price + this.props.inventory[value].price;
      this.setState({price: newPrice});
    } catch (err) {
      console.error(err)
    }
    

    if(name === "foundation") {
      this.setState({foundation: value});
    } else if (name === "dressing") {
      this.setState({dressing: value});
    }
  };

  handleBoxChange = event => {
    event.target.parentElement.classList.add("was-validated");
    console.log(event.target.checked);
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    let index;

    try {
      const newPrice = this.state.price + this.props.inventory[value].price;
      this.setState({price: newPrice});
    } catch (err) {
      console.error(err)
    }

    if(name === "protein") {
      if(event.target.checked) {
        this.setState({proteins: [...this.state.proteins, value]});
      } else {
        index = this.state.proteins.indexOf(value);
        //måsvingar
        this.setState(this.state.proteins.splice(index, 1));
      }
    } else if (name === "extras") {
      if(event.target.checked) {
        this.setState({extras: [...this.state.extras, value]});
      } else {
        index = this.state.extras.indexOf(value);
        //måsvingar
        this.setState(this.state.extras.splice(index, 1));
      }
    }
  }

  handleSubmit = event => {
    event.target.classList.add("was-validated");
    event.preventDefault();

    if(event.target.checkValidity() === true) {
      let salad = this.props.selectedSalad || new Salad();
      salad.foundation = this.state.foundation;
      salad.dressing = this.state.dressing;
      salad.proteins = this.state.proteins;
      salad.extras = this.state.extras;
      this.props.addSalad(salad);

      this.setState({
        foundation: "",
          proteins: [],
          extras: [],
          dressing: "",
          price: 0
      });
      this.props.history.push('/view-order');
    }
  }

  render() {
    try {
      const inventory = this.props.inventory;

      this.foundations = Object.keys(inventory).filter(
        name => inventory[name].foundation
      );
      this.proteins = Object.keys(inventory).filter(
        name => inventory[name].protein
      );
      this.extras = Object.keys(inventory).filter(
        name => inventory[name].extra
      );
      this.dressings = Object.keys(inventory).filter(
        name => inventory[name].dressing
      );
    } catch (TypeError) {
      console.error(TypeError);
    }
    return (
      <div className = "container">
        <form onSubmit = {this.handleSubmit} noValidate>
          <h4>Välj bas</h4>
          <SaladSelect
              type = "foundation"
              items = {this.foundations}
              init = {this.state.foundation}
              handleChange = {this.handleSelectChange}
              inventory = {this.props.inventory}
          />
          <h4>Välj protein</h4>
          <SaladCheckbox
            type = "protein"
            items = {this.proteins}
            itemList = {this.state.proteins}
            onChange = {this.handleBoxChange}
            inventory = {this.props.inventory}
          />
          <h4>Välj tillbehör</h4>
          <SaladCheckbox
            type = "extras"
            items = {this.extras}
            itemList = {this.state.extras}
            onChange = {this.handleBoxChange}
            inventory = {this.props.inventory}
          />
          <h4>Välj dressing</h4>
          <SaladSelect
              type = "dressing"
              items = {this.dressings}
              init = {this.state.dressing}
              handleChange = {this.handleSelectChange}
              inventory = {this.props.inventory}
          />
          <button type = "submit" className = "btn btn-primary">
            Lägg till salad
           </button>
        </form>
      </div>
    );
  }
}

export default ComposeSalad;