'use strict';
const imported = require('./inventory');

//creating the array keys including all ingrediants in the inventory
let keys = Object.keys(imported.inventory)
//creating inventory lists by type
var foundations = keys.filter(word => imported.inventory[word].foundation);
var proteins = keys.filter(word => imported.inventory[word].protein);
var extras = keys.filter(word => imported.inventory[word].extra);
var dressings = keys.filter(word => imported.inventory[word].dressing);


function printInventory() {
    console.log('Foundations: ' + foundations.join(', ') + '\n');
    console.log('Proteins: ' + proteins.join(', ') + '\n');
    console.log('Extras: ' + extras.join(', ') + '\n');
    console.log('Dressings: ' + dressings.join(', ') + '\n');
}

class Salad {
    constructor(foundation, proteins, extras, dressing){
        this.ingredients = [].concat(foundation, proteins, extras, dressing);
    }
    add(ingredient){
        this.ingredients.push(ingredient);
    }
    remove(ingredient){
        let index = this.ingredients.indexOf(ingredient);
        if(index > -1) {
            this.ingredients.splice(index, 1);
        }
    }
    getIngredients(){
        return this.ingredients;
    }
}

//Funkar inte än. Skriver ut sallad
Salad.prototype.price = function() {
    return this.ingredients.reduce((accumulated, ingredient) => accumulated + imported.inventory[ingredient].price);
};

printInventory();
let mySalad = new Salad(foundations[0], [proteins[0], proteins[1]], extras[0], dressings[0])
console.log(mySalad.getIngredients());
console.log(mySalad.price());