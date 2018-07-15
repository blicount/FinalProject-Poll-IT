import React,{Component} from 'react';


class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {groups: []}

    this.eachGroup   = this.eachGroup.bind(this);
  }

  componentWillMount() {
    fetch('https://poll-it-api.herokuapp.com/groups')
      .then((Response)=>Response.json())
      .then((req)=>{
          //console.log(req)
          this.setState({
            groups:req,
          })
          console.log(this.state)
      })
  }

  eachGroup(group,i) {
    var date = group.creation_date;
    if(date != null){
          date = date.substring(0,10);
    }


   return (               
           <div className="group_box"  key={i} index={i}>
             <a 
              href="" onClick={() => {
                this.props.history.push({
                  pathname:'/groupById/'+group._id,
                  id:group.id,
                });
              }}>
             <h3>{group.name} </h3></a> 
             <span className="date" >{date}</span>
             <p>Location: {group.location}</p>
           </div>
      )  

  }

  render() {
      return (
        <div id='wrapper'>
            <div className="groups">
            <h2>All Groups</h2>
                {this.state.groups.map(this.eachGroup)}
            </div>
        </div>

      )

  }

}



export default Groups;