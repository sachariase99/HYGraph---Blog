import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetQuery } from "../../hooks/useGetQuery";
import { getAllBlogs } from "../../queries/getAllBlogs";
import ReactMarkdown from 'react-markdown';


const Posts = () => {
    const { data, isLoading, error } = useGetQuery(getAllBlogs, "allBlogs");
    const [blogs, setBlogs] = useState([]);
    const location = useLocation();
  
    useEffect(() => {
        let newBlogs = data ? data.blogs : [];
        const params = new URLSearchParams(location.search);
        const sort = params.get('sort');
        if (sort === 'date') {
          newBlogs = [...newBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sort === 'title') {
          newBlogs = [...newBlogs].sort((a, b) => a.headingText.raw.children[0].children[0].text.localeCompare(b.headingText.raw.children[0].children[0].text));
        }
        setBlogs(newBlogs);
      }, [data, location.search]);

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

export default Posts;
