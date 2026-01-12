'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './booking.module.css';
import React from 'react';

const roomsData = [
  {
    id: 1,
    name: 'Deluxe Single Room',
    price: 18,
    features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Desk & Chair'],
    description: 'Perfect for solo travelers or students. Comfortable and well-equipped.',
    image: '/img/interior-garden.jpg',
  },
  {
    id: 2,
    name: 'Standard Double Room',
    price: 18,
    features: ['Free WiFi', 'Air Conditioning', 'Shared Bathroom', '2 Single Beds'],
    description: 'Ideal for friends or colleagues. Spacious and affordable.',
    image: '/img/garden-courtyard.jpg',
  },
  {
    id: 3,
    name: 'Master Room',
    price: 20,
    features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Kitchen', 'Living Area'],
    description: 'Our most luxurious option with all the amenities you need.',
    image: '/img/dining-feast.jpg',
  },
];

export default function BookingPage({ params }) {
  const router = useRouter();
  const data = React.use(params);
  const roomId = parseInt(data.id);
  const room = roomsData.find(r => r.id === roomId);

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    numberOfRooms: 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
  });

  useEffect(() => {
    // Retrieve selected dates from localStorage
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
      const { checkIn, checkOut } = JSON.parse(storedDates);
      setBookingData(prev => ({
        ...prev,
        checkIn,
        checkOut
      }));
    }
  }, []);

  if (!room) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Room Not Found</h1>
          <Link href="/rooms" className={styles.backButton}>
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * room.price * bookingData.numberOfRooms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.guestName || !bookingData.guestEmail || !bookingData.guestPhone) {
      alert('Please fill in all required fields');
      return;
    }

    if (calculateNights() <= 0) {
      alert('Please select valid check-in and check-out dates');
      return;
    }

    const bookingInfo = {
      room,
      ...bookingData,
      nights: calculateNights(),
      total: calculateTotal(),
    };

    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    router.push(`/booking/${roomId}/confirm`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <Link href={`/rooms/${roomId}`} className={styles.backLink}>
        ← Back to Room Details
      </Link>

      <div className={styles.header}>
        <h1>Complete Your Booking</h1>
        <p>Fill in the details below to reserve your room</p>
      </div>

      <div className={styles.bookingLayout}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.section}>
              <h2>Guest Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="guestName">Full Name *</label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={bookingData.guestName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guestEmail">Email Address *</label>
                <input
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={bookingData.guestEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guestPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="guestPhone"
                  name="guestPhone"
                  value={bookingData.guestPhone}
                  onChange={handleInputChange}
                  placeholder="+84 xxx xxx xxx"
                  required
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2>Booking Details</h2>
              <div className={styles.dateDisplay}>
                <div className={styles.dateInfo}>
                  <span className={styles.dateLabel}>Check-in:</span>
                  <span className={styles.dateValue}>
                    {bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}
                  </span>
                </div>
                <div className={styles.dateInfo}>
                  <span className={styles.dateLabel}>Check-out:</span>
                  <span className={styles.dateValue}>
                    {bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}
                  </span>
                </div>
                {calculateNights() > 0 && (
                  <div className={styles.dateInfo}>
                    <span className={styles.dateLabel}>Duration:</span>
                    <span className={styles.dateValue}>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="numberOfRooms">Number of Rooms</label>
                <select
                  id="numberOfRooms"
                  name="numberOfRooms"
                  value={bookingData.numberOfRooms}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                  <option value="5">5 Rooms</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Proceed to Confirmation
            </button>
          </form>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.roomCard}>
            <div className={styles.roomImage}>
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="400px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.roomInfo}>
              <h3>{room.name}</h3>
              <p className={styles.roomPrice}>${room.price}/night</p>
              <p className={styles.roomDescription}>{room.description}</p>

              <div className={styles.features}>
                <h4>Features:</h4>
                <ul>
                  {room.features.slice(0, 4).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.priceSummary}>
            <h3>Price Summary</h3>
            <div className={styles.summaryRow}>
              <span>Room Rate</span>
              <span>${room.price}/night</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Number of Nights</span>
              <span>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Number of Rooms</span>
              <span>{bookingData.numberOfRooms}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.summaryRow}>
              <span className={styles.totalLabel}>Total Amount</span>
              <span className={styles.totalAmount}>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
