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
};

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
};

class ExtraGreenSalad extends Salad {
    constructor(foundation, proteins, extras, dressing){
        super(foundation, proteins, extras, dressing)
    }
};

class GourmetSalad extends Salad {
    constructor(foundation, proteins, extras, dressing, portions){
        super(foundation, proteins, extras, dressing);
        this.portions = portions;
    }
    getPortions(){
        return this.portions;
    };
};

GourmetSalad.add = function(ingredient, portion) {
    this.ingredients.push(ingredient);
    this.portions.push(portion);
};

GourmetSalad.prototype.price = function() {
    let initialValue = 0;
    let i = -1;
    let portions = this.portions;
    let price = this.ingredients.reduce(function (accumulator, ingredient) {
        i=i+1;
        return accumulator + (imported.inventory[ingredient].price * portions[i])
    }, initialValue)
    return price;
}

Salad.prototype.price = function() {
    let initialValue = 0;
    let price = this.ingredients.reduce(function (accumulator, ingredient) {
        return accumulator + imported.inventory[ingredient].price
    }, initialValue)
    return price;
};

ExtraGreenSalad.prototype.price = function() {
    let initialValue = 0;
    let foundation = this.ingredients.filter(ingredient => imported.inventory[ingredient].foundation);
    let rest = this.ingredients.filter(ingredient => !imported.inventory[ingredient].foundation);

    let priceFoundation = foundation.reduce(function (accumulator, ingredient) {
        return accumulator + (imported.inventory[ingredient].price * 1.3)
    }, initialValue);

    let priceRest = rest.reduce(function (accumulator, ingredient) {
        return accumulator + (imported.inventory[ingredient].price * 0.5)
    }, initialValue);
    return priceFoundation + priceRest;
}

printInventory();
let mySalad = new Salad(foundations[0], [proteins[0], proteins[1]], [extras[10], extras[22], extras[15]], dressings[0])
let myGreenSalad = new ExtraGreenSalad(foundations[0], [proteins[0], proteins[1]], [extras[10], extras[22], extras[15]], dressings[0])
let myGourmetSalad = new GourmetSalad(foundations[0], [proteins[0], proteins[1]], [extras[10], extras[22], extras[15]], dressings[0], [1.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
console.log(mySalad.getIngredients());
myGreenSalad.add(proteins[10]);
myGreenSalad.remove(proteins[10]);
console.log(myGourmetSalad.getPortions());
console.log('Salad price: ' + mySalad.price());
console.log('ExtraGreen price: ' + myGreenSalad.price());
console.log('Gourmet price: ' + myGourmetSalad.price());