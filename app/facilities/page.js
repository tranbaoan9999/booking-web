import styles from './facilities.module.css';

export default function Facilities() {
  const facilities = [
    {
      id: 1,
      icon: '📶',
      title: 'High-Speed WiFi',
      description: 'Reliable high-speed internet connection throughout the property for work and entertainment.'
    },
    {
      id: 2,
      icon: '🅿️',
      title: 'Free Parking',
      description: 'Complimentary parking space available for all residents with 24/7 access.'
    },
    {
      id: 3,
      icon: '🏋️',
      title: 'Fitness Center',
      description: 'Modern gym equipped with cardio and weight training equipment, open 24 hours.'
    },
    {
      id: 4,
      icon: '🧺',
      title: 'Laundry Service',
      description: 'On-site laundry facilities with washers and dryers available for resident use.'
    },
    {
      id: 5,
      icon: '🔒',
      title: '24/7 Security',
      description: 'Round-the-clock security with CCTV surveillance and secure access control.'
    },
    {
      id: 6,
      icon: '🍳',
      title: 'Shared Kitchen',
      description: 'Fully-equipped communal kitchen with modern appliances and dining area.'
    },
    {
      id: 7,
      icon: '📺',
      title: 'Common Lounge',
      description: 'Comfortable common area with TV, board games, and seating for socializing.'
    },
    {
      id: 8,
      icon: '🧹',
      title: 'Cleaning Service',
      description: 'Regular housekeeping service to keep common areas clean and well-maintained.'
    },
    {
      id: 9,
      icon: '❄️',
      title: 'Climate Control',
      description: 'Individual air conditioning and heating units in each room for optimal comfort.'
    },
    {
      id: 10,
      icon: '🚿',
      title: 'Modern Bathrooms',
      description: 'Clean, modern bathrooms with hot water available 24/7.'
    },
    {
      id: 11,
      icon: '📦',
      title: 'Package Service',
      description: 'Secure package receiving and storage service for all your deliveries.'
    },
    {
      id: 12,
      icon: '🌳',
      title: 'Garden Area',
      description: 'Peaceful outdoor garden space perfect for relaxation and fresh air.'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Our Facilities</h1>
        <p>Enjoy a wide range of amenities designed for your comfort and convenience</p>
      </div>

      <div className={styles.facilitiesGrid}>
        {facilities.map((facility) => (
          <div key={facility.id} className={styles.facilityCard}>
            <div className={styles.icon}>{facility.icon}</div>
            <h3>{facility.title}</h3>
            <p>{facility.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.additionalInfo}>
        <h2>Additional Services</h2>
        <div className={styles.infoContent}>
          <p>
            At SakuraMura, we are committed to providing you with the best possible living experience.
            All facilities are maintained to the highest standards and are available for resident use
            at no additional cost unless otherwise specified.
          </p>
          <p>
            If you have any questions about our facilities or would like to suggest additional amenities,
            please feel free to contact our management team.
          </p>
        </div>
      </div>
    </div>
  );
}
