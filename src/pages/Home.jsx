import Layout from "../components/layout/Layout";
import Hero from "../components/sections/home/Hero";
import TrustedClients from "../components/sections/home/TrustedClients";
import About from "../components/sections/home/About";
import Services from "../components/sections/home/Services";
import Process from "../components/sections/home/Process";
import Technologies from "../components/sections/home/Technologies";
import WhyChooseUs from "../components/sections/home/WhyChooseUs";
import FeaturedProjects from "../components/sections/home/FeaturedProjects";
import Stats from "../components/sections/home/Stats";
import Testimonials from "../components/sections/home/Testimonials";
import CTA from "../components/sections/home/CTA";

const Home = () => {
    return (
        <Layout footerBgColor="bg-navy-950">
            {/* ══════════════════════════════════════════════════
                DEEP NAVY PAGE BACKGROUND — replaces forest video
                Hero section is fully self-contained with its own
                background; all subsequent sections layer on top.
            ══════════════════════════════════════════════════ */}
            <div
                style={{
                    background: "linear-gradient(180deg, #020617 0%, #060d26 20%, #020617 100%)",
                    minHeight: "100vh",
                }}
            >
                {/* ─── 1. Hero ─────────────────────────────────── */}
                <Hero />

                {/* ─── 2. Trusted Clients / Industries ─────────── */}
                <TrustedClients />

                {/* ─── 3. Who We Are (MacBook scroll animation) ─── */}
                <About />

                {/* ─── 4. Core Services (scroll-stacked cards) ─── */}
                <Services />

                {/* ─── 5. Development Process ──────────────────── */}
                <Process />

                {/* ─── 6. Technologies We Work With ────────────── */}
                <Technologies />

                {/* ─── 7. Why Choose Us ────────────────────────── */}
                <WhyChooseUs />

                {/* ─── 8. Featured Projects & Solutions ────────── */}
                <FeaturedProjects />

                {/* ─── 9. Client Success Metrics ───────────────── */}
                <Stats />

                {/* ─── 10. Testimonials ─────────────────────────── */}
                <Testimonials />

                {/* ─── 11. Call to Action ───────────────────────── */}
                <CTA />
            </div>
        </Layout>
    );
};

export default Home;