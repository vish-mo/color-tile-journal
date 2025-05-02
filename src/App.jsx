import './App.css'
import Calendar from "./journal/CalendarComponent/Calendar";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InsightsPage from "./journal/Insights/InsightsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/insights" element={<InsightsPage />} />
            </Routes>
        </Router>
    );
}
export default App