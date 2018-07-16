import React, {Component} from 'react'
import Catagory from './Catagory';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {group:[],
     active: false,}
    
    this.eachPrameter = this.eachPrameter.bind(this);
    this.showForm     = this.showForm.bind(this);
  }

  componentDidMount() {
    var id = this.props.location.pathname.substring(11);
    fetch('https://poll-it-api.herokuapp.com/groupById/'+id)
      .then((Response)=>Response.json())
      .then((req)=>{
          //console.log(req)
          this.setState({
            group:req,
          })
          //console.log(this.state);        
      })

      fetch('https://poll-it-api.herokuapp.com/groupById/'+id)
      .then((Response)=>Response.json())
      .then((req)=>{
          //console.log(req)
          this.setState({
            group:req,
          })
          //console.log(this.state);        
      })
  }

  showForm(){
     const currentState = this.state.active;
     this.setState({ active: !currentState });
    //style={{marginRight:7+'px'}}
    //"groupForm" onSubmit={this.handleSubmit}
  }

  eachPrameter(param,i){
    console.log(this.state); 
    return(
      <div key={i} index={i}>
        <span className="group_subject" >
          <h3>{param.name}</h3>
          <h4>Location: {param.location}</h4>
          <h5> Date: {param.creation_date.substring(0,10)}</h5>
        </span>
        <span className="group_options" >
          <h3>Suggest Options</h3>
          <div className="options_list">

          </div>
          <button className="add_option_btn" type="button" onClick={this.showForm}>Add Option</button>
        </span>
        <div className={this.state.active ? 'hidden' : 'add_option_form'}>
          <form className="groupForm"  method="post" action="https://poll-it-api.herokuapp.com/createGroup">
            <label>Email Addres:
              <input placeholder=" Email" type="email" name="email" />
            </label>    
            <label>Group Description:
              <input className="option_box" placeholder=" Option" type="text" name="option" />
            </label>             
            <input id="groupSubmit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      )
  }

  render() {
      return (
            <div id='wrapper'>
            {this.state.group.map(this.eachPrameter)}
             </div>
      )   
  }
}
export default Group