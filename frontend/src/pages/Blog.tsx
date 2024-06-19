import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog.tsx";
import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar.tsx";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog(id || "");

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!blog) {
    return <h1>Blog not found</h1>;
  }
  return (
    <div>
      <Appbar />
      <FullBlog
        id={blog.id}
        authorname={blog.author.name || "Subin"}
        title={blog.title}
        content={blog.content}
        publishedDate={"2021-09-01"}
      />
    </div>
  );
};

export default Blog;
