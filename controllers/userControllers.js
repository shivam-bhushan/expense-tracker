import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

export const signup = async (req, res) => {
    const { name, email, mobile_number, password } = req.body
    try {
        //validaite input
        if (!name || !email || !password || !mobile_number) return res.status(400).json({ message: "Please provide name, email, mobile number and password" })

        //check for existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(409).json({ message: "User already exists" })

        //hash password
        const hashedPassword = await bcryptjs.hash(password, 12)
        const newUser = await User.create({ name, email, mobile_number, password: hashedPassword })


        // sign token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        console.log('token created', token) // for testing
        res.status(200).json({ result: newUser, token })

    } catch (err) {
        console.log(err) // for testing
        return res.status(500).json(err.message)
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        //validaite input
        if (!email || !password) return res.status(400).json({ message: "Please provide email and password" })

        //check for existing user
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        //compare password
        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong credentials" })

        // sign token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        console.log('token created', token) // for testing
        res.status(200).json({ result: existingUser, token })

    } catch (err) {
        console.log(err) // for testing
        return res.status(500).json({ message: "Something went wrong" }, err)
    }
}



export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


