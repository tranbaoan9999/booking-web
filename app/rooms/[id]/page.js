'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './roomDetails.module.css';
import React from 'react';
import { roomsService } from '@/services/rooms.service';

export default function RoomDetails({ params }) {
  const data = React.use(params);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomId = parseInt(data.id);

  const getRoomDetail = async (id) => {
    try {
      const response = await roomsService.getRoomByID(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching room details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);

      const roomData = await getRoomDetail(roomId);

      setRoom(roomData);
      setLoading(false);
    };

    fetchRoom();
  }, [roomId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

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

  return (
    <div className={styles.container}>
      <Link href="/rooms" className={styles.backLink}>
        ← Back to All Rooms
      </Link>

      <div className={styles.roomHeader}>
        <div className={styles.headerContent}>
          <h1>Room {room.roomNumber}</h1>

          <p className={styles.price}>
            ${room.roomType.price} / night
          </p>
        </div>

        <div
          className={`${styles.status} ${room.status === 'AVAILABLE'
              ? styles.available
              : styles.unavailable
            }`}
        >
          {room.status}
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.descriptionCard}>
          <h2>Room Information</h2>

          <div className={styles.infoGroup}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Room Number</span>
              <span>{room.roomNumber}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Room Type</span>
              <span>{room.roomType.name}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Max Capacity</span>
              <span>{room.roomType.maxCapacity} Guests</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Status</span>
              <span>{room.status}</span>
            </div>
          </div>
        </div>

        <div className={styles.featuresCard}>
          <h2>Amenities</h2>

          {room.amenities.length > 0 ? (
            <ul className={styles.featuresList}>
              {room.amenities.map((amenity) => (
                <li key={amenity.id}>{amenity.name}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.noAmenities}>
              No amenities available
            </p>
          )}

          <Link href={`/booking/${room.id}`}>
            <button
              className={styles.bookButton}
              disabled={room.status !== 'AVAILABLE'}
            >
              {room.status === 'AVAILABLE'
                ? 'Book This Room'
                : 'Room Unavailable'}
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <div className={styles.infoCard}>
          <h3>Check-in</h3>
          <p>2:00 PM - 10:00 PM</p>
        </div>

        <div className={styles.infoCard}>
          <h3>Check-out</h3>
          <p>Before 11:00 AM</p>
        </div>

        <div className={styles.infoCard}>
          <h3>Status</h3>
          <p>{room.status}</p>
        </div>
      </div>
    </div>
  );
}