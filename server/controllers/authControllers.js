const authService = require('../services/authServices');
const jwt = require('jsonwebtoken');


const loginUser = async(req, res) => {
    const data = await req.body;
    const login_data = await authService.login(data);

    if (!login_data) {
        return res.json({
            message: "Email or Password not correct.",
            route: "login.html"
        })
    }

    // Assign Token
    const token = jwt.sign(
        { id: data.id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    
    // Send response to frontend
    res.json({
        message: "Login successfully",
        data: data.email,
        token: token,
        route: login_data.is_role === 1 ? 
                    "../employee/dashboard.html" :
                    "../client/index.html"
    });
}

const registerUser = async(req, res) => {
    const data = await req.body;
    const new_user = await authService.register(data);

    if (!new_user) {
        return res.status(400).json({
            message: "Invalid Credential. try again",
            route: "register.html"
        });
    }

    res.status(201).json({
        message: "Register successfully",
        route: "../auth/login.html"
    });
}

module.exports = {
    loginUser,
    registerUser
};