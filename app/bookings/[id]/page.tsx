import BookingForm from "./BookingForm";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: Props) {
    const { id } = await params; // ✅ unwrap params

    const destinationId = Number(id);

    if (!destinationId) {
        return <p>Ошибка: destinationId не найден</p>;
    }

    return <BookingForm destinationId={destinationId} />;
}
