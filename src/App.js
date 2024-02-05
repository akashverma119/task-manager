import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "./components/organism/Create";
import List from "./components/organism/List";
import Detail from "./components/organism/Detail";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/molecules/Navbar";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
