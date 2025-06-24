import React from 'react'
import { motion } from 'framer-motion'

const InfoSection = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center lg:gap-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={fadeInUp}>
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Find Your Perfect Drive With Our Premium Selection
                            </h2>

                            <div className="mt-4 h-1 w-16 rounded bg-blue-600"></div>

                            <p className="mt-6 text-lg text-gray-700">
                                Discover an extensive collection of quality vehicles tailored to your needs and preferences.
                                From luxury sedans to robust SUVs, our marketplace offers the best deals with verified sellers.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                                <motion.div
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <h3 className="text-xl font-bold text-blue-600">500+</h3>
                                    <p className="mt-1 text-sm text-gray-700">Verified Vehicles</p>
                                </motion.div>

                                <motion.div
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <h3 className="text-xl font-bold text-blue-600">100%</h3>
                                    <p className="mt-1 text-sm text-gray-700">Buyer Protection</p>
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-8"
                                whileHover={{ scale: 1.02 }}
                            >
                                <a
                                    href="#browse"
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
                                >
                                    Browse Collection
                                    <svg
                                        className="ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-lg shadow-xl">
                            <motion.img
                                src="https://a.storyblok.com/f/143588/5500x3667/55c40e1d15/p90465405_highres_bmw-m4-competition-c.jpg/m/fit-in/960x639/filters:quality(80)"
                                alt="Luxury car showcase"
                                className="w-full object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}

                            />

                        </div>

                        <motion.div
                            className="absolute -bottom-6 -left-6 z-10 hidden md:block"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default InfoSection