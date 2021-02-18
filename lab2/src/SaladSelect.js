import React, {Component} from "react";

export default class SaladSelection extends Component{
    render() {
        const inventory = this.props.inventory;
        return(
            <div className= 'form-group'>
                <select className='from-control'
                    value = {this.props.init}
                    name = {this.props.type}
                    onChange = {this.props.handleChange}
                    required>
                    <option value= "">Välj</option>
                    { this.props.items.map((name) => (
                        <option key= {name} value = {name}>
                            {name} + {inventory[name].price}kr
                        </option>
                    ))}
                </select>
                <div className = "invalid-feedback">Vänligen välj något.</div>
            </div>
        )}
}