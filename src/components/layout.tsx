import { useSession, signIn } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import { Navbar } from './navbar';
import { useMediaQuery } from '@/hooks';
import { ChevronDoubleRightIcon, ListBulletIcon } from '@heroicons/react/24/outline';

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const { data: session } = useSession();
    const mediaQuery = useMediaQuery('(min-width: 640px)');

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

    const showNavbarHanler = () => {
        setShowNavbar((prev) => !prev);
    };

    return (
        <div className="w-full min-h-screen  flex relative">
            {mediaQuery ? (
                <Navbar />
            ) : (
                <div className=" top-0 right-0  z-50   fixed animation duration-300">
                    <div onClick={showNavbarHanler} className="absolute mt-2 ml-2">
                        {!showNavbar ? (
                            <ListBulletIcon
                                width={32}
                                className="cursor-pointer hover:scale-110 absolute top-4 right-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 rounded-md"
                            />
                        ) : (
                            <ChevronDoubleRightIcon
                                width={32}
                                className="cursor-pointer hover:scale-110 text-sky-500 "
                            />
                        )}
                    </div>
                    {showNavbar && (
                        <div className="bg-blue-600 py-10 h-screen">
                            <Navbar />
                        </div>
                    )}
                </div>
            )}

            <div className={`flex-grow bg-[#f5f5f7] text-black m-2 rounded-lg mx-0 p-4 `}>{children}</div>
        </div>
    );
};
