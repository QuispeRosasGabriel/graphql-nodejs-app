import { SECRET_KEY, MESSAGES } from "../config/constants";
import jwt from 'jsonwebtoken'
import { IJwt } from "../interfaces/jwt.interface";

export class JWT {
    private secretKey = SECRET_KEY as string;

    public sign(data: IJwt){
        return jwt.sign({user: data.user}, 
            this.secretKey, {expiresIn: 24*60*60}) 
    }

    public verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch (error) {
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}