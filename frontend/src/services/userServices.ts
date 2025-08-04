import axios from "axios"

export const getUsers = async () => {

    axios.get('/users')
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });



}
