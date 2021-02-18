import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import "./styles.css";
import inventory from "./inventory.js";
import ComposeSalad from "./ComposeSalad.js";
import ComposeSaladModal from "./ComposeSaladModal";



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
