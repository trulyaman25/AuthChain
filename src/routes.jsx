import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './home';
import SignUp from './authentication/signupPage';
import SignIn from './authentication/signinPage';
import Dashboard from './portal/dashboard';

function RoutesConfig() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default RoutesConfig;