import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const experiences: Experience[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description:
        'Led development of core platform features serving 100K+ users. Architected microservices infrastructure and mentored team of 5 engineers.',
      achievements: [
        'Reduced API response time by 60% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 75%',
        'Mentored 3 junior developers, 2 promoted to mid-level',
      ],
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Digital Solutions Ltd.',
      period: '2020 - 2022',
      location: 'New York, NY',
      description:
        'Developed and maintained multiple full-stack applications. Collaborated with product and design teams to deliver user-centric solutions.',
      achievements: [
        'Built real-time analytics dashboard processing 1M+ events/day',
        'Improved database query performance by 80%',
        'Led migration from monolith to microservices',
      ],
    },
    {
      id: 3,
      title: 'Software Developer',
      company: 'StartUp Ventures',
      period: '2019 - 2020',
      location: 'Austin, TX',
      description:
        'Contributed to MVP development and product iteration. Worked on both frontend and backend technologies in a fast-paced environment.',
      achievements: [
        'Built payment integration with Stripe',
        'Implemented authentication system with JWT',
        'Optimized bundle size by 45%',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="experience" className="py-20 bg-slate-800/30">
      <div className="container-custom">
        <h2 className="section-title">Professional Experience</h2>

        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative"
              variants={itemVariants}
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-4 top-16 h-24 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-8 h-8 bg-blue-600 rounded-full border-4 border-slate-900" />

              {/* Content */}
              <div className="ml-20 bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold">{exp.company}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin size={16} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">{exp.description}</p>

                {/* Achievements */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-400">Key Achievements:</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <span className="text-blue-400 mt-1">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
