import Link from "next/link";
import Logo from "@assets/logo";
import styles from "@styles/header_footer.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export default async function Header() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className={`${styles.spacing} ${styles.header__spacing}`}></div>
            <header className={styles.header}>
                <div className={`${styles.container} container`}>
                    <Link href='/' title='Appointix'>
                        <Logo />
                    </Link>
                    <nav>
                        <ul className={styles.navigation}>
                            <li>
                                <Link href='/'>Home</Link>
                            </li>
                            <li>
                                <Link href='/services'>Services</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.buttons}>
                        {session ? (
                            <Link href='/profile' className='button button__primary'>
                                Profile
                            </Link>
                        ) : (
                            <>
                                <Link href='/register' className='button button__secondary'>
                                    Register
                                </Link>
                                <Link href='/login' className='button button__primary'>
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
