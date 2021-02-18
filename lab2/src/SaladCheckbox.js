import React, {Component} from "react";

export default class SaladCheckbox extends Component{
    render() {
        const inventory = this.props.inventory;
        return(
            <div> 
            {this.props.items.map(name => (
                <div key= {name} className = "form-check">
                    <input
                        className= "from-check-input"
                        type = "checkbox"
                        value = {name}
                        name = {this.props.type}
                        checked = {
                            this.props.itemList.includes(name) || false
                        }
                        onChange= {this.props.onChange}
                    />
                    <label className = "form-check-label">{name} + {inventory[name].price}</label>kr
                </div>
            ))}
            </div>
        )
    }
}