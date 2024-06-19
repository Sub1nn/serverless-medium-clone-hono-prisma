import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submitBlog = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      navigate(`/blog/${response.data.blog.id}`);
    } catch (error) {
      console.log(error);
      alert("Error: error while sending request");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <textarea
          rows={2}
          className=" p-2.5  w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
          placeholder="Add your title here..."
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <textarea
          className=" p-2.5 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none min-h-60"
          placeholder="Write your thoughts here..."
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-3 py-2 text-center"
          onClick={() => {
            submitBlog();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Publish;
