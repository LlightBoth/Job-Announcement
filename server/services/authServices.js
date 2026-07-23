const userServices = require('./userServices');
const bcrypt = require('bcrypt');


async function getAllUsers() {
    const users_res = await fetch('http://localhost:3000/user');
    const users_data = await users_res.json();
    return users_data;
}

async function login(data) {
    // fetch data email, password
    const {email, password} = data;

    const users = await getAllUsers();
    const find_user = await users.find(u => u.email == email);

    if (!find_user) {
        return false;
    }

    // compare Password 
    const decodePassword = await bcrypt.compare(password, find_user.password);

    if (!decodePassword) {
        return false;
    }

    return find_user;
}

async function register(data) {
    // fetch data email, password
    const {fullname,phone,email, password} = data;

    const users = await getAllUsers();
    const find_user = await users.find(u => u.email == email);
    
    if (find_user) {
        return false;
    }
    
    // Create new user
    const new_user = await userServices.createUser(data);
    if (!new_user) {
        return false;
    }

    return true;
}

module.exports = {
    login,
    register
};