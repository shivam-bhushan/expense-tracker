import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyRoute = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        console.log("I am getting the token", token)

        if (!token) return res.status(401).json({ message: 'Unauthorized' })
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

}