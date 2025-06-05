import Link from "next/link";
import Image from "next/image";
import styles from "@styles/services_list.module.css";

type Service = {
    id: string;
    uptitle: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    companyId: string;
    companyName: string;
    image: string;
    location: {
        address: string;
        city: string;
    };
};

const fetchServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/list`);
    if (res.ok) {
        const data = await res.json();
        return data.services || [];
    }
    return [];
};

export default async function ServicesList({ count }: { count?: number } = {}) {
    let services = await fetchServices();

    if (count !== undefined) {
        services = services.sort(() => Math.random() - 0.5).slice(0, count);
    }
    return (
        <div className={styles.wrapper}>
            <ul className={styles.services}>
                {services.map((service: Service) => {
                    return (
                        <li key={service.id}>
                            <Link href={`/services/${service.id}`}>
                                <Image src={service.image} alt={service.uptitle} width={300} height={250} className={styles.image} />
                                <h3 className={styles.uptitle}>{service.uptitle}</h3>
                                <p className={styles.title}>{service.title}</p>
                                <p className={styles.description}>{service.description}</p>
                                <p className={styles.price}>${service.price}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {count !== undefined && (
                <Link href='/services' className='button button__primary'>
                    See all
                </Link>
            )}
        </div>
    );
}
