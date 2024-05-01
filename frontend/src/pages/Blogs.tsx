import { BlogCard, BlogCardSkeleton } from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { getDateString, useBlogs } from "@/hooks";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { publishAtom } from "@/store/atoms/publish";

function Blogs() {
  const { blogs, loading } = useBlogs();
  const [_, setPublish] = useRecoilState(publishAtom);
  setPublish(true);

  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center flex-col mt-14">
        <div className="w-full md:w-2/3 xl:w-1/2  ">
          {!loading ? (
            <>
              {blogs.map((blog, index) => {
                return (
                  <Link to={`/blog/${blog.id}`} key={index}>
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      authorName={blog.author.name}
                      publishedDate={getDateString(blog.date)}
                      content={blog.content}
                    />
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
