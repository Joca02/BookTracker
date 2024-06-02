import axios from "axios"

// export const checkSession=async()=>{
//     // let response=await axios.get('http://127.0.0.1:5000/check-session')
//     // if(response.data['username'])
//     //     return response.data['username']
//     // return false


//     let response=await axios.get('http://127.0.0.1:5000/check-session')
//                 let data
//                     console.log(response.data)
//                     if(response.data['username'])
//                         data=response.data['username']
//                     else data=response.data['error']
//                     alert(data)
// }

export const checkSession = () => {
    axios.get('http://127.0.0.1:5000/check-session', {
        withCredentials: true,  // This ensures cookies are sent with the request
    })
    .then(response => {
        const data = response.data;
        if (data.username) {
            console.log('Session valid:', data.username);
        } else {
            console.log('Session expired');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
