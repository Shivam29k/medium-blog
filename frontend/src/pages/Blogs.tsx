import { BlogCard, BlogCardSkeleton } from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { getDateString } from "@/hooks";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { publishAtom } from "@/store/atoms/publish";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { coustomAlert } from "@/components/coustomAlert";

interface Blog {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: {
    name: string;
  };
}

function Blogs() {
  const [blogList, setBlogList] = useState([] as Blog[]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [_, setPublish] = useRecoilState(publishAtom);
  setPublish(true);  

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isScrolledToBottom) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    {page == 0 && setLoading(true); }
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogList((prevBlogList) => [...prevBlogList, ...response.data]);
      })
      .catch(() => {
        coustomAlert("error", "An error occurd while fetching the blogs.");
      })
      .finally(() => {
        {page == 0 && setLoading(false);}
      });
  }, [page]);



  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center flex-col mt-14">
        <div className="w-full md:w-2/3 xl:w-1/2  ">
          {!loading ? (
            <>
              {blogList.map((blog, index) => {
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
