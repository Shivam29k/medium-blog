import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
