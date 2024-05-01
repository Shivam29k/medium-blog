import AuthorComponent from "@/components/AuthorComponent";
import BlogComponent from "@/components/BlogComponent";
import Navbar from "@/components/Navbar";
import { getBlog } from "@/hooks";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { publishAtom } from "@/store/atoms/publish";

function Blog() {
  const { id } = useParams();
  if (!id) {
    return <div>ERROR</div>;
  }

  const [_, setPublish] = useRecoilState(publishAtom);
  setPublish(true);

  const { blog, loading } = getBlog({ id });
  console.log(blog);

  return (
    <div className="">
      <Navbar />
      <div className="mt-24 w-full sm:w-5/6 container ">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="grid lg:grid-cols-3 ">
            <BlogComponent title={blog.title} content={blog.content} date={blog.date} className="lg:col-span-2"/>
            <AuthorComponent className="mt-5 lg:mt-0 " author={blog.author ? blog.author : {name: "", description:"", id:""} } /> 
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
