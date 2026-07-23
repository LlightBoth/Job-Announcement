const fs = require("fs");
const path = require("path");

const bcrypt = require('bcrypt');


const user_PATH = path.join(__dirname, "../database/users.json");


function getAllUsers() {
    const data = JSON.parse(fs.readFileSync(user_PATH, "utf8"));

    return data;
}

async function getUserById(id) {
    const users = await getAllUsers();
    const userId = await users.find(u => u.id === Number(id));

    return userId;
}

async function getUserByEmail(email) {
    const users = await getAllUsers();
    const userEmail = await users.find(u => u.email === email);

    return userEmail;
}

async function createUser(user_data) {
    const users = await getAllUsers();

    // Hash Password
    user_data.password = await bcrypt.hash(user_data.password, Number(process.env.SALT_HASH));
    
    const new_user = {
        id: users.length > 0 
            ? users[users.length - 1].id + 1 
            : 1,
        ...user_data,
        status: "student",
        is_role: 0,
        createdAt: new Date().toISOString().split("T")[0]
    }

    users.push(new_user);

    fs.writeFileSync(
        user_PATH,
        JSON.stringify(users, null, 2)
    );

    return true;
}

async function updateUserDetail(id, user_data) {
    const users = await getAllUsers();

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return false;
    }

    users[index] = {
        ...users[index],
        ...user_data
    };

    fs.writeFileSync(
        user_PATH,
        JSON.stringify(users, null, 2)
    );

    return true;
}

async function updateUserPassword(id, user_data) {
    const users = await getAllUsers();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return false;
    }

    // Hash Password
    users[index].password = await bcrypt.hash(
        user_data.password,
        Number(process.env.SALT_HASH)
    ); 

    fs.writeFileSync(
        user_PATH,
        JSON.stringify(users, null, 2)
    );

    return true;
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserDetail,
    updateUserPassword
};