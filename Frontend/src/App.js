import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import TrailPage from "./pages/TrailPage";
import TrailListPage from "./pages/TrailListPage";
import EventListPage from "./pages/EventListPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import FooterComponent from "./components/FooterComponent";

// import TrailPage from "./pages/TrailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/trails/" component={TrailListPage} exact />
            <Route path="/events/" component={EventListPage} exact />
            <Route path="/login/" component={LoginPage} exact />
            <Route path="/trail/" component={TrailPage} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
