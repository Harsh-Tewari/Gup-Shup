import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/Authentication/login/Login";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
