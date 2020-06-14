import axios from 'axios'


const getData = (method,url,objToSend) => {
    axios[method](url,objToSend)
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
          error: resp
        })
      }
    })
    .catch(function(e){
      alert(e)
      self.setState({
        isLoading: false,
      })
    })
}