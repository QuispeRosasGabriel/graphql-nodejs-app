import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import { JWT } from '../lib/jwt';
import bcrypt from 'bcrypt';

const resolversQuery: IResolvers = {
    Query: {
        async users(root, args, {db}) {
            try {
                return {
                    status: true,
                    message: "Lista de usuarios cargada correctamente",
                    users: await db.collection(COLLECTIONS.USERS)
                    .find().toArray()
                }               
            } catch (error) {
               console.log(error);
               return {
                   status: false,
                   message: error,
                   users: []
               }; 
            }
        },
        async login(root, {email, password},{db}){
            try {
                const user = await db.collection(COLLECTIONS.USERS)
                .findOne({email});
                if(!user){
                        return {
                            status: false,
                            message: 'Usuario no existe',
                            token: null
                        } 
                } 
               
                const passwordCheck = bcrypt.compareSync(password,user.password)
          
                if(passwordCheck){
                    delete user.password;
                    delete user.birthdate;
                    delete user.registerDate;
                } 

                return{
                    status: true,
                    message: (passwordCheck ? 'Usuario cargado  corretamente' : 'Credenciales incorrectas, sesión no iniciada'),
                    token: (passwordCheck ? new JWT().sign({user}, EXPIRETIME.H24 )  : null)
                }
            } catch (error) {
                return {
                    status: false,
                    message: error,
                    token: null
                }
            }
        }
    }
};

export default resolversQuery;