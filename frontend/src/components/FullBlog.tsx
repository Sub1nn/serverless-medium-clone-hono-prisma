import { useEffect, useState } from "react";
import { Avatar } from "./BlogCard";
import axios from "axios";

interface FullBlogProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

const FullBlog = ({
  title,
  authorname,
  content,
  publishedDate,
}: FullBlogProps) => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("http://localhost:8787/api/v1/quote");
        console.log(response);
        setQuote(response.data.quote);
      } catch (error) {
        console.error("Error fetching the quote", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="grid grid-cols-12 px-10 pt-6 w-screen">
      <div className=" col-span-8">
        <div className="text-3xl font-bold">{title}</div>
        <div className=" text-slate-400 text-sm my-2">
          Posted on {publishedDate}
        </div>
        <div className="text-slate-600 text-lg">{content}</div>
      </div>
      <div className=" col-span-4">
        <div className="text-lg text-slate-600">Author</div>
        <div className="ml-5">
          <div className="flex items-center gap-2 m-2">
            <div>
              <Avatar name={authorname} size="small" />
            </div>
            <div className="font-bold text-lg ">{authorname}</div>
          </div>
          <div className="text-slate-500 ml-2">
            {quote ? quote : "Loading quote..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
