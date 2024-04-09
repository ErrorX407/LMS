import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { lookInSession } from "./common/session";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Editor from "./pages/Editor";
import SearchPage from "./pages/SearchPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import TrendingPage from "./pages/TrendingPage";
import LatestPage from "./pages/LatestPage";
import PostPage from "./pages/PostPage";
import SmoothScrollContainer from "./components/SmoothScrollContainer";
import SettingsSideBar from "./components/SettingsSideBar";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import MainSidebar from "./components/MainSidebar";
import Solutions from "./pages/Solutions";
import Notes from "./pages/Notes";
import Pyqs from "./pages/Pyqs";
import QuestionBank from "./pages/QuestionBank";
import TestSeries from "./pages/TestSeries";
import News from "./pages/News";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {/* <SmoothScrollContainer> */}
      <Routes>
        <Route path="/" element={<MainSidebar />}>
          <Route index element={<Home />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="editor" element={<Editor />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="latest" element={<LatestPage />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="pyqs" element={<Pyqs />} />
          <Route path="question-bank" element={<QuestionBank />} />
          <Route path="notes" element={<Notes />} />
          <Route path="test-series" element={<TestSeries />} />
          <Route path="news" element={<News />} />
          <Route path=":id" element={<ProfilePage />} />
        </Route>

        <Route path="post/:post_id" element={<PostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/settings" element={<SettingsSideBar />}>
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/dashboard" element={<SettingsSideBar />}>
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* </SmoothScrollContainer> */}
    </UserContext.Provider>
  );
};

export default App;
