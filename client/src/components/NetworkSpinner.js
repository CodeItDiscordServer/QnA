import React,{Component} from "react";
import axios from "axios"

const FAILSTRING = "fail"


class Networker extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      data: false,
    }
  }
  componentDidMount(){
    const self =this;
// stuff,filename
    // each network call has a body and a usernae
    var objToSend ={}
    
    objToSend.data = this.props.body;


    axios[this.props.method](this.props.url,objToSend)
    .then(function(resp){
      if(resp.status===200){
        self.setState({
          isLoading: false,
          data: resp.data,
        });
        if(self.props.onData){
          self.props.onData(resp.data);
        }
      }
      else{
        self.setState({
          isLoading: false,
        })
      }
    })

  }

  render(){
    return(
      <div>
        {!this.state.error && this.state.isLoading && (<div ><p style={{fontSize: "24px", color: "pink"}}>loading network</p></div>)}
        {!this.state.isLoading && <p>Done!</p>}
        {this.state.error && this.state.error}
      </div>
    )
  }
}


export default Networker;
