import { SECRET_KEY } from "../config/constants";
import jwt from 'jsonwebtoken'
import { IJwt } from "../interfaces/jwt.interface";

export class JWT {
    private secretKey = SECRET_KEY as string;

    sign(data: IJwt){
        return jwt.sign({user: data.user}, 
            this.secretKey, {expiresIn: 24*60*60}) 
    }
}