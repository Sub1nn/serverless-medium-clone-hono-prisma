import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex justify-center flex-col">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorname={blog.author.name}
              title={blog.title}
              content={
                blog.content.length > 100
                  ? blog.content.slice(0, 100) + "..."
                  : blog.content
              }
              publishedDate={"2021-09-01"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
