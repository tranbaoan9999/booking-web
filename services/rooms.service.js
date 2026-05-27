import { fetchApi } from "./api";

export const roomsService = {
    getAllRooms: async () => {
        return await fetchApi('/rooms');
    },
    getAvailableRooms: async (checkIn, checkOut, guest) => {
        return await fetchApi(`/rooms/available?checkin=${checkIn}&checkout=${checkOut}&guest=${guest}`);
    },
    getRoomByID: async (id) => {
        return await fetchApi(`/room/${id}`);
    }
}