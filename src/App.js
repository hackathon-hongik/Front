import { BeforeLoginMain } from "./Home/BeforeLoginMain";
import { AfterLoginMain } from "./Home/AfterLoginMain";
import { Login } from "./Login/Login";
import { Join } from "./Home/Join";
import { Redirect } from "./Login/Redirect";
import { MyLibrary } from "./components/MyLibrary";
import { ThisBook } from "./components/ThisBook";
import { Note } from "./components/Note";
import { BookSearchResult } from "./components/BookSearchResult";

import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeforeLoginMain/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/afterlogin" element={<AfterLoginMain/>}/>
      <Route path='/auth/kakao' element={<Redirect/>}/>
      <Route path='/afterlogin/note' element={<Note/>}/>
      <Route path='/afterlogin/mylibrary' element={<MyLibrary/>}/>
      <Route path='/afterlogin/thisbook' element={<ThisBook/>}/>
      <Route path='/afterlogin/booksearchresult' element={<BookSearchResult/>}/>
    </Routes>
  );
}
export default App;
