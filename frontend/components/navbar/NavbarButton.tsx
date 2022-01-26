import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { isValidElement } from 'react';
import styles from '../../styles/Navbar.module.scss';

type Props = {
    children: any;
    path?: string;
    onClick?: string;
}
export const NavbarButton: React.FC<Props> = ({ children, path }) => {
    const router = useRouter();
    const isActive = router.asPath.includes(path);

    const className = [styles['button'], isActive && styles['active-button']].join(' ');
    return(
        <Link href={`/${path}`}>
            <a>
                <div className={className}>
                    {children}
                </div>
            </a>
        </Link>
    )
}