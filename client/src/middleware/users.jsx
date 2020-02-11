import axios from 'axios';
let response
export const signin=async(data)=>
{
    response= await axios.post(`http://localhost:5001/api/users/signin`,{data})
    return response
}
export const login=async(data)=>
{
    response=await axios.post(`http://localhost:5001/api/users/login`,data)
    console.log(response)
      return response
}
