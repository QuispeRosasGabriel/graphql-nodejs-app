import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import { JWT } from '../lib/jwt';

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
                const emailVerification = await db.collection(COLLECTIONS.USERS)
                .findOne({email});
               
                if(!emailVerification){
                        return {
                            status: false,
                            message: 'Usuario no existe',
                            token: null
                        } 
                } 
               
                const user = await db.collection(COLLECTIONS.USERS)
                .findOne({email, password})
               
                if(user){
                    delete user.password;
                    delete user.birthdate;
                    delete user.registerDate;
                } 

                return{
                    status: true,
                    message: (user ? 'Usuario cargado  corretamente' : 'Credenciales incorrectas, sesión no iniciada'),
                    token: (user ? new JWT().sign({user}, EXPIRETIME.H24 )  : null)
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