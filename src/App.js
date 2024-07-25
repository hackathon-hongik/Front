import { BeforeLoginMain } from "./components/BeforeLoginMain";
import { AfterLoginMain } from "./components/AfterLoginMain";
import { Login } from "./components/Login";
import { Join } from "./components/Join";
import { Redirect } from "./components/Redirect";
import { MyLibrary } from "./components/MyLibrary";
import { ThisBook } from "./components/ThisBook";


import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeforeLoginMain/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/afterlogin" element={<AfterLoginMain/>}/>
      <Route path='/auth/kakao' element={<Redirect/>}/>
      <Route path='/afterlogin/mylibrary' element={<MyLibrary/>}/>
      <Route path='/afterlogin/thisbook' element={<ThisBook/>}/>
    </Routes>
  );
}
export default App;
