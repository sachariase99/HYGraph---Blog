// Home.jsx
import { useEffect, useState } from "react";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getAllBlogs } from "../../queries/getAllBlogs";
import ReactMarkdown from "react-markdown";

const Home = () => {
  const { data, isLoading, error } = useGetQuery(getAllBlogs, "allBlogs");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (data) {
      const today = new Date();
      const todayBlogs = data.blogs.filter((blog) => {
        const blogDate = new Date(blog.date);
        return (
          blogDate.getDate() === today.getDate() &&
          blogDate.getMonth() === today.getMonth() &&
          blogDate.getFullYear() === today.getFullYear()
        );
      });
      setBlogs(todayBlogs);
    }
  }, [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 my-4 mx-4">
      {blogs.map((blog, index) => (
        <div
        key={blog.id}
        className="border-2 border-gray-500 hover:bg-[#e7e7e7] h-full m-auto p-4 rounded-xl"
      >
        <div className="flex justify-between items-start">
        <ReactMarkdown className="text-xl font-bold">
          {blog.headingText.markdown}
        </ReactMarkdown>
        <span className="text-sm">{blog.date}</span>
        </div>
        <div className="flex mt-4">
          <ReactMarkdown className="text-sm">{blog.description.markdown}</ReactMarkdown>
          <img className="w-[200px]" src={blog.image[0].url} alt={blog.image[0].fileName} />
        </div>
      </div>
      ))}
    </div>
  );
};

export default Home;
