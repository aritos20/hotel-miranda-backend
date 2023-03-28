export interface Bookings {
    id: number,
    guest_name: string;
    guest_picture: string;
    order_date: Date;
    check_in: Date;
    check_out: Date;
    special_request: string;
    room_type: string;
    room_status: Boolean;
}