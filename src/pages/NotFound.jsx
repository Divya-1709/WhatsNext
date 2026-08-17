import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Layout>
            <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-bold text-navy-950 font-heading mb-4">404</h1>
                <p className="text-xl text-navy-700 mb-8">Page not found</p>
                <Link to="/" className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Return Home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;
