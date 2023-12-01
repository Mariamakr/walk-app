//const TOKEN = "d56dafcdab5c5feb9b13bcc6e320a2b0058e33a1"

export class API {

    static loginUser(body){
        return fetch(`http://127.0.0.1:8000/auth/` , {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(body)
         })
         .then(resp => resp.json())
         
    }
    static updatePlace(pl_id, body, token){
        return fetch(`http://127.0.0.1:8000/api/places/${pl_id}/` , {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Token ${token['the-token']}`
             },
             body: JSON.stringify(body)
         })
         .then(resp => resp.json())
         
    }
 

    static registerUser(body){
        return fetch(`http://127.0.0.1:8000/api/users/` , {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(body)
         })
         .then(resp => resp.json())
    }
   
    static createPlace(body, token){
        return fetch('http://127.0.0.1:8000/api/places/' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['the-token']}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static deletePlace(pl_id, token){
        return fetch(`http://127.0.0.1:8000/api/places/${pl_id}/` , {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Token ${token['the-token']}`
             },
         })         
     }
}