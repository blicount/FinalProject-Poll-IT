import React,{Component} from 'react';


class HomePage extends Component{
    render(){
        return (
            <div className='home_page' id='wrapper'>
                <a href="/catagories">
                    <img id='logo' alt="logo" src="assets/logo.png"/>
                </a>
            </div>
            );
    }
}

export default HomePage;