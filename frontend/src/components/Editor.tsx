import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


// hljs for syntax highlighting in a code block
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import css from "highlight.js/lib/languages/css";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import php from "highlight.js/lib/languages/php";
import sql from "highlight.js/lib/languages/sql";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-dark.css";
import { CreateBlogInput } from "@shivamkrandom/medium";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("css", css);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("html", html);
hljs.registerLanguage("c", c);
hljs.registerLanguage("python", python);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("go", go);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);


const highlightSyntax = (text: any) => hljs.highlightAuto(text).value;


const modules = {
  syntax: { highlight: highlightSyntax },
  toolbar: [
    [{ font: [] }],
    [{ header: ["1", "2", "3", "4", "5", "6", "false"] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ 'color': [] }, { 'background': [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "clean",
];
 
function Editor({setBlogInput, blogInput} : {setBlogInput:  React.Dispatch<React.SetStateAction<CreateBlogInput>>, blogInput: CreateBlogInput}) {

  return (
    <div className="w-full h-full ">
      <ReactQuill
        theme="snow"
        value={blogInput.content}
        onChange={(e) => setBlogInput({...blogInput, content: e})}
        className=""
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

export default Editor;
