import Logo from "@assets/logo";
import Link from "next/link";
import styles from "@styles/header_footer.module.css";

export default function Footer() {
    return (
        <>
        <div className={styles.spacing}></div>
        <footer className={styles.footer}>
            <div className={`${styles.container} container`}>
                <Link href="/" title="Appointix">
                    <Logo />
                </Link>
            </div>
        </footer>
        </>
    );
}
