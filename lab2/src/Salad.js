import inventory from "./inventory.js";

class Salad{
	constructor(...components){
		this.extras = [];
		this.proteins = [];
		components.forEach(ingredientName => {
			this.add(ingredientName)
		})
	}

	price(){
		let components = [this.foundation, ...this.proteins, ...this.extras, this.dressing].filter(x=>x);
		return components.reduce((sum, component) =>{
			return sum + parseInt(inventory[component].price);
		},0);
	}

	add(ingredientName){
		let ingredientProperties = inventory[ingredientName];
		if(ingredientProperties){
			if(ingredientProperties.foundation){
				this.foundation = ingredientName;
			}else if(ingredientProperties.protein){
				this.proteins.push(ingredientName)
			}else if(ingredientProperties.extra){
				this.extras.push(ingredientName)
			}else if(ingredientProperties.dressing){
				this.dressing = ingredientName;
			}else{
				console.error("Error adding ingredient:\nName: "+ingredientName+"\nProperties:", ingredientProperties);
				return false;
			}
			return true;
		}else{
			console.error("Error adding ingredient:\nName not listed in ingredients: "+ingredientName);
		}
	}
}

export default Salad;