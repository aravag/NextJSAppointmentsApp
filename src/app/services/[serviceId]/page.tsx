export default async function ServicePage({ params }: { params: { serviceId: string } }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/services/${params.serviceId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { service } = await response.json();

    return (
        <div className="container">
            <h3>{service.uptitle}</h3>
            <p>{service.title}</p>
            <p>{service.description}</p>
            <p>Duration{service.duration} min.</p>
            <p>Price: ${service.price}</p>
        </div>
    );
}
