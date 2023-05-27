import { useSession, signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { Navbar } from './navbar';

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
                <button
                    className="bg-gray-300 px-8 font-bold rounded-lg py-2 hover:bg-white/90 "
                    onClick={() => signIn('google')}
                >
                    Login with Google
                </button>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen bg-blue-600 flex">
            <Navbar />
            <div className="flex-grow bg-[#f5f5f7] text-black m-2 rounded-lg mx-0 p-4">{children}</div>
        </div>
    );
};
