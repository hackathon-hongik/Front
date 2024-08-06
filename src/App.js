import { BeforeLoginMain } from "./Home/BeforeLoginMain";
import { AfterLoginMain } from "./Home/AfterLoginMain";
import { Login } from "./Login/Login";
import { Join } from "./Home/Join";
import { Redirect } from "./Login/Redirect";
import { MyLibrary } from "./components/MyLibrary";
import { ThisBook } from "./Notes/ThisBook";
import { Note } from "./Notes/Note";
import { BeforeBookSearchResult} from "./BookSearch/BeforeBookSearchResult";
import { AfterBookSearchResult } from "./BookSearch/AfterBookSearchResult";
import { Recommend } from "./RecommendPage/Recommend";
import { RecommendResult } from "./RecommendPage/RecommendResult";
import { Community } from "./Communities/Community";
import { LookNote } from "./Notes/LookNote";
import {Routes,Route} from "react-router-dom";
import { ChangeNickName } from "./components/ChangeNickname";
import ModifyNote from "./Notes/ModifyNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeforeLoginMain/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path='/booksearchresult' element={<BeforeBookSearchResult/>}/>
      <Route path="/afterlogin" element={<AfterLoginMain/>}/>
      <Route path="/afterlogin/changenickname" element={<ChangeNickName/>}/>
      <Route path='/auth/kakao' element={<Redirect/>}/>
      <Route path='/afterlogin/note' element={<Note/>}/>
      <Route path='/afterlogin/looknote' element={<LookNote/>}/>
      <Route path='/afterlogin/looknote/modifynote' element={<ModifyNote/>}/>
      <Route path='/afterlogin/mylibrary' element={<MyLibrary/>}/>
      <Route path='/afterlogin/thisbook' element={<ThisBook/>}/>
      <Route path='/afterlogin/booksearchresult' element={<AfterBookSearchResult/>}/>
      <Route path='/afterlogin/recommendation' element={<Recommend/>}/>
      <Route path='/afterlogin/recommendation/recommendresult' element={<RecommendResult/>}/>
      <Route path='/afterlogin/community' element={<Community/>}/>
    </Routes>
  );
}
export default App;



