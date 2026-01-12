'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './roomDetails.module.css';
import React from "react";


const roomsData = [
  {
    id: 1,
    name: 'Deluxe Single Room',
    price: '18$/day',
    features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Desk & Chair'],
    description: 'Perfect for solo travelers or students. Comfortable and well-equipped.',
    longDescription: 'Our Deluxe Single Room offers the perfect blend of comfort and functionality for solo travelers. Featuring a cozy single bed with premium linens, a dedicated workspace, and modern amenities, this room provides everything you need for a productive and relaxing stay. The private bathroom includes fresh towels and complimentary toiletries.',
    image: '/img/interior-garden.jpg',
    gallery: [
      '/img/interior-garden.jpg',
      '/img/lobby-guests.jpg',
      '/img/garden-reading.jpg',
      '/img/evening-terrace.jpg',
      '/img/garden-breakfast.jpg',
      '/img/garden-view.jpg'
    ]
  },
  {
    id: 2,
    name: 'Standard Double Room',
    price: '18$/day',
    features: ['Free WiFi', 'Air Conditioning', 'Shared Bathroom', '2 Single Beds'],
    description: 'Ideal for friends or colleagues. Spacious and affordable.',
    longDescription: 'The Standard Double Room is designed for two guests who value both privacy and affordability. With two comfortable single beds, ample storage space, and a shared bathroom that is well-maintained and regularly cleaned, this room offers excellent value. The room includes all essential amenities and provides a welcoming atmosphere for your stay.',
    image: '/img/garden-courtyard.jpg',
    gallery: [
      '/img/garden-courtyard.jpg',
      '/img/indoor-dining.jpg',
      '/img/evening-pond.jpg',
      '/img/couple-bench.jpg',
      '/img/breakfast-pond.jpg',
      '/img/outdoor-gathering.jpg'
    ]
  },
  {
    id: 3,
    name: 'Master Room',
    price: '20$/day',
    features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Kitchen', 'Living Area'],
    description: 'Our most luxurious option with all the amenities you need.',
    longDescription: 'Experience the ultimate in comfort with our Master Room. This spacious accommodation features a separate living area perfect for relaxation or entertaining, a fully-equipped kitchenette for your convenience, and a luxurious private bathroom. The room is thoughtfully designed with premium furnishings and decor, making it ideal for extended stays or those seeking extra space and privacy.',
    image: '/img/dining-feast.jpg',
    gallery: [
      '/img/dining-feast.jpg',
      '/img/colorful-feast.jpg',
      '/img/outdoor-feast.jpg',
      '/img/dining-group.jpg',
      '/img/garden-breakfast.jpg',
      '/img/evening-terrace.jpg',
      '/img/garden-view.jpg'
    ]
  },
];

export default function RoomDetails({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const data = React.use(params);

  const roomId = parseInt(data.id);
  const room = roomsData.find(r => r.id === roomId);

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
          <h1>{room.name}</h1>
          <p className={styles.price}>{room.price}</p>
        </div>
      </div>

      <div className={styles.gallerySection}>
        <div className={styles.mainImage}>
          <Image
            src={room.gallery[selectedImage]}
            alt={`${room.name} - Image ${selectedImage + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.thumbnailGrid}>
          {room.gallery.map((img, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="150px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.descriptionCard}>
          <h2>About This Room</h2>
          <p>{room.longDescription}</p>
        </div>

        <div className={styles.featuresCard}>
          <h2>Room Features</h2>
          <ul className={styles.featuresList}>
            {room.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Link href={`/booking/${room.id}`}>
            <button className={styles.bookButton}>Book This Room</button>
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
          <h3>Cancellation</h3>
          <p>Free cancellation up to 24 hours before check-in</p>
        </div>
      </div>
    </div>
  );
}
