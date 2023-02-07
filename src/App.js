import { Route } from "react-router-dom";
import Home from "./components/home/Home";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact />
    </div>
  );
}

export default App;
