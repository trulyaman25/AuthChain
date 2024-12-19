import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignUp from './authentication/signupPage';
import SignIn from './authentication/signinPage';
import Dashboard from './portal/dashboard';

function RoutesConfig() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/signin" />} />
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default RoutesConfig;