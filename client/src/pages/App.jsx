import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SimpleGraph from "./SimpleGraph";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Visualize" element={<SimpleGraph />} />
      </Routes>
    </>
  );
};

export default App;
