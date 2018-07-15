import React, {Component} from 'react'
  

var expanded = false;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
    }
    this.myRef = React.createRef();
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.eachUsers      = this.eachUsers.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
  }

  
  componentWillMount(){
    fetch('https://poll-it-api.herokuapp.com/getAllUsers')
      .then((Response)=>Response.json())
      .then((req)=>{
          //console.log(req)
          this.setState({
            users:req,
          })
          //console.log(this.state)
      })


  } 


  eachUsers(user,i){
    return(
      <label key={i}>
        <input type="checkbox" key={i} name="user" />{user.email}
      </label>
      )
  }


  showCheckboxes(event){

      //console.log(this.myRef.current);
      if (!expanded) {
        this.myRef.current.style.display = 'block';

        expanded = true;
      } else {
        this.myRef.current.style.display = 'none';
        expanded = false;
      }
   }



  handleSubmit(){
    
    this.props.history.push('/groups');
  }

  render() {
      return (
        <div id='wrapper'>
          <form className="groupForm" onSubmit={this.handleSubmit}  method="post" action="https://poll-it-api.herokuapp.com/createGroup">
            <label>Email Addres:
              <input placeholder=" Email" type="email" name="email" />
            </label>  
            <label>Group Name:
              <input placeholder=" Group Name" type="text" name="groupname" />
            </label>                      
            <label>
              Catagory:
              <input  name="catagory" value={this.props.location.search.substring(5)}  disabled />
            </label>  
            <label>Group Description:
              <input placeholder=" Discription" type="text" name="discription" />
            </label>             
            <div className="multiselect">
              <div className="selectBox" onClick={this.showCheckboxes}>
                <label>Add Friends:</label>
                <select>
                  <option>Select an option</option>
                </select>
                <div className="overSelect"></div>
              </div>
              <div id="checkboxes" ref={this.myRef}>
                {this.state.users.map(this.eachUsers)}
              </div>
            </div>
            <input id="groupSubmit" type="submit" value="Submit"/>
          </form>
        </div>
  
      )
  }
}



export default Form