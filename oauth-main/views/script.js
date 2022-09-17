const postUser = async(user) => {
    let url = '/users';
    console.log('jajajajajajjajajajajjjajajajajjaj');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(user)
        })
        if (response.ok) {
            let jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = postUser;