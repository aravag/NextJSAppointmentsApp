// import styles from "@styles/page.module.css";
import ServicesList from "@/app/components/ServicesList";

export default async function Home() {
    return (
        <section>
            <div className="container">
                <h2>Services</h2>
                <ServicesList count={3} />
            </div>
        </section>
    );
}
