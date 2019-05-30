import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Todo from "./Todo";
// import axios from "axios";

// var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        TODO LIST
        <Todo/>
    </div>,
    document.querySelector("#root")
)