/*
I JS skiljer man på variabler och parametrar.
I JS kan man deklarera varbialer utanför funktioner. 
I detta fall hamnar variabler i den globala namnrymden.
Detta skapar stor risk för namnkonflikter. 
Såldes ska man undvika att skriva variabler i den globala namnrymnden. 

*/ 

/*
Variabler.

Om man läser ett ej deklarerat namn får man ReferenceError.
Om man assignar en ej deklarerad variabel skapar en global variabel.
t.ex. 
(y finns inte)
y = 2; gör y global 
var y = 2; skapar y i det scope du befinner dig i.
*/

/*
Scope rules 

Två olika varianter på scopes 

Functions scope 
-var 
Om man använder var blir variablen synlig i hela funktionen. 
Man får lov att deklarera variabeln flera gånger. 
Detta kan göra saker väldigt bökiga i looper etc.
(osunt att använda) - betraktat som bad practice.
Name Hoisting - alla namndeklarationer lyfts till högst upp i funktionen

Block scope (ES2015)
-let
-const 
-som scope i Java
*/

a = [];
function foo() {
    //testa ändra mellan let och var.
    for(let i = 0; i<3; i++){
        a[i] = function () {
            console.log(i);
        };
    }
}
foo();
a[0]();
a[1]();

/*
JavaScript modules 
Varje fil får sin egen namnrymd. 
Deklarerat globalt i fil => delas inte med andra moduler (filer)

Man kan därför behöver använda: 
export {<attExportera>,<attExportera2>}
import {<attExportera>,<attExportera2>} from '.my-module.js';

Man kan också använda 
const stuff = require('.my-module.js');
Vilket innebär att allt från filen inporteras, men läggs i objektet 'stuff'.
Använda då
stuff.<attAnvända>
*/


/* 
JavaScript objects 
En samling av värden. ett ombejct är en map: string -> any value. 
Allt i java, atribute, värde etc. kallas för 'properties'.

Accessa properties: 
        - putnotation: myObj.prop;
        - Array indexering: myObj['prop'];

Lägga till properties i object: 
        - myObj.newProp = 'add stuff';

Ta bort prop från objekt: 
        - delete myObj.prop;
*/

//skapa objekt
let myObject = {
    givenName: 'Joel',
    familyName: 'Järlesäter',
    selector: 'givenName',
    getValue: function () {
        return this[this.selector];
    }
}

console.log(myObject.getValue());
myObject.selector = 'familyName';
console.log(myObject.getValue());

//object literals 
let mySecondObject = {
    five: 2 + 3,
    //man måste ha string: värde. Således:
    '5': 'five',
    '+': 'plus',
    'null': 'not a good idea name',
    //istället för a:a (samma värden på båda sidor) kan man skriva: 
    a
}

//ett annat exempel på objectliteraler eller namnliteraler: 
let myPoints = [{a: 0, y: 0}, {x: 10, z: 15}];

/* 
Constructor functions 
Man använder generellt 'new' och sen object. 
new Person('Joel');
*/ 

function Point(x,y) {
    //kom ihåg att sätta 'this.' innan variabler i functioner som är kopplade till objekt.
    this.x = x || 0;
    this.y = y || 0;
    this.getX = function() {
        return this.x;
    }
}

//Om en funciton ska användas som objekt, d.v.s. med 'new' vid anrop, namnge denna med versal i början av namnet.
let point = new Point(3, 6); 
//går även att skapa utan properties, då vi har default-värden på this-variablerna.
let point2 = new Point();
console.log(point.getX());
console.log(point2.getX());

//ett problem med this. är att det kan referera till den globala namnrymden. 
// i i detta fall man kan använda pilfunktioner eller en closure enligt: 

function Torinator () {
    let self = this;    //some choose 'that' instead of 'self'
                        //Choose one and be consistent
    self.age = 0; 
    this.growUp = function() { self.age++; };
    this.growUp2 = _ => this.age++;
    self.getAge = function() {
        return self.age;
    }
}

let tora = new Torinator();
for(var index = 0; index < 23; index++){
    tora.growUp();
} 
tora.growUp2();
console.log(tora.getAge());

/*
Prototype Based Inheritance 
Allt är baserat på objekt. Dessa skapar en prototypskedja. 
T.ex. 
let joel = new Torinator();
skapar en person med parametrarna age och growUp.
Det skapas även en prototyp: Person.prototype som refererar till Object.prototype. 
Där finns bl.a. functionerna toString() och isPrototypeOf(). 
*/

//allt som finns i prototypen finns i alla instanser av det tillhörande objektet
function Stad() {
    this.citizens = 0;
}

//typiskt lägger man därfär metoder i prototypen.
Stad.prototype.addCitizen = function() {this.citizens += 10};
Stad.prototype.getCitizen = function() { return this.citizens};
let lund = new Stad();
let stockholm = new Stad();
//man kan ändra prototyp properties för specifika instanser av objektet
//detta flyttar property:n från prototypen till instansen av objektet, dvs uppåt i prototypkedja.
stockholm.addCitizen = function() {this.citizens += 100};
stockholm.addCitizen();
lund.addCitizen();
console.log(lund.getCitizen());
console.log(stockholm.getCitizen());

/*
sub-object || Inheritance 
Skapa ett nytt objekt med utgångspunkt från ett gammalt objekt.
*/

// function Ort() {
//     this = Stad.call(this);
// }

// Ort.prototype = Object.create(Stad.prototype);
// Ort.prototype.addCitizen = function() {this.citizens += 1};
// Ort.prototype.toString = function() {
//     return 'Detta är en ort med ' + this.citizens;
// }

// let ahus = new Ort();
// ahus.addCitizen();
// console.log(ahus.toString());


/* 
JavaScript Class
*/

class House {
    constructor(squareMeter){
        this.squareMeter = squareMeter || 0;
        House.count = House.count +1; //summerar alla lägenheter som skapats
    }
    static count = 0; //statisk property 
}

class Flat extends House{
    constructor(squareMeter){
        super(squareMeter) //anropar superklassens konstruktor 
    }
    toString() {
        return 'This is a flat, not a house.'
    }
}

myHouse = new House(100);
yourHouse = new House(10);
myFlat = new Flat(100);
console.log(House.count);
console.log(myHouse.squareMeter);
console.log(myFlat.toString());

/*
Access (privata properties)
Det finns inte privata properties i JavaScript. Använd closure och skapa funktion för att nå. 
*/

//man kan dock göra properties skrivskyddade enligt:
/*

Object.defineProperty(obj, "prop", {
    value: "test",
    writable: false
});

*/

//ARRAYS
let array = [];
//justerar längd själv
array[0] = 1;
//man kan ha hål i arrays
array[2] = 'Joel';
//array.length är nu 3, men det finns bara två element i den.
//arrays kan också ha properties, eftersom de också är objekt.
array['innehåll'] = 'godtyckliga saker'; 
//array.length är således fortfarande 3, men array har nu också e property 'innehåll'
console.log(array.innehåll);
console.log(array[0]);
console.log(array[1]); //hålet blir 'undefined'
console.log(array[2]);


/*
Destructuring assignment
*/
const aList = ['one', 'two', 'three'];
const [red, yellow, green = 'default'] = aList;
const [one, ...rest] = aList;
console.log(red); //'one'
console.log(rest); // [ 'two', 'three' ]

//Spread Syntax
function sum(x, y, z) {
    return x+y+z;
}

const number = [1, 2, 3]; 
console.log(sum(...number)); //'...' innan arrayn delar upp innehåller till ensilda parametrar