const searchQuery = document.getElementById('search')
const searchSubmit = document.getElementById('searchSubmit')

const { Business } = require('../models')



const queryDatabase = async() => {
    console.log('boo')
    const business = Business.findAll({ where: {
        [Op.like]: [{ name: `%${searchQuery}`}]
    }})
    return business
}

const getJsonResponse = async (url) => {
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}

searchSubmit.onclick = async() => {
    console.log('booooooo')
    queryDatabase()
}