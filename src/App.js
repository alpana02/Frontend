import "./App.css";
import AddRemoveSentencePage from "./AddRemoveSentencePage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Summary from "./Summary";


function App() {
  

  return (
    <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/sentences" element={<AddRemoveSentencePage />} />
              <Route exact path="/summary" element={<Summary />} />
            </Routes>
          </div>
        </Router>

  );
}

export default App;
