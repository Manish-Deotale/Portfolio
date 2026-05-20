import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowRight,
  FiBriefcase,
  FiDatabase,
  FiDownload,
  FiGithub,
  FiMenu,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiX,
  FiPhone,
  FiServer,
} from 'react-icons/fi';
import resumePdf from './assets/Manish Deotale.pdf';
import Projects from './components/Projects';

const navigation = ['Profile', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

const metrics = [
  { value: '4+', label: 'Years building production systems' },
  { value: '3', label: 'Core platforms highlighted on the resume' },
  { value: '2', label: 'Enterprise roles across product and public tech' },
  { value: '24/7', label: 'Reliability mindset for data-heavy services' },
];

const strengths = [
  {
    title: 'Backend Engineering',
    description:
      'Designing scalable Node.js and Express.js services with clean API contracts, validation layers, and dependable delivery flows.',
    icon: FiServer,
  },
  {
    title: 'Data Platforms',
    description:
      'Integrating large-scale government datasets through REST APIs, pagination strategies, and resilient high-volume processing pipelines.',
    icon: FiDatabase,
  },
  {
    title: 'System Design',
    description:
      'Shaping modular backend architecture that improves maintainability, performance, and long-term extensibility for enterprise software.',
    icon: FiLayers,
  },
];

const experience = [
  {
    role: 'Senior Software Developer',
    company: 'Protean eGov Technologies',
    period: 'Apr 2025 - Present',
    location: 'Delhi, India - Hybrid',
    highlights: [
      "Developed backend services for AgriStack, India's digital agriculture data platform.",
      'Integrated Crop Registry, Animal Husbandry, and Fisheries APIs into a unified backend workflow.',
      'Implemented pagination- and offset-based retrieval strategies for large-scale government datasets.',
      'Built validation and error-handling flows for reliable, high-volume processing.',
      'Improved maintainability and performance for agricultural registry services.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Prevoyance IT Solutions Pvt. Ltd.',
    period: 'Sep 2022 - Apr 2025',
    location: 'Nagpur, India',
    highlights: [
      'Developed scalable REST APIs and backend modules for enterprise applications.',
      'Optimized database queries and schema design to improve performance.',
      'Built API-driven architecture that supported modular, scalable integrations.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'SQL'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'Query Optimization', 'Schema Design'],
  },
  {
    title: 'Data Integration',
    items: ['Apache NiFi', 'Pagination', 'Offset Retrieval', 'Validation Flows'],
  },
  {
    title: 'Tools & Architecture',
    items: ['Git', 'Postman', 'API-driven Architecture', 'Scalable Backend Systems'],
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const getScrollMax = useCallback(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    return Math.max(0, scrollHeight - clientHeight);
  }, []);

  const setScrollFromClientX = useCallback(
    (clientX: number, behavior: ScrollBehavior) => {
      const track = scrollTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const max = getScrollMax();
      const top = ratio * max;
      if (behavior === 'instant') {
        document.documentElement.scrollTop = top;
      } else {
        window.scrollTo({ top, behavior });
      }
    },
    [getScrollMax],
  );

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectionFade = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 36,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: easeOut },
    },
  };

  const sectionStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardReveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const timelineReveal = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -36,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: easeOut },
    },
  };

  const pillStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const pillReveal = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: easeOut },
    },
  };

  const cardHover = shouldReduceMotion
    ? {}
    : {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.22, ease: 'easeOut' },
      };

  const iconHover = shouldReduceMotion
    ? {}
    : { scale: 1.1, rotate: 6, transition: { duration: 0.25 } };

  const buttonTap = shouldReduceMotion ? {} : { scale: 0.97 };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const scrollStep = useCallback(() => document.documentElement.clientHeight * 0.12, []);

  const handleScrollTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const behavior: ScrollBehavior = shouldReduceMotion ? 'auto' : 'smooth';
    setScrollFromClientX(event.clientX, behavior);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleScrollTrackPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setScrollFromClientX(event.clientX, 'instant');
  };

  const handleScrollTrackPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleScrollTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const el = document.documentElement;
    const max = getScrollMax();
    const step = scrollStep();
    if (event.key === 'Home') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    } else if (event.key === 'End') {
      event.preventDefault();
      window.scrollTo({ top: max, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      const delta = event.key === 'PageUp' ? el.clientHeight * 0.85 : step;
      window.scrollTo({
        top: Math.max(0, el.scrollTop - delta),
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      const delta = event.key === 'PageDown' ? el.clientHeight * 0.85 : step;
      window.scrollTo({
        top: Math.min(max, el.scrollTop + delta),
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div className="app-shell">
      <div
        ref={scrollTrackRef}
        className="scroll-progress-track"
        role="slider"
        tabIndex={0}
        aria-label="Scroll page"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuetext={`${Math.round(scrollProgress * 100)} percent scrolled`}
        onPointerDown={handleScrollTrackPointerDown}
        onPointerMove={handleScrollTrackPointerMove}
        onPointerUp={handleScrollTrackPointerUp}
        onPointerCancel={handleScrollTrackPointerUp}
        onKeyDown={handleScrollTrackKeyDown}
      >
        <div className="scroll-progress-inner">
          <motion.div
            className="scroll-progress-fill"
            style={{ scaleX: scrollProgress }}
            aria-hidden
          />
        </div>
      </div>

      <motion.div
        className="ambient ambient-one"
        animate={
          shouldReduceMotion
            ? {}
            : { x: [0, 28, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient ambient-two"
        animate={
          shouldReduceMotion
            ? {}
            : { x: [0, -24, 0], y: [0, 16, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.header
        className="site-nav"
        initial={shouldReduceMotion ? false : { y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <motion.div className="container-custom nav-inner">
          <motion.a
            href="#home"
            className="brand-mark"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={buttonTap}
          >
            MD
          </motion.a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav id="site-navigation" className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                onClick={handleNavClick}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="nav-cta nav-cta-menu" onClick={handleNavClick}>
              Let&apos;s Connect
            </a>
          </nav>

          <a href="#contact" className="nav-cta nav-cta-bar" onClick={handleNavClick}>
            Let&apos;s Connect
          </a>
        </motion.div>
      </motion.header>

      <main>
        <section id="home" className="hero-section">
          <div className="container-custom hero-grid">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionStagger}
              className="hero-copy"
            >
              <motion.span variants={sectionFade} className="eyebrow">
                Software Developer - Backend Systems - Data Integration
              </motion.span>
              <motion.h1
                className="hero-title"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 40,
                    clipPath: shouldReduceMotion ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    clipPath: 'inset(0 0 0% 0)',
                    transition: { duration: 0.85, ease: easeOut },
                  },
                }}
              >
                Manish Deotale
              </motion.h1>
              <motion.p variants={sectionFade} className="hero-subtitle">
                Building reliable backend platforms, RESTful APIs, and data-heavy applications
                with a calm engineering approach and enterprise scale in mind.
              </motion.p>
              <motion.p variants={sectionFade} className="hero-summary">
                Software Developer with 4+ years of experience across scalable backend systems,
                government data integrations, PostgreSQL performance work, and API-driven
                architecture for modern products.
              </motion.p>

              <motion.div variants={sectionFade} className="hero-actions">
                <motion.a
                  href="#projects"
                  className="btn-primary"
                  whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: '0 22px 48px rgba(201, 146, 84, 0.32)' }}
                  whileTap={buttonTap}
                >
                  Explore Work
                  <FiArrowRight />
                </motion.a>
                <motion.a
                  href={resumePdf}
                  download="Manish-Deotale-Resume.pdf"
                  className="btn-secondary"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  whileTap={buttonTap}
                >
                  <FiDownload />
                  Download Resume
                </motion.a>
                <motion.a
                  href="mailto:manishdeotalemr@gmail.com"
                  className="btn-secondary"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  whileTap={buttonTap}
                >
                  <FiMail />
                  manishdeotalemr@gmail.com
                </motion.a>
              </motion.div>

              <motion.div variants={sectionFade} className="contact-strip">
                <span>
                  <FiMapPin />
                  India
                </span>
                <span>
                  <FiPhone />
                  8857993670
                </span>
                <a href="https://linkedin.com/in/manishdeotale" target="_blank" rel="noreferrer">
                  <FiLinkedin />
                  LinkedIn
                </a>
                <a href="https://github.com/manishdeotale" target="_blank" rel="noreferrer">
                  <FiGithub />
                  GitHub
                </a>
              </motion.div>
            </motion.div>

            <motion.aside
              className="hero-panel"
              initial={{ opacity: 0, x: 48, scale: 0.96 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 1, x: 0, scale: 1, y: [0, -8, 0] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.8, ease: easeOut }
                  : {
                      opacity: { duration: 0.9, ease: easeOut },
                      x: { duration: 0.9, ease: easeOut },
                      scale: { duration: 0.9, ease: easeOut },
                      y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
            >
              <div className="panel-frame">
                <p className="panel-label">Professional Summary</p>
                <p className="panel-copy">
                  Proven ability to develop high-performance services handling large data volumes
                  while maintaining code quality, system reliability, and long-term maintainability.
                </p>
              </div>
              <motion.div className="panel-grid" variants={sectionStagger} initial="hidden" animate="visible">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="metric-card interactive-card"
                    variants={cardReveal}
                    whileHover={cardHover}
                  >
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.aside>
          </div>
        </section>

        <motion.section
          id="profile"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom">
            <motion.div className="section-heading" variants={sectionStagger}>
              <motion.span className="section-kicker" variants={sectionFade}>
                Profile
              </motion.span>
              <motion.h2 variants={sectionFade}>
                Focused on clean backend delivery and durable platform foundations.
              </motion.h2>
            </motion.div>

            <motion.div className="three-column-grid" variants={sectionStagger}>
              {strengths.map(({ title, description, icon: Icon }) => (
                <motion.article
                  key={title}
                  className="glass-card strength-card interactive-card"
                  variants={cardReveal}
                  whileHover={cardHover}
                >
                  <motion.span className="icon-chip" whileHover={iconHover}>
                    <Icon />
                  </motion.span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom">
            <motion.div className="section-heading" variants={sectionStagger}>
              <motion.span className="section-kicker" variants={sectionFade}>
                Experience
              </motion.span>
              <motion.h2 variants={sectionFade}>
                Progression through enterprise software and public-sector scale.
              </motion.h2>
            </motion.div>

            <motion.div className="timeline" variants={sectionStagger}>
              {experience.map((item) => (
                <motion.article
                  key={`${item.company}-${item.period}`}
                  className="timeline-item glass-card interactive-card"
                  variants={timelineReveal}
                  whileHover={cardHover}
                >
                  <div className="timeline-meta">
                    <span className="timeline-dot" />
                    <p>{item.period}</p>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div>
                        <h3>{item.role}</h3>
                        <p className="company-line">
                          <FiBriefcase />
                          {item.company}
                        </p>
                      </div>
                      <span className="location-pill">{item.location}</span>
                    </div>
                    <ul className="detail-list">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <Projects />

        <motion.section
          id="skills"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom">
            <motion.div className="section-heading" variants={sectionStagger}>
              <motion.span className="section-kicker" variants={sectionFade}>
                Skills
              </motion.span>
              <motion.h2 variants={sectionFade}>
                Technical strengths organized around delivery, performance, and scale.
              </motion.h2>
            </motion.div>

            <motion.div className="skills-grid" variants={sectionStagger}>
              {skillGroups.map((group) => (
                <motion.article
                  key={group.title}
                  className="glass-card skill-card interactive-card"
                  variants={cardReveal}
                  whileHover={cardHover}
                >
                  <h3>{group.title}</h3>
                  <motion.div className="badge-wrap" variants={pillStagger}>
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        className="skill-pill"
                        variants={pillReveal}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -2 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="content-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={sectionFade}
          transition={{ duration: 0.7 }}
        >
          <div className="container-custom">
            <motion.div
              className="feature-banner glass-card interactive-card"
              variants={sectionStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={cardHover}
            >
              <motion.div variants={cardReveal}>
                <span className="section-kicker">Education</span>
                <h2>Bachelor&apos;s Degree in BCCA</h2>
                <p>Dr. Ambedkar Institute of Management Studies, Nagpur</p>
              </motion.div>
              <motion.div className="banner-note" variants={cardReveal}>
                <span>Foundation</span>
                <p>
                  Commerce and Computer Application background supporting practical software
                  delivery and structured problem solving.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer
        id="contact"
        className="site-footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={sectionStagger}
      >
        <div className="container-custom footer-grid">
          <motion.div variants={sectionFade}>
            <span className="section-kicker">Contact</span>
            <h2>Available for strong backend, API, and platform-focused opportunities.</h2>
          </motion.div>
          <motion.div className="footer-actions" variants={sectionFade}>
            <motion.a
              href="mailto:manishdeotalemr@gmail.com"
              className="btn-primary"
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              whileTap={buttonTap}
            >
              <FiMail />
              Email Manish
            </motion.a>
            <div className="footer-links">
              <motion.a
                href="https://linkedin.com/in/manishdeotale"
                target="_blank"
                rel="noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
              >
                <FiLinkedin />
                linkedin.com/in/manishdeotale
              </motion.a>
              <motion.a
                href="https://github.com/manishdeotale"
                target="_blank"
                rel="noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
              >
                <FiGithub />
                github.com/manishdeotale
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
