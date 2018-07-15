import React,{Component} from 'react';
import { Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
//import Header from "./Header";

class App extends Component{
    render(){
    return (
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
        </React.Fragment>
        );
    }
}

export default App;