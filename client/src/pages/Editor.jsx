import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import BlogEditor from "../components/BlogEditor";
import PublishForm from "../components/PublishForm";

const postStructure = {
  title: "",
  banner: "",
  content: "",
  category: "",
  tags: [],
  publisher: { pesonal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  const [post, setPost] = useState(postStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  return (
    <EditorContext.Provider value={{ post, setPost, editorState, setEditorState, textEditor, setTextEditor }}>
      {access_token === null ? (
        <Navigate to="/login" />
      ) : editorState == "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
