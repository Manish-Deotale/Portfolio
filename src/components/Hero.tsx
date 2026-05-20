import React from 'react';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-12 flex items-center justify-center bg-gradient-to-b from-blue-950/20 to-transparent"
    >
      <div className="container-custom w-full">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="text-yellow-500 font-semibold text-sm tracking-widest uppercase">Welcome to my portfolio</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight font-serif"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}
          >
            <span className="text-white">MANISH</span>
            <br />
            <span className="gradient-text">DEOTALE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Senior Software Developer | Building scalable backend systems & data-driven solutions
          </motion.p>

          {/* Professional Summary */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            4+ years of expertise in Node.js, Express.js, React.js, and PostgreSQL. Specializing in REST API development, large-scale data integration, and enterprise architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a href="#projects" className="btn-primary flex items-center justify-center gap-2 group">
              View My Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:manishdeotalemr@gmail.com" className="btn-secondary flex items-center justify-center gap-2">
              Get In Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mb-16"
          >
            <a
              href="https://github.com/manishdeotale"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-sm bg-gradient-to-br from-gray-800 to-gray-900 hover:from-yellow-700 hover:to-yellow-800 flex items-center justify-center text-yellow-500 hover:text-white transition-all group border border-yellow-600/30 hover:border-yellow-500"
            >
              <FiGithub className="group-hover:scale-110 transition-transform" size={24} />
            </a>
            <a
              href="https://linkedin.com/in/manishdeotale"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-sm bg-gradient-to-br from-gray-800 to-gray-900 hover:from-yellow-700 hover:to-yellow-800 flex items-center justify-center text-yellow-500 hover:text-white transition-all group border border-yellow-600/30 hover:border-yellow-500"
            >
              <FiLinkedin className="group-hover:scale-110 transition-transform" size={24} />
            </a>
            <a
              href="mailto:manishdeotalemr@gmail.com"
              className="w-12 h-12 rounded-sm bg-gradient-to-br from-gray-800 to-gray-900 hover:from-yellow-700 hover:to-yellow-800 flex items-center justify-center text-yellow-500 hover:text-white transition-all group border border-yellow-600/30 hover:border-yellow-500"
            >
              <FiMail className="group-hover:scale-110 transition-transform" size={24} />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-400 text-sm"
          >
            <p>Scroll to explore more</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
