'use client';

import { useState } from 'react';
import styles from './rooms.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { roomsService } from '@/services/rooms.service';

export default function Rooms() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    try {
      setIsCheckingAvailability(true);
      setHasSearched(false);

      const roomsAvailable =
        await roomsService.getAvailableRooms(
          checkIn,
          checkOut,
          1
        );

      setAvailableRooms(roomsAvailable.data || []);
      setHasSearched(true);
    } catch (error) {
      console.error(
        'Error checking availability:',
        error
      );
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleBookNow = (roomId) => {
    localStorage.setItem(
      'selectedDates',
      JSON.stringify({
        checkIn,
        checkOut,
      })
    );
  };

  const displayRooms = availableRooms;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Our Rooms</h1>

        <p>
          Choose your stay and check room
          availability instantly
        </p>
      </div>

      {/* SEARCH SECTION */}
      <div className={styles.searchWidget}>
        <h2>Check Availability</h2>

        <div className={styles.searchForm}>
          <div className={styles.dateInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="checkIn">
                Check-in Date
              </label>

              <input
                type="date"
                id="checkIn"
                value={checkIn}
                min={
                  new Date()
                    .toISOString()
                    .split('T')[0]
                }
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="checkOut">
                Check-out Date
              </label>

              <input
                type="date"
                id="checkOut"
                value={checkOut}
                min={
                  checkIn ||
                  new Date()
                    .toISOString()
                    .split('T')[0]
                }
                onChange={(e) =>
                  setCheckOut(e.target.value)
                }
              />
            </div>
          </div>

          <button
            className={styles.searchButton}
            onClick={checkAvailability}
            disabled={
              isCheckingAvailability ||
              !checkIn ||
              !checkOut
            }
          >
            {isCheckingAvailability
              ? 'Searching...'
              : 'Search Available Rooms'}
          </button>
        </div>
      </div>

      {/* RESULT INFO */}
      {hasSearched && (
        <div className={styles.resultInfo}>
          <h3>
            {displayRooms.length} room
            {displayRooms.length !== 1
              ? 's'
              : ''}{' '}
            found
          </h3>

          <p>
            {checkIn} → {checkOut}
          </p>
        </div>
      )}

      {/* ROOMS GRID */}
      <div className={styles.roomsGrid}>
        {!hasSearched ? (
          <div className={styles.emptyState}>
            <h3>
              Select dates to search rooms
            </h3>

            <p>
              Choose your check-in and
              check-out dates above.
            </p>
          </div>
        ) : displayRooms.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No rooms available</h3>

            <p>
              Please try another date
              range.
            </p>
          </div>
        ) : (
          displayRooms.map((room) => {
            const isAvailable =
              room.status === 'AVAILABLE';

            return (
              <div
                key={room.id}
                className={`${styles.roomCard} ${!isAvailable
                  ? styles.roomUnavailable
                  : ''
                  }`}
              >
                {/* STATUS */}
                <div
                  className={
                    isAvailable
                      ? styles.availableBadge
                      : styles.unavailableBadge
                  }
                >
                  {isAvailable
                    ? 'Available'
                    : room.status}
                </div>

                {/* IMAGE */}
                <div className={styles.roomImage}>
                  <Image
                    src={
                      room.imageUrls?.[0] ||
                      '/images/room-placeholder.jpg'
                    }
                    alt={`${room.roomType.name} Room`}
                    fill
                    className={styles.image}
                  />

                  <div
                    className={
                      styles.imageOverlay
                    }
                  >
                    <span
                      className={
                        styles.roomTypeBadge
                      }
                    >
                      {room.roomType.name}
                    </span>
                  </div>

                  {room.imageUrls
                    ?.length > 1 && (
                      <div
                        className={
                          styles.imageCount
                        }
                      >
                        📷{' '}
                        {
                          room.imageUrls
                            .length
                        }
                      </div>
                    )}
                </div>

                {/* CONTENT */}
                <div
                  className={
                    styles.roomContent
                  }
                >
                  <div
                    className={
                      styles.roomHeader
                    }
                  >
                    <div>
                      <h3>
                        {
                          room.roomType
                            .name
                        }{' '}
                        Room
                      </h3>

                      <p
                        className={
                          styles.roomNumber
                        }
                      >
                        Room #
                        {
                          room.roomNumber
                        }
                      </p>
                    </div>

                    <div
                      className={
                        styles.priceBox
                      }
                    >
                      <span
                        className={
                          styles.price
                        }
                      >
                        $
                        {
                          room
                            .roomType
                            .price
                        }
                      </span>

                      <small>
                        /night
                      </small>
                    </div>
                  </div>

                  {/* CAPACITY */}
                  <div
                    className={
                      styles.capacity
                    }
                  >
                    👥 Max{' '}
                    {
                      room.roomType
                        .maxCapacity
                    }{' '}
                    guests
                  </div>

                  {/* AMENITIES */}
                  <div
                    className={
                      styles.amenities
                    }
                  >
                    {room.amenities
                      ?.length > 0 ? (
                      room.amenities
                        .slice(0, 4)
                        .map(
                          (
                            item,
                            index
                          ) => (
                            <span
                              key={
                                index
                              }
                              className={
                                styles.amenityBadge
                              }
                            >
                              {item}
                            </span>
                          )
                        )
                    ) : (
                      <span
                        className={
                          styles.amenityBadge
                        }
                      >
                        Basic
                        Amenities
                      </span>
                    )}
                  </div>

                  {/* ACTION */}
                  {isAvailable ? (
                    <Link
                      href={`/rooms/${room.id}`}
                    >
                      <button
                        className={
                          styles.bookButton
                        }
                        onClick={() =>
                          handleBookNow(
                            room.id
                          )
                        }
                      >
                        View Details
                      </button>
                    </Link>
                  ) : (
                    <button
                      className={
                        styles.unavailableButton
                      }
                      disabled
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}