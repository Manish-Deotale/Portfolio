import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  category: string;
  items: string[];
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    {
      category: 'Languages',
      items: ['JavaScript', 'SQL'],
    },
    {
      category: 'Backend Development',
      items: ['Node.js', 'Express.js', 'REST APIs', 'API-driven Architecture'],
    },
    {
      category: 'Frontend Development',
      items: ['React.js', 'HTML', 'CSS', 'Bootstrap'],
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'Database Optimization', 'Schema Design', 'Query Optimization'],
    },
    {
      category: 'Data Integration',
      items: ['REST APIs', 'Apache NiFi', 'Data Pipeline', 'Large-scale Data Retrieval'],
    },
    {
      category: 'Tools & Practices',
      items: ['Git', 'Postman', 'Scalable Systems', 'Code Quality', 'System Reliability'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="skills" className="py-20">
      <div className="container-custom">
        <h2 className="section-title">Technical Skills</h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-colors backdrop-blur-sm"
              variants={categoryVariants}
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-badge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { number: '8+', label: 'Years Experience' },
            { number: '50+', label: 'Projects Delivered' },
            { number: '30+', label: 'Technologies' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={categoryVariants}
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
