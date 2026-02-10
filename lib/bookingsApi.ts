import { getToken } from "./auth";

export const bookingsApi = {
  cancelBooking: async (bookingId: number) => {
    const token = getToken();
    if (!token) throw new Error("Нет токена");

    const res = await fetch(
      `https://student2.softclub.tj/bookings/bookings/${bookingId}/cancel`,
      {
        method: "DELETE", // пробуем DELETE
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const message = errData.detail || `Ошибка ${res.status}`;
      throw new Error(message);
    }

    return await res.json();
  },
};
