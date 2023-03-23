DROP TABLE bookings;
DROP TABLE rooms;
DROP TABLE users;

CREATE TABLE bookings(
    booking_id INT NOT NULL AUTO_INCREMENT,
    guest_name varchar(255) NOT NULL,
    guest_picture varchar(500) NOT NULL,
    order_date DATETIME NOT NULL,
    check_in DATETIME NOT NULL,
    check_out DATETIME NOT NULL,
    special_request varchar(500) NULL,
    room_type varchar(32) NOT NULL,
    room_status TINYINT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE rooms (
    id INT NOT NULL AUTO_INCREMENT,
    picture varchar(500) NOT NULL,
    room_id INT NOT NULL,
    room_type varchar(50) NOT NULL, 
    room_floor varchar(32) NOT NULL,
    amenities varchar(255) NOT NULL,
    price INT NOT NULL,
    offer INT NOT NULL,
    room_status TINYINT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    pass varchar(300) NOT NULL,
    user_picture varchar(500) NOT NULL,
    joined_date DATETIME NOT NULL,
    job_description varchar(500) NOT NULL,
    phone_number varchar(40) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY(id)
);