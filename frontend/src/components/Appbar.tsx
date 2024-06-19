import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const name = localStorage.getItem("name") || "user";
  return (
    <div className="flex justify-between border-b px-4 py-1">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div className="flex justify-center items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-3 py-2 text-center me-2  "
          >
            New Blog
          </button>
        </Link>
        <Avatar size="big" name={name} />
      </div>
    </div>
  );
};
