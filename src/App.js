import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Navbar/Header";
import Chats from "./components/Navbar/Chats";
import Characters from "./components/Navbar/Characters";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <Routes>
        <Route path="/Chats" element={<Chats />}></Route>
        <Route path="/Characters" element={<Characters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
