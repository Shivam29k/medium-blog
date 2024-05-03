import { useState, useEffect } from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { coustomAlert } from "@/components/coustomAlert";

export const useBlogs = ({ page }: { page: Number }) => {
  interface Blog {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: {
      name: string;
    };
  }

  const [blogs, setBlogs] = useState<Blog[]>([] as Blog[]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?page=${page}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
      })
      .catch(() => {
        coustomAlert("error", "An error occurd while fetching the blogs.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { blogs, loading };
};

export const getBlog = ({ id }: { id: string }) => {
  interface Blog {
    id: string;
    title: string;
    content: string;
    date: Date;
    author: {
      name: string;
      description: string;
      id: string;
    };
  }

  const [blog, setBlog] = useState<Blog>({} as Blog);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data);
      })
      .catch(() => {
        coustomAlert("error", "An error occurd while fetching the blog.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { blog, loading };
};

export const getDateString = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
