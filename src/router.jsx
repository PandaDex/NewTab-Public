import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Home from './routes/home.jsx'
import { ThemeProvider } from "@/components/theme-provider"
import Callback from './routes/callback.jsx';

function AppRouter() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="NT-generalTheme">
            <div className='w-screen h-screen bg-neutral-100 dark:bg-neutral-925'>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/callback" element={<Callback />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    )
}

export default AppRouter