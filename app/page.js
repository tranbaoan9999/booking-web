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
          {/* Section Header */}
          <div className={styles.galleryHeader}>
            <h2 className={styles.galleryTitle}>Experience SakuraMura</h2>
            <p className={styles.galleryDescription}>
              Immerse yourself in the tranquil beauty of our space. Each moment captured here tells a story of comfort, elegance, and the serene lifestyle that awaits you.
            </p>
          </div>

          {/* Image Grid */}
          <div className={styles.imageGrid}>
            {allGalleryImages.slice(0, visibleImages).map((image, index) => (
              <article
                key={index}
                className={styles.imageCard}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className={styles.image}
                  />
                </div>
                <div className={styles.imageCaption}>
                  <p>{image.alt}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {visibleImages < allGalleryImages.length && (
            <div className={styles.loadMoreWrapper}>
              <button onClick={loadMore} className={styles.loadMoreBtn}>
                <span>Load More Images</span>
                <svg className={styles.btnIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className={styles.loadMoreText}>
                Showing {visibleImages} of {allGalleryImages.length} images
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsHeader}>
            <h2 className={styles.testimonialsTitle}>What Our Guests Say</h2>
            <p className={styles.testimonialsSubtitle}>
              Real experiences from people who stayed with us
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <article className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className={styles.testimonialText}>
                "An absolutely wonderful stay! The rooms are beautifully decorated, spotlessly clean, and the garden area is so peaceful. Felt like a home away from home."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>SK</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Sarah Kim</div>
                  <div className={styles.authorLocation}>Seoul, Korea</div>
                </div>
              </div>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className={styles.testimonialText}>
                "The location is perfect, the amenities are top-notch, and the staff is incredibly friendly. The breakfast by the pond was a highlight of my trip!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>MT</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Michael Thompson</div>
                  <div className={styles.authorLocation}>London, UK</div>
                </div>
              </div>
            </article>

            <article className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className={styles.testimonialText}>
                "I stayed here for a month and it exceeded all expectations. Fast WiFi, comfortable workspace, and the serene environment made it perfect for remote work."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>YT</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>Yuki Tanaka</div>
                  <div className={styles.authorLocation}>Tokyo, Japan</div>
                </div>
              </div>
            </article>
          </div>
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
