import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

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
                .findOne({email, password}) 
                return{
                    status: true,
                    message: (user ? 'Lista de usuarios cargada corretamente' : 'Credenciales incorrectas, sesión no iniciada'),
                    user
                }
            } catch (error) {
                return {
                    status: false,
                    message: error,
                    user: null
                }
            }

        }
    }
};

export default resolversQuery;