import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";

import Loader from "../components/Elements/Loader/Loader"
import Error from "../components/Elements/Error/Error";

import ScrollToTop from "../utils/ScrollToTop";
import Header from "../components/Elements/Header/Header";
import Footer from "../components/Elements/Footer/Footer";

type AppProviderProps = {
    children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense fallback={<Loader />}>
            <ErrorBoundary
                FallbackComponent={Error}
            >
                <Router>
                    <ScrollToTop />
                    <div className="content">
                        <div className="container">
                            <Header />
                            {children}
                        </div>
                    </div>
                    <Footer />
                </Router>
            </ErrorBoundary>
        </React.Suspense>
    )
}

export { AppProvider }