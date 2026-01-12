'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './confirm.module.css';
import React from 'react';

export default function ConfirmPage({ params }) {
  const router = useRouter();
  const data = React.use(params);
  const roomId = parseInt(data.id);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedBooking = localStorage.getItem('bookingInfo');
    if (storedBooking) {
      setBookingInfo(JSON.parse(storedBooking));
    } else {
      router.push(`/booking/${roomId}`);
    }
    setIsLoading(false);
  }, [roomId, router]);

  const handleProceedToPayment = () => {
    router.push(`/booking/${roomId}/payment`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!bookingInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>No Booking Information</h1>
          <Link href="/rooms" className={styles.backButton}>
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href={`/booking/${roomId}`} className={styles.backLink}>
        ← Edit Booking Details
      </Link>

      <div className={styles.header}>
        <div className={styles.checkIcon}>✓</div>
        <h1>Review Your Booking</h1>
        <p>Please review the details below before proceeding to payment</p>
      </div>

      <div className={styles.confirmLayout}>
        <div className={styles.mainSection}>
          <div className={styles.card}>
            <h2>Room Information</h2>
            <div className={styles.roomPreview}>
              <div className={styles.roomImageContainer}>
                <Image
                  src={bookingInfo.room.image}
                  alt={bookingInfo.room.name}
                  fill
                  sizes="300px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.roomDetails}>
                <h3>{bookingInfo.room.name}</h3>
                <p className={styles.price}>${bookingInfo.room.price}/night</p>
                <div className={styles.featuresList}>
                  {bookingInfo.room.features.map((feature, index) => (
                    <span key={index} className={styles.featureBadge}>{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Guest Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Full Name</span>
                <span className={styles.value}>{bookingInfo.guestName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>{bookingInfo.guestEmail}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{bookingInfo.guestPhone}</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Booking Details</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Check-in</span>
                <span className={styles.value}>{formatDate(bookingInfo.checkIn)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Check-out</span>
                <span className={styles.value}>{formatDate(bookingInfo.checkOut)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Number of Nights</span>
                <span className={styles.value}>{bookingInfo.nights} night{bookingInfo.nights !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Number of Rooms</span>
                <span className={styles.value}>{bookingInfo.numberOfRooms}</span>
              </div>
            </div>
          </div>

          <div className={styles.termsSection}>
            <h3>Cancellation Policy</h3>
            <p>Free cancellation up to 24 hours before check-in. After that, the first night will be charged.</p>
          </div>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.summaryCard}>
            <h3>Booking Summary</h3>

            <div className={styles.summaryItem}>
              <span>Room Rate</span>
              <span>${bookingInfo.room.price}/night</span>
            </div>

            <div className={styles.summaryItem}>
              <span>{bookingInfo.nights} night{bookingInfo.nights !== 1 ? 's' : ''}</span>
              <span>${bookingInfo.room.price * bookingInfo.nights}</span>
            </div>

            <div className={styles.summaryItem}>
              <span>{bookingInfo.numberOfRooms} room{bookingInfo.numberOfRooms !== 1 ? 's' : ''}</span>
              <span>×{bookingInfo.numberOfRooms}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.totalAmount}>${bookingInfo.total}</span>
            </div>

            <button onClick={handleProceedToPayment} className={styles.paymentButton}>
              Proceed to Payment
            </button>
          </div>

          <div className={styles.infoBox}>
            <h4>What's Next?</h4>
            <ul>
              <li>Choose your payment method</li>
              <li>Complete the payment</li>
              <li>Receive booking confirmation via email</li>
              <li>Check in at 2:00 PM on your arrival date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
