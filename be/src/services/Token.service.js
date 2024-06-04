import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

const { ACCESS_KEY } = process.env;

class Token {
    async genAccessToken(account) {
        return jwt.sign({
            id: account._id,
            accountType: account.accountType,
        }, ACCESS_KEY, { expiresIn: "10h" });
    }
}

export default new Token()