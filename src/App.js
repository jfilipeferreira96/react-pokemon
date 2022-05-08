import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";

//styles
import "./App.css";
import "bulma/css/bulma.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
