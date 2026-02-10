import BookingForm from "./BookingForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: Props) {

  // ✅ unwrap params (NextJS 15 requirement)
  const { id } = await params;

  const destinationId = Number(id);

  if (!destinationId) {
    return <p>Ошибка: destinationId не найден</p>;
  }

  return <BookingForm destinationId={destinationId} />;
}
