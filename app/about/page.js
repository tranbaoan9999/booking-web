import styles from './about.module.css';

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Property Manager',
      description: 'Ensuring your stay is comfortable and hassle-free.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Facilities Coordinator',
      description: 'Maintaining all amenities to the highest standards.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Customer Relations',
      description: 'Here to answer all your questions and concerns.'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>About SakuraMura</h1>
        <p>Your trusted partner in comfortable living</p>
      </div>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Our Story</h2>
          <p>
            Founded in 2020, SakuraMura was born from a simple idea: everyone deserves a comfortable,
            affordable place to call home. We understand that finding quality accommodation can be challenging,
            especially for students, young professionals, and those new to the city.
          </p>
          <p>
            What started as a small property with just a few rooms has grown into a thriving community
            where residents from all walks of life come together. Our name, SakuraMura, meaning "Cherry
            Blossom Village" in Japanese, reflects our commitment to creating a peaceful, harmonious living
            environment that blooms with warmth and hospitality.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>🏡</div>
            <h3>Comfort First</h3>
            <p>We prioritize your comfort by maintaining high standards in all our rooms and facilities.</p>
          </div>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>🤝</div>
            <h3>Community</h3>
            <p>Building a supportive community where residents feel welcomed and connected.</p>
          </div>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>💰</div>
            <h3>Affordability</h3>
            <p>Offering competitive rates without compromising on quality or service.</p>
          </div>
          <div className={styles.missionCard}>
            <div className={styles.missionIcon}>🌟</div>
            <h3>Excellence</h3>
            <p>Striving for excellence in everything we do, from maintenance to customer service.</p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <p className={styles.teamIntro}>
          Our dedicated team is here to make your stay as pleasant as possible.
        </p>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.avatar}>
                {member.name.charAt(0)}
              </div>
              <h3>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.description}>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valuesContent}>
          <h2>Why Choose Us?</h2>
          <ul className={styles.valuesList}>
            <li>Over 5 years of experience in property management</li>
            <li>Responsive maintenance and support team</li>
            <li>Transparent pricing with no hidden fees</li>
            <li>Flexible lease terms to suit your needs</li>
            <li>Prime locations with excellent connectivity</li>
            <li>Safe and secure environment with 24/7 security</li>
            <li>Regular community events and activities</li>
            <li>Environmentally conscious operations</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
