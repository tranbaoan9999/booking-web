'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './payment.module.css';
import React from 'react';

export default function PaymentPage({ params }) {
  const router = useRouter();
  const data = React.use(params);
  const roomId = parseInt(data.id);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedBooking = localStorage.getItem('bookingInfo');
    if (storedBooking) {
      
      setBookingInfo(JSON.parse(storedBooking));
    } else {
      router.push(`/booking/${roomId}`);
    }
  }, [roomId, router]);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Clear booking info after successful payment
      setTimeout(() => {
        localStorage.removeItem('bookingInfo');
        router.push('/rooms');
      }, 3000);
    }, 2000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!bookingInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.successModal}>
          <div className={styles.successIcon}>✓</div>
          <h1>Payment Successful!</h1>
          <p>Your booking has been confirmed</p>
          <p className={styles.successMessage}>
            A confirmation email has been sent to {bookingInfo.guestEmail}
          </p>
          <p className={styles.redirectMessage}>Redirecting to rooms page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href={`/booking/${roomId}/confirm`} className={styles.backLink}>
        ← Back to Review
      </Link>

      <div className={styles.header}>
        <h1>Choose Payment Method</h1>
        <p>Select your preferred payment method to complete your booking</p>
      </div>

      <div className={styles.paymentLayout}>
        <div className={styles.paymentSection}>
          <div className={styles.paymentMethods}>
            <div
              className={`${styles.paymentOption} ${selectedPayment === 'momo' ? styles.selected : ''}`}
              onClick={() => setSelectedPayment('momo')}
            >
              <div className={styles.radioButton}>
                {selectedPayment === 'momo' && <div className={styles.radioInner}></div>}
              </div>
              <div className={styles.paymentInfo}>
                <div className={styles.paymentHeader}>
                  <h3>MoMo E-Wallet</h3>
                  <div className={styles.momoLogo}>MoMo</div>
                </div>
                <p>Fast and secure payment via MoMo wallet</p>
                {selectedPayment === 'momo' && (
                  <div className={styles.paymentDetails}>
                    <p className={styles.instruction}>Scan the QR code or use the phone number below:</p>
                    <div className={styles.momoInfo}>
                      <div className={styles.qrPlaceholder}>
                        <div className={styles.qrCode}>QR CODE</div>
                        <p>Scan with MoMo app</p>
                      </div>
                      <div className={styles.momoAccount}>
                        <p><strong>Phone:</strong> 0123 456 789</p>
                        <p><strong>Name:</strong> Sakuramura Hotel</p>
                        <p><strong>Amount:</strong> ${bookingInfo.total}</p>
                        <p className={styles.note}>
                          Note: Please include your name "{bookingInfo.guestName}" in the transfer message
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`${styles.paymentOption} ${selectedPayment === 'bank' ? styles.selected : ''}`}
              onClick={() => setSelectedPayment('bank')}
            >
              <div className={styles.radioButton}>
                {selectedPayment === 'bank' && <div className={styles.radioInner}></div>}
              </div>
              <div className={styles.paymentInfo}>
                <div className={styles.paymentHeader}>
                  <h3>Bank Transfer</h3>
                  <div className={styles.bankLogo}>🏦</div>
                </div>
                <p>Direct bank transfer to our account</p>
                {selectedPayment === 'bank' && (
                  <div className={styles.paymentDetails}>
                    <p className={styles.instruction}>Transfer to the following account:</p>
                    <div className={styles.bankInfo}>
                      <div className={styles.bankDetail}>
                        <span className={styles.label}>Bank Name:</span>
                        <span className={styles.value}>Vietcombank (VCB)</span>
                      </div>
                      <div className={styles.bankDetail}>
                        <span className={styles.label}>Account Number:</span>
                        <span className={styles.value}>1234567890123</span>
                      </div>
                      <div className={styles.bankDetail}>
                        <span className={styles.label}>Account Name:</span>
                        <span className={styles.value}>SAKURAMURA HOTEL CO., LTD</span>
                      </div>
                      <div className={styles.bankDetail}>
                        <span className={styles.label}>Amount:</span>
                        <span className={styles.value}>${bookingInfo.total}</span>
                      </div>
                      <div className={styles.bankDetail}>
                        <span className={styles.label}>Transfer Content:</span>
                        <span className={styles.value}>
                          {bookingInfo.guestName} - Room {bookingInfo.room.name}
                        </span>
                      </div>
                      <p className={styles.note}>
                        Please use the exact transfer content above for quick verification
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.termsSection}>
            <label className={styles.checkbox}>
              <input type="checkbox" required />
              <span>I agree to the terms and conditions and cancellation policy</span>
            </label>
          </div>

          <button
            onClick={handlePayment}
            className={styles.confirmButton}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>

        <div className={styles.summarySection}>
          <div className={styles.bookingSummary}>
            <h3>Booking Summary</h3>

            <div className={styles.summaryRoom}>
              <div className={styles.roomImageSmall}>
                <Image
                  src={bookingInfo.room.image}
                  alt={bookingInfo.room.name}
                  fill
                  sizes="100px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h4>{bookingInfo.room.name}</h4>
                <p>${bookingInfo.room.price}/night</p>
              </div>
            </div>

            <div className={styles.summaryDetails}>
              <div className={styles.detailRow}>
                <span>Guest Name</span>
                <span>{bookingInfo.guestName}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Check-in</span>
                <span>{formatDate(bookingInfo.checkIn)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Check-out</span>
                <span>{formatDate(bookingInfo.checkOut)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Nights</span>
                <span>{bookingInfo.nights}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Rooms</span>
                <span>{bookingInfo.numberOfRooms}</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.totalAmount}>${bookingInfo.total}</span>
            </div>
          </div>

          <div className={styles.securityBadge}>
            <div className={styles.securityIcon}>🔒</div>
            <div>
              <h4>Secure Payment</h4>
              <p>Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
