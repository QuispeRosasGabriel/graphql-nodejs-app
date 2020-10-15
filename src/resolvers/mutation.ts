import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(root, {user}, {db}) {
            // Comprobar el ultimo usuario registrado para asignar ID
            const lastUser = await db.collection(COLLECTIONS.USERS)
            .find()
            .limit(1)
            .sort({registerDate: -1})
            .toArray();

           lastUser.length === 0 ? user.id = 1 : user.id = lastUser[0].id + 1; 
            // Asignar la fecha en formato ISO en la propiedad RegisterDate 
            user.registerDate = new Date().toISOString();
            // Guardar el documento Registro en la coleccion
            return await db.collection(COLLECTIONS.USERS).insertOne(user)
            .then( async () => {
                return user;
            }).catch((err: Error) => {
                console.log(err);
                return null;
            })
        }
    }
};

export default resolversMutation;