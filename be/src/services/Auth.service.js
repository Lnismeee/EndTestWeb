import Account from "../models/Account.model.js";
import bcrypt from "bcrypt";
import TokenService from "./Token.service.js";
 
class AuthService {
    async login(req, res) {
        try {
            const findAccount = await Account.findOne({
                 email: req.body.email
            });
            if (!findAccount) {
                return res
                    .status(401)
                    .json({ error: "Wrong email" });
            }
            const comparePassword = await bcrypt.compare(
                req.body.password,
                findAccount.password
            );
            if (!comparePassword) {
                return res.status(401).json({ error: "Wrong password" });
            }
            const {  password, ...others } = findAccount._doc;
            if (findAccount && comparePassword) {
                const genAccessToken = await TokenService.genAccessToken(
                    findAccount._doc
                );

                res.cookie("accessToken", genAccessToken, {
                    httpOnly: false,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                
                return res
                    .status(200)
                    .json({
                        message: "Login Successfully",
                        data: { ...others },
                    });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async register(req, res) {
        const { email, password, name } = req.body;

        try {
            const checkEmailExists = await Account.findOne({ email: email });
            if (checkEmailExists !== null){
                return res.status(400).json({ message: "Email has exists" });

            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Account.create({
                name,
                email,
                password: hashedPassword,
            }).then((data) => {
                return res.status(201).json({
                    message: "Register Successfully",
                    data: {
                        name: data.name,
                        email: data.email,
                    },
                });
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    async logout(req, res) {
        res.clearCookie("accessToken");
        return res.status(200).json("Logout successful");
    }
    
}

export default new AuthService();
