import NextAuth, { getServerSession } from 'next-auth/next';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../libs/mongoConnect';
import { User } from '../../../models/User';
import { UserInfo } from '@/app/models/UserInfo';

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',

      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        console.log('here 2');
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        console.log(user);
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        console.log(passwordOk);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin === true;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
