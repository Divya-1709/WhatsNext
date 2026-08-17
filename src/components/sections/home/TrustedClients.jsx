import { motion } from "framer-motion";

const industries = [
    "Enterprise",
    "Healthcare",
    "Education",
    "Finance",
    "Retail",
    "Manufacturing",
];

const TrustedClients = () => {
    return (
        <section id="trusted-clients" className="py-14 relative z-20 bg-white border-b border-slate-200/80">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-xs sm:text-sm font-bold text-sky-700 uppercase tracking-widest mb-6"
                >
                    Trusted by forward-thinking companies
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                    {industries.map((name, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-xl font-extrabold text-slate-400 hover:text-slate-900 transition-colors duration-300 cursor-default"
                        >
                            {name}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedClients;
