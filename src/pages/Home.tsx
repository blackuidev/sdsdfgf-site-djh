import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Lightbulb, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header - To be replaced with global Header component */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">Your Brand</Link>
          <nav>
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mx-4">Products</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mx-4">About</Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mx-4">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="container mx-auto py-20 px-6 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 rounded-xl blur-lg -z-10"></div>
        <div className="glassmorphism p-8 rounded-xl">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Innovate, Create, Transform.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Unlock the power of cutting-edge technology to bring your vision to life. Join us and revolutionize the future.
          </p>
          <Button size="lg" className="text-lg">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center mb-12">
          Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="glassmorphism p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Lightbulb className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovative Solutions</h3>
            <p className="text-gray-600 dark:text-gray-300">Crafting tailor-made solutions to address your unique challenges and drive success.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="glassmorphism p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Rocket className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Rapid Deployment</h3>
            <p className="text-gray-600 dark:text-gray-300">Accelerate your time to market with our streamlined deployment processes and expert support.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="glassmorphism p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Guaranteed Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">Experience unwavering quality and reliability with our rigorous testing and continuous improvement approach.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="container mx-auto py-24 px-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="glassmorphism p-12 rounded-3xl">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to Elevate Your Business?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            Take the next step towards success. Contact us today to learn more about how we can help you achieve your goals.
          </p>
          <Button size="lg" className="text-lg">
            Contact Us <ArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.section>

      {/* Footer - To be replaced with global Footer component */}
      <footer className="bg-gray-200 dark:bg-gray-700 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">© 2024 Your Brand. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
