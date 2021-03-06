import React, { Component } from 'react';

export default class ViewOrder extends Component {
    render () {
        const handlePlaceOrder = () => {
          this.props.placeOrder((ok,empty)=>{
              this.props.clearOrder()
              this.props.history.push('/order-placed')
          })
        }

        const handleClear = () => {
          this.props.clearOrder()
          this.props.history.push('/compose-salad')
        }

        if(this.props.order.length > 0) {
            return (
                <>
                <ul className = "list-group order-list">
                    {this.props.order.map((salad,i) =>
                        <li key={"salad"+i} className="saladList">
                        <span>{[i+1 + ' )', salad.foundation, ...salad.proteins, ...salad.extras, salad.dressing].filter(x=>x).join(", ")}</span>
                        <div>
                          <span>{salad.price()} kr</span>
                        </div>
                      </li>
                    )}
                </ul>
                <button type = "button"
                    className = "btn btn-danger clear"
                    onClick = {handleClear}>
                        Rensa ordrar
                </button>
                <button className="btn btn-primary" 
                    onClick={handlePlaceOrder}>
                        Beställ: {this.props.order.reduce((sum, salad) =>sum + salad.price(),0)} kr
                </button>
                </>
            )
        } else {
            return (
            <p>Dina framtida ordrar kommer visas här!</p>
            )
        }
    }

}