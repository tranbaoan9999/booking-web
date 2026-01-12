"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const allGalleryImages = [
    { src: "/img/garden-courtyard.jpg", alt: "Beautiful garden courtyard with pond" },
    { src: "/img/interior-garden.jpg", alt: "Interior garden view" },
    { src: "/img/evening-pond.jpg", alt: "Evening view of the pond" },
    { src: "/img/lobby-guests.jpg", alt: "Comfortable lobby area" },
    { src: "/img/dining-group.jpg", alt: "Group dining experience" },
    { src: "/img/garden-breakfast.jpg", alt: "Breakfast in the garden" },
    { src: "/img/outdoor-gathering.jpg", alt: "Outdoor gathering space" },
    { src: "/img/indoor-dining.jpg", alt: "Indoor dining area" },
    { src: "/img/evening-terrace.jpg", alt: "Evening terrace view" },
    { src: "/img/couple-bench.jpg", alt: "Relaxing on the bench" },
    { src: "/img/outdoor-feast.jpg", alt: "Outdoor feast gathering" },
    { src: "/img/colorful-feast.jpg", alt: "Colorful feast spread" },
    { src: "/img/garden-view.jpg", alt: "Serene garden view" },
    { src: "/img/breakfast-pond.jpg", alt: "Breakfast by the pond" },
    { src: "/img/dining-feast.jpg", alt: "Dining feast table" },
    { src: "/img/garden-reading.jpg", alt: "Reading in the garden" },
    { src: "/img/guests-selfie.jpg", alt: "Happy guests" },
  ];

  const [visibleImages, setVisibleImages] = useState(6);

  const loadMore = () => {
    setVisibleImages((prev) => Math.min(prev + 6, allGalleryImages.length));
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to SakuraMura</h1>
          <p className={styles.heroSubtitle}>
            Experience comfort and luxury in our carefully curated rooms. Your perfect home away from home awaits.
          </p>
          <div className={styles.heroCta}>
            <Link href="/rooms" className={styles.ctaPrimary}>
              View Our Rooms
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.sectionTitle}>Why Choose SakuraMura?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏠</div>
              <h3>Comfortable Living</h3>
              <p>Modern, fully-furnished rooms designed for your comfort and convenience.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📍</div>
              <h3>Prime Location</h3>
              <p>Situated in the heart of the city with easy access to public transportation.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>Premium Amenities</h3>
              <p>Enjoy high-speed WiFi, air conditioning, and all the essentials you need.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💼</div>
              <h3>Flexible Terms</h3>
              <p>Short-term and long-term rental options available to suit your needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryHeader}>
            <h2 className={styles.sectionTitle}>Experience SakuraMura</h2>
            <p className={styles.gallerySubtitle}>
              Discover the beauty and comfort of our space through these moments
            </p>
          </div>

          <div className={styles.masonryGrid}>
            {allGalleryImages.slice(0, visibleImages).map((image, index) => (
              <div
                key={index}
                className={`${styles.masonryItem} ${index % 7 === 0 || index % 7 === 4 ? styles.tall : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageAlt}>{image.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleImages < allGalleryImages.length && (
            <div className={styles.loadMoreContainer}>
              <button onClick={loadMore} className={styles.loadMoreButton}>
                View More
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Find Your Perfect Room?</h2>
          <p>Browse our available rooms and book your stay today!</p>
          <Link href="/rooms" className={styles.ctaButton}>
            Explore Rooms
          </Link>
        </div>
      </section>
    </div>
  );
}
