//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";
import "../styles/Todos.css";


//import your own components
import Home from "./component/home.jsx";
import "./component/Todos.jsx"
import "./component/Formulario.jsx"

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
