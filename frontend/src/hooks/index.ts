import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  publishedDate: string;
  author: {
    name: string;
  };
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
