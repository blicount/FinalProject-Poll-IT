import React,{Component} from 'react';
import Catagory from './Catagory';


class Catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {catagories: []}

    this.eachCatagory   = this.eachCatagory.bind(this);
  }

  componentWillMount() {
    fetch('https://poll-it-api.herokuapp.com/catagories')
      .then((Response)=>Response.json())
      .then((req)=>{
          //console.log(req)
          this.setState({
            catagories:req,
          })
          //console.log(this.state)
      })
      console.log(this.state);
  }

  eachCatagory (catagory,i) {
   return (               
        <Catagory  key={i} index={i}>
            {catagory._catagoryName}          
        </Catagory> 
      )  
  }

  render() {
      return (
        <div id='wrapper'>
        <h3>DISCOVER</h3>
            <input type="text" name="search"  className='search' placeholder="Search.."/>      
             <p style={{color:'red',marginTop:20 +'%',marginLeft:25+'%'}}>Tell us what you are into ! ! !</p>
            <div className="catagoriesList">
                {this.state.catagories.map(this.eachCatagory)}
            </div>
            <button className="btn_suprise" type="button">SUPRISE ME!</button>
        </div>

      )
  }
}



export default Catagories;