'use client';

import { useState } from 'react';
import styles from './rooms.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Rooms() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Single Room',
      price: '18$/day',
      features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Desk & Chair'],
      description: 'Perfect for solo travelers or students. Comfortable and well-equipped.',
      image: '/img/interior-garden.jpg',
    },
    {
      id: 2,
      name: 'Standard Double Room',
      price: '18$/day',
      features: ['Free WiFi', 'Air Conditioning', 'Shared Bathroom', '2 Single Beds'],
      description: 'Ideal for friends or colleagues. Spacious and affordable.',
      image: '/img/garden-courtyard.jpg',
    },
    {
      id: 3,
      name: 'Master Room',
      price: '20$/day',
      features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Kitchen', 'Living Area'],
      description: 'Our most luxurious option with all the amenities you need.',
      image: '/img/dining-feast.jpg',
    },
  ];

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    if (calculateNights() <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    setIsCheckingAvailability(true);
    setHasSearched(false);

    // TODO: Replace with actual API call
    // Simulating API call to check room availability
    setTimeout(() => {
      // Placeholder: Randomly mark some rooms as available
      const available = rooms.map(room => ({
        ...room,
        isAvailable: Math.random() > 0.3 // 70% chance available
      }));
      setAvailableRooms(available);
      setIsCheckingAvailability(false);
      setHasSearched(true);

      // Store dates in localStorage for booking page
      localStorage.setItem('selectedDates', JSON.stringify({ checkIn, checkOut }));
    }, 1000);
  };

  const handleBookNow = (roomId) => {
    localStorage.setItem('selectedDates', JSON.stringify({ checkIn, checkOut }));
  };

  const displayRooms = hasSearched ? availableRooms : rooms;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Our Rooms</h1>
        <p>Find the perfect room that suits your needs and budget</p>
      </div>

      <div className={styles.searchWidget}>
        <h2>Check Availability</h2>
        <div className={styles.searchForm}>
          <div className={styles.dateInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="checkIn">Check-in</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="checkOut">Check-out</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            {calculateNights() > 0 && (
              <div className={styles.nightsInfo}>
                <span>{calculateNights()} night{calculateNights() !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <button
            onClick={checkAvailability}
            className={styles.searchButton}
            disabled={isCheckingAvailability}
          >
            {isCheckingAvailability ? 'Searching...' : 'Search Available Rooms'}
          </button>
        </div>
      </div>

      <div className={styles.roomsGrid}>
        {displayRooms.map((room) => (
          <div key={room.id} className={styles.roomCard}>
            {hasSearched && !room.isAvailable && (
              <div className={styles.unavailableBadge}>Not Available</div>
            )}
            {hasSearched && room.isAvailable && (
              <div className={styles.availableBadge}>Available</div>
            )}
            <div className={styles.roomImage}>
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                priority={room.id === 1}
              />
            </div>
            <div className={styles.roomContent}>
              <h3>{room.name}</h3>
              <p className={styles.price}>{room.price}</p>
              <p className={styles.description}>{room.description}</p>
              <ul className={styles.features}>
                {room.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              {(!hasSearched || room.isAvailable) ? (
                <Link href={`/rooms/${room.id}`} onClick={() => handleBookNow(room.id)}>
                  <button className={styles.bookButton}>Book Now</button>
                </Link>
              ) : (
                <button className={styles.bookButton} disabled>Unavailable</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
