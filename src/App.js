import { BeforeLoginMain } from "./Home/BeforeLoginMain";
import { AfterLoginMain } from "./Home/AfterLoginMain";
import { Login } from "./Login/Login";
import { Join } from "./Home/Join";
import { Redirect } from "./Login/Redirect";
import { MyLibrary } from "./components/MyLibrary";
import { ThisBook } from "./components/ThisBook";
import { Note } from "./components/Note";
import { BeforeBookSearchResult} from "./BookSearch/BeforeBookSearchResult";
import { AfterBookSearchResult } from "./BookSearch/AfterBookSearchResult";
import { Recommend } from "./RecommendPage/Recommend";
import { RecommendResult } from "./RecommendPage/RecommendResult";
import { Community } from "./Communities/Community";
import { LookNote } from "./components/LookNote";
import { CommunityScrap } from "./Communities/CommunityScrap";
import { CommunityWrite } from "./Communities/CommunityWrite";
import {Routes,Route} from "react-router-dom";
import { ChangeNickName } from "./components/ChangeNickname";
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
      <Route path='/afterlogin/mylibrary' element={<MyLibrary/>}/>
      <Route path='/afterlogin/thisbook' element={<ThisBook/>}/>
      <Route path='/afterlogin/booksearchresult' element={<AfterBookSearchResult/>}/>
      <Route path='/afterlogin/recommendation' element={<Recommend/>}/>
      <Route path='/afterlogin/recommendation/recommendresult' element={<RecommendResult/>}/>
      <Route path='/afterlogin/community' element={<Community/>}/>
      <Route path='/afterlogin/community/communityscrap' element={<CommunityScrap/>}/>
      <Route path='/afterlogin/community/communitywrite' element={<CommunityWrite/>}/>
    </Routes>
  );
}
export default App;
