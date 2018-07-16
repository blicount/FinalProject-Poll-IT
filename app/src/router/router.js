import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Catagories from "../Components/Catagories"
import Form from "../Components/Form"
import Groups from "../Components/Groups"
import Group from "../Components/Group"


//import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>           
            <Route exact path="/" component={HomePage} />
            <Route path="/catagories" component={Catagories} />
            <Route path="/catagory/" component={Form} />
            <Route path="/groups" component={Groups} />
            <Route path="/groupById" component={Group} />
        </React.Fragment>
    );}

export default ReactRouter;

