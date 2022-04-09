import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPasword } from '../../../components/ui/auth';
import { connectToDatabase } from '../../../components/ui/db';

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const userCollection = client.db().collection('userEvents');
        const userIsLogin = await userCollection.findOne({
          email: credentials.email,
        });

        if (!userIsLogin) {
          client.close();
          throw new Error('You must create an user');
        }

        const userLoged = await verifyPasword(
          credentials.password, //ingresada
          userIsLogin.password //esta
        );

        if (!userLoged) {
          throw new Error('Email or Password incorrect!');
        }
        client.close();

        return {
          email: userIsLogin.email,
        };
      },
    }),
    // ...add more providers here
  ],
});
