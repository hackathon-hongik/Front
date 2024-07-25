import { BeforeLoginMain } from "./components/BeforeLoginMain";
import { AfterLoginMain } from "./components/AfterLoginMain";
import { Login } from "./components/Login";
import { Join } from "./components/Join";
import { SimpleNote } from "./components/SimpleNote";

import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeforeLoginMain/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/afterlogin" element={<AfterLoginMain/>}/>
      <Route path="/simplenote" element={<SimpleNote/>}/>
    </Routes>
  );
}
export default App;
