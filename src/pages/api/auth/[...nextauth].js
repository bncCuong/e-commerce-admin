import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';

const adminEmail = ['cuongcuong201194@gmail.com', 'cuongbn2011@gmail.com'];

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({ session, token, user }) => {
            if (adminEmail.includes(session?.user?.email)) {
                return session;
            } else {
                return false;
            }
        },
    },
};

export default NextAuth(authOptions);

export const checkAdmin = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!adminEmail.includes(session?.user?.email)) {
        res.status(401)
        res.end()
        throw 'You do not have access!!';
    }
};
