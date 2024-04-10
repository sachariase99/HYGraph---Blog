import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Blogs, Home } from "./pages";
import { useGetQuery } from "./hooks/useGetQuery";
import { getAllBlogs } from "./queries/getAllBlogs";
import { useContext } from "react";
import BlogContext from "./context/BlogContext";

import { Navbar, Footer } from "./components";

function App() {
  const { data, isLoading, error } = useGetQuery(getAllBlogs, "allBlogs");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (data) {
      setBlogs(data.blogs);
    }
  }, [data]);

  const sortBlogs = (sortBy) => {
    let sortedBlogs;
    if (sortBy === 'date') {
      sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
      sortedBlogs = [...blogs].sort((a, b) => a.headingText.localeCompare(b.headingText));
    }
    setBlogs(sortedBlogs);
  };

  return (
    <>
      <BlogContext.Provider value={{ blogs, sortBlogs }}>
        <Router>
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blogs />} />
          </Routes>
          <div className="mt-[90px]">
            <Footer />
          </div>
        </Router>
      </BlogContext.Provider>
    </>
  );
}

export default App;
