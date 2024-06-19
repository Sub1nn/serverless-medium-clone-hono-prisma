import { Link } from "react-router-dom";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorname,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 py-4 px-2 min-w-80 cursor-pointer">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar name={authorname} size="small" />
          </div>
          <div>
            <span className="font-semibold text-m">{authorname}</span>
          </div>
          <div className="flex justify-center items-center m-1">
            <Circle />
          </div>
          <div className="font-extralight text-xs flex justify-center flex-col ">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="font-extralight text-md">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-extralight pt-2">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size,
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={` flex justify-center items-center overflow-hidden rounded-full bg-gray-600 mr-1 ${
        size === "small" ? "h-5 w-5" : "h-10 w-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-xl "
        }  text-slate-200`}
      >
        {name[0]}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="h-1 w-1 font-bold rounded-full bg-slate-500"></div>;
}
