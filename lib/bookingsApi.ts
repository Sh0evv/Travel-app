// bookingsApi.ts
import { getToken } from "./auth";

export const bookingsApi = {
  cancelBooking: async (bookingId: number) => {
    const token = getToken();
    if (!token) throw new Error("Нет токена");

    const res = await fetch(
      `https://student2.softclub.tj/bookings/bookings/${bookingId}/cancel`,
      {
        method: "POST", // сервер ожидает POST
        headers: {
          Authorization: `Bearer ${token}`, // обязательно токен
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      const message = errData.detail || "Неизвестная ошибка";
      throw new Error(message);
    }

    return await res.json();
  },
};
