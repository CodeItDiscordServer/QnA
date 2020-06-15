import axios from 'axios'


export const getData = (method,url,objToSend) => {
    axios[method](url,objToSend)
    .then(function(resp){
      if(resp.status===200){
        return resp.data
        }
      else{
        return ({
          isLoading: false,
          error: resp
        })
      }
    })
    .catch(function(e){
      alert(e)
      return ({
        isLoading: false,
        error:"Bhaut Hard"
      })
    })
}