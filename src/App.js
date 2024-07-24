import { BeforeLoginMain } from "./components/BeforeLoginMain";
import { AfterLoginMain } from "./components/AfterLoginMain";
import { Login } from "./components/Login";
import { Join } from "./components/Join";

import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeforeLoginMain/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/afterlogin" element={<AfterLoginMain/>}/>
    </Routes>
  );
}
export default App;
