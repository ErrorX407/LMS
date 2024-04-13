import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";
import Loader from "../components/Loader";
import axios from "axios";
import PageNotFound from "./PageNotFound";

const postStructure = {
  title: "",
  banner: "",
  content: [],
  category: "",
  tags: [],
  publisher: { pesonal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {

  let { post_id } = useParams();

  const [post, setPost] = useState(postStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(true)
  let {
    userAuth: { access_token, isAdmin },
  } = useContext(UserContext);
  useEffect(()=>{
    if (!post_id) {
      return setLoading(false);
    }

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/get",{
      post_id, draft: true, mode: 'edit'
    }).then(({data: {post}}) => {
      setPost(post)
      setLoading(false)
    })
    .catch(err => {
      setPost(null)
      setLoading(false)
    })
  }, []);
  return (
    <EditorContext.Provider value={{ post, setPost, editorState, setEditorState, textEditor, setTextEditor }}>
      { !isAdmin ? <PageNotFound /> : access_token === null ? (
        <Navigate to="/login" />
      ) : loading ? <Loader /> :
      editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
