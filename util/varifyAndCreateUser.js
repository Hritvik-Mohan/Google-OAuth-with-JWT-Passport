const DATA = require('./data')

// Utility functions for checking if a user exists in the DATA array - Note: DATA array is flushed after every restart of server
module.exports.FindOrCreate = (user) => {
    if (CheckUser(user)) { // if user exists then return user
        return user
    } else {
        DATA.push(user) // else create a new user
    }
}

module.exports.CheckUser = (input) => {
    console.log(DATA)
    console.log(input)
    for (var i in DATA) {
        if (input.email == DATA[i].email && (input.password == DATA[i].password || DATA[i].provider == input.provider)) {
            console.log('User found in DATA')
            return true // found
        } else
            null
        //console.log('no match')
    }
    return false // not found
}


