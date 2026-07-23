const userService = require('../services/userServices');


const getUsers = async(req, res) => {
    const users = await userService.getAllUsers();

    res.json(users);
}

const getUserId = async(req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);

    if (!user) {
        return res.json({"message": "user not found."})
    }

    res.json(user);
}

const getUserViaEmail = async(req, res) => {
    const {email} = req.body;
    const find_user = await userService.getUserByEmail(email);
    if (!find_user) {
        return res.json({message: "Fail to find user."});
    }
    res.json(find_user);
}

const createUser = async(req, res) => {
    const data = req.body;
    if (data === null || !data) {
        return res.json({message: "Please fill all form."})
    }
    const new_user = await userService.createUser(data);
    if (!new_user) {
        return res.json({message: "Fail to create new user."});
    }
    res.status(201).json({
        message: "user created successfully",
        new_user
    });
}

const updateUser = async(req, res) => {
    // Get data from frontend
    const { fullname, email, phone, address, status } = req.body;

    if (!fullname || !email || !phone || !address || !status) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }
    
    // Find user via email
    const users = await userService.getAllUsers();
    const find_user = await users.find(u => u.email === email);

    if (!find_user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    // Update user
    const data = { fullname, email, phone, address, status };
    const edit_user = await userService.updateUserDetail(find_user.id, data);
    if (!edit_user) {
        return res.status(400).json({message: "Fail to fetch user."});
    }

    res.status(201).json({
        message: "Profile updated successfully!",
        find_user
    });
}

const updatePassword = async(req, res) => {
    // Get data from frontend
    const { email, password, confirmPassword } = req.body;

    if (!email ||!password || !confirmPassword) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }
    // Compare password together
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    // Find user via email
    const users = await userService.getAllUsers();
    const find_user = await users.find(u => u.email === email);

    // Update user
    const data = { password };
    const edit_user_password = await userService.updateUserPassword(find_user.id, data);
    if (!edit_user_password) {
        return res.status(400).json({message: "Fail to fetch user."});
    }

    res.status(201).json({
        message: "Password updated successfully! Redirecting to login..."
    });
}

module.exports = {
    getUsers,
    getUserId,
    getUserViaEmail,
    createUser,
    updateUser,
    updatePassword
};