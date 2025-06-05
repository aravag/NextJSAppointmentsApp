import ServicesList from "@/app/components/ServicesList";

export default async function ServicesPage() {
    return (
        <section>
            <div className="container">
                <h2>Services</h2>
                <ServicesList />
            </div>
        </section>
    );
}
