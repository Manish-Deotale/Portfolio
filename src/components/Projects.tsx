import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as const;
const overlaySpring = { type: 'spring', stiffness: 380, damping: 34, mass: 0.75 } as const;

const projects = [
  {
    title: 'AgriStack Platform',
    year: '2023 - 2025',
    summary:
      'Backend services for large agricultural registry datasets, built to improve accessibility, stability, and performance at national scale.',
    accent: 'Registry Data',
    stack: ['Node.js', 'Express.js', 'REST APIs', 'Apache NiFi'],
    highlights: [
      'Integrated Crop Registry, Animal Husbandry, and Fisheries APIs into unified backend workflows.',
      'Implemented pagination- and offset-based retrieval for large-scale government datasets.',
      'Built validation and error-handling flows for reliable, high-volume registry processing.',
    ],
  },
  {
    title: 'NADP Digital Learning Platform',
    year: '2022 - 2023',
    summary:
      'RESTful APIs and PostgreSQL data structures for classes, users, and learning content across a high-volume digital learning ecosystem.',
    accent: 'Learning APIs',
    stack: ['Node.js', 'PostgreSQL', 'REST APIs', 'Schema Design'],
    highlights: [
      'Designed RESTful APIs for classes, users, and learning content at platform scale.',
      'Structured PostgreSQL schemas to support modular content and user management.',
      'Delivered API-driven architecture for dependable integrations across the ecosystem.',
    ],
  },
  {
    title: 'Polymed CRM',
    year: '2022',
    summary:
      'CRM platform for sales operations and customer relationship management, shaped around an API-centric integration model.',
    accent: 'Enterprise CRM',
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'API Integrations'],
    highlights: [
      'Built CRM modules for sales operations and customer relationship workflows.',
      'Shaped backend services around an API-centric integration model for enterprise teams.',
      'Optimized database queries and schema design for responsive CRM operations.',
    ],
  },
] as const;

type Project = (typeof projects)[number];

const projectDetailStagger = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const projectDetailItem = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: easeOut },
  },
};

const projectPillItem = {
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
  closed: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.18, ease: easeOut },
  },
};

const projectStackStagger = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.28 },
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

function subscribeHoverCapability(onStoreChange: () => void) {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getHoverCapability() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function ProjectFocusCard({ project }: { project: Project }) {
  return (
    <div className="project-overlay-inner">
      <motion.span
        className="project-card-glow"
        aria-hidden
        initial={{ opacity: 0, scaleX: 0.35 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.45, ease: easeOut }}
      />

      <div className="project-card-body project-overlay-header">
        <div className="project-topline project-overlay-topline">
          <span>{project.accent}</span>
          <p>{project.year}</p>
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
      </div>

      <div className="project-details project-overlay-details is-open">
        <div className="project-details-inner">
          <motion.ul
            className="detail-list project-detail-list project-overlay-list"
            variants={projectDetailStagger}
            initial="closed"
            animate="open"
          >
            {project.highlights.map((point) => (
              <motion.li key={point} variants={projectDetailItem}>
                {point}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="badge-wrap project-stack project-overlay-stack"
            variants={projectStackStagger}
            initial="closed"
            animate="open"
          >
            {project.stack.map((item) => (
              <motion.span key={item} className="skill-pill" variants={projectPillItem}>
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const canHover = useSyncExternalStore(subscribeHoverCapability, getHoverCapability, () => true);
  const stageRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sectionFade = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const gridCardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.62, ease: easeOut },
    },
    dimmed: {
      opacity: shouldReduceMotion ? 0.55 : 0.28,
      scale: 0.96,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
      transition: { duration: 0.35, ease: easeOut },
    },
  };

  const overlayVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.94, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 10 },
      };

  const clearExpanded = useCallback(() => setExpandedIndex(null), []);

  const handleCardClick = (index: number) => {
    if (canHover) return;
    setExpandedIndex((current) => (current === index ? null : index));
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedIndex((current) => (current === index ? null : index));
    }
    if (event.key === 'Escape') {
      clearExpanded();
    }
  };

  useEffect(() => {
    if (expandedIndex === null) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!stageRef.current?.contains(event.target as Node)) {
        clearExpanded();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [expandedIndex, clearExpanded]);

  const isFocused = expandedIndex !== null;
  const activeProject = expandedIndex !== null ? projects[expandedIndex] : null;

  return (
    <motion.section
      id="projects"
      className={`content-section${isFocused ? ' projects-focused' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px', amount: 0.15 }}
      variants={sectionFade}
      transition={{ duration: 0.7 }}
    >
      <div className="container-custom">
        <motion.div className="section-heading project-section-heading" variants={sectionStagger}>
          <motion.span className="section-kicker" variants={sectionFade}>
            Projects
          </motion.span>
          <motion.h2 variants={sectionFade}>
            Platforms and products built for scale, reliability, and real-world impact.
          </motion.h2>
        </motion.div>

        <div
          ref={stageRef}
          className={`project-stage${isFocused ? ' is-focused' : ''}`}
          onMouseLeave={
            canHover
              ? (event) => {
                  const next = event.relatedTarget as Node | null;
                  if (!stageRef.current?.contains(next)) {
                    const hasKeyboardFocus = stageRef.current?.contains(document.activeElement);
                    if (!hasKeyboardFocus) {
                      clearExpanded();
                    }
                  }
                }
              : undefined
          }
          onBlur={(event) => {
            const next = event.relatedTarget as Node | null;
            if (!stageRef.current?.contains(next)) {
              clearExpanded();
            }
          }}
        >
          <motion.div
            className="project-grid-backdrop"
            aria-hidden
            initial={false}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          />

          <div className={`project-grid-wrap${isFocused ? ' is-focused' : ''}`}>
            <motion.div
              className="project-grid"
              variants={sectionStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px', amount: 0.2 }}
            >
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="project-card project-card-preview glass-card"
                  variants={gridCardVariants}
                  animate={expandedIndex === null ? 'visible' : 'dimmed'}
                  onMouseEnter={canHover ? () => setExpandedIndex(index) : undefined}
                  onFocus={() => setExpandedIndex(index)}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(event) => handleCardKeyDown(event, index)}
                  aria-expanded={expandedIndex === index}
                  tabIndex={0}
                >
                  <div className="project-card-body">
                    <div className="project-topline">
                      <span>{project.accent}</span>
                      <p>{project.year}</p>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                  </div>
                  {!canHover && (
                    <span className="project-card-hint" aria-hidden>
                      Tap to expand
                    </span>
                  )}
                </motion.article>
              ))}
            </motion.div>

            <div className="project-focus-slot" aria-live="polite">
              <AnimatePresence mode="wait">
                {activeProject && expandedIndex !== null && (
                  <motion.article
                    key={expandedIndex}
                    className="project-card project-card-overlay glass-card is-expanded"
                    {...overlayVariants}
                    transition={shouldReduceMotion ? { duration: 0.25 } : overlaySpring}
                    onMouseEnter={canHover ? () => setExpandedIndex(expandedIndex) : undefined}
                  >
                    <ProjectFocusCard project={activeProject} />
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;
