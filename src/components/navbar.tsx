import {
    ArchiveBoxIcon,
    BuildingLibraryIcon,
    Cog8ToothIcon,
    HomeIcon,
    QueueListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

export const Navbar = (props: Props) => {
    const router = useRouter();
    const notActive = 'flex gap-2 mb-4';
    const isActive = notActive + ' bg-white text-blue-700 p-1 rounded-l-lg ';
    return (
        <aside className=" p-4 pr-0">
            <Link href="/" className="flex mb-4 gap-2 mr-4">
                <BuildingLibraryIcon width={24} /> <span>E-commerce Admin</span>
            </Link>
            <nav>
                <Link className={`${router.pathname === '/' ? isActive : notActive}`} href="/">
                    <HomeIcon width={24} /> Dashboard
                </Link>
                <Link className={`${router.pathname === '/products' ? isActive : notActive}`} href="/products">
                    <ArchiveBoxIcon width={24} /> Products
                </Link>
                <Link className={`${router.pathname === '/oders' ? isActive : notActive}`} href="/oders">
                    <QueueListIcon width={24} /> Oders
                </Link>
                <Link className={`${router.pathname === '/settings' ? isActive : notActive}`} href="/settings">
                    <Cog8ToothIcon width={24} /> Settings
                </Link>
            </nav>
        </aside>
    );
};
