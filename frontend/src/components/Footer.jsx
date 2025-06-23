import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const [email, setEmail] = useState('')
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  const socialHover = {
    rest: { scale: 1 },
    hover: { scale: 1.2, rotate: 5 }
  }
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl">
            Stay Updated On New Vehicle Listings
          </strong>
          
          <p className="mt-4 text-center text-gray-600">
            Get exclusive deals and be the first to know when premium cars hit our marketplace
          </p>

          <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative max-w-lg mx-auto">
              <label className="sr-only" htmlFor="email">Email</label>

              <input
                className="w-full rounded-full border border-gray-300 bg-white p-4 pe-32 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <motion.button
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <motion.div 
            className="mx-auto max-w-sm lg:max-w-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <motion.div
              className="flex items-center justify-center lg:justify-start"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-2xl font-bold text-blue-600">AutoMarket</h2>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 ml-2 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </motion.div>
            
            <p className="mt-4 text-center text-gray-600 lg:text-left lg:text-lg">
              Your premier destination for quality vehicles at competitive prices. 
              We connect buyers with verified sellers to ensure a smooth and reliable 
              car purchasing experience.
            </p>

            <div className="mt-6 flex justify-center gap-5 lg:justify-start">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube', 'LinkedIn'].map((platform) => (
                <motion.a
                  key={platform}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  initial="rest"
                  whileHover="hover"
                  variants={socialHover}
                >
                  <span className="sr-only">{platform}</span>
                  
                  {platform === 'Facebook' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  
                  {platform === 'Instagram' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  
                  {platform === 'Twitter' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  )}
                  
                  {platform === 'YouTube' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  
                  {platform === 'LinkedIn' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
                      />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div>
              <motion.strong 
                className="font-bold text-gray-900 text-lg"
                whileHover={{ color: "#2563eb" }}
              >
                Vehicle Categories
              </motion.strong>

              <motion.ul className="mt-6 space-y-3">
                {["Sedans", "SUVs", "Trucks", "Luxury", "Electric", "Hybrids"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a 
                      className="text-gray-700 transition hover:text-blue-600" 
                      href="#"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <motion.strong 
                className="font-bold text-gray-900 text-lg"
                whileHover={{ color: "#2563eb" }}
              >
                About Us
              </motion.strong>

              <motion.ul className="mt-6 space-y-3">
                {["Our Story", "How It Works", "Testimonials", "Careers", "Partners", "Blog"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a 
                      className="text-gray-700 transition hover:text-blue-600" 
                      href="#"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <motion.strong 
                className="font-bold text-gray-900 text-lg"
                whileHover={{ color: "#2563eb" }}
              >
                Support
              </motion.strong>

              <motion.ul className="mt-6 space-y-3">
                {["Help Center", "Contact Us", "Live Chat", "FAQs", "Seller Resources", "Buying Guide"].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a 
                      className="text-gray-700 transition hover:text-blue-600" 
                      href="#"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-sm text-gray-500">
            © AutoMarket 2025. All rights reserved.
            <br />
            <span className="mt-2 block">
              Built with 
              <span className="mx-1 text-blue-600">♥</span> 
              by <a href="#" className="text-blue-600 hover:underline">CarDekho</a>
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer