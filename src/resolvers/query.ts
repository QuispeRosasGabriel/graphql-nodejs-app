import { IResolvers } from 'graphql-tools';

// id: ID!
// name: String!
// lastname: String!
// emai: String!
// password: String!
// registerDate: String!
// birthdate: String!

const resolversQuery: IResolvers = {
    Query: {
        users(root, args, context, info) {
            console.log(root, args, context, info);
            return [
                {
                    id: '1',
                    name: 'Gabriel',
                    lastname: 'Quispe',
                    email: 'gabo@gmail.com',
                    passowrd: 'xddd',
                    registerDate: '23-02-1203',
                    birthdate: '12-12-1234'
                }
            ];
        }
    }
};

export default resolversQuery;