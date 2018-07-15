import React, {Component} from 'react'


class Catagory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _catagoryId:'',
      _catagoryName:''
    }

    this.chooseCatagory = this.chooseCatagory.bind(this);
  }

  chooseCatagory(){

  }

  render() {
      return (
        <a className="catagory" href={`/catagory?cat=` + this.props.children}>
          {this.props.children}
        </a>
      )
  }
}
export default Catagory