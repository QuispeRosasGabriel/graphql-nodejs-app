import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';
import bcrypt from 'bcrypt';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(root, {user}, {db}) {
            // Comprobar que el usuario existe
            const userCheck = await db.collection(COLLECTIONS.USERS)
            .findOne({email: user.email})

            if(userCheck){
                return {
                    status: false,
                    message: `El email ${user.email} ya está registrado`,
                    user: null 
                };
            }

            // Comprobar el ultimo usuario registrado para asignar ID
            const lastUser = await db.collection(COLLECTIONS.USERS)
            .find()
            .limit(1)
            .sort({registerDate: -1})
            .toArray();
            
           lastUser.length === 0 ? user.id = 1 : user.id = lastUser[0].id + 1; 
            // Asignar la fecha en formato ISO en la propiedad RegisterDate 
            user.registerDate = new Date().toISOString();
            // Encriptar password
            user.password = bcrypt.hashSync(user.password, 10);
            // Guardar el documento Registro en la coleccion
            return await db.collection(COLLECTIONS.USERS).insertOne(user)
            .then( async () => {
                return {
                    status: true,
                    message: `El usuario con el email ${user.email} fue registrado correctamente`,
                    user 
                };
            }).catch((err: Error) => {
                console.log(err);
                return {
                    status: false,
                    message: "Error inesperado, prueba denuevo",
                    user: null
                 };
            })
        }
    }
};

export default resolversMutation;