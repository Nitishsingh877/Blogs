
import { useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";
import { Route , Routes, useLocation, useSearchParams } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";

function App() {

  const {fetchBlogPosts} = useContext(AppContext);
   
  const [searchparams , setSearchparams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {

    const page = searchparams.get('page') ?? 1;

    if(location.pathname.includes("tags")) {
      //iska mtlb tag page show krna h
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page) , tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),null, category);
    }

    else {
      fetchBlogPosts(Number(page));
    }
      
  },[location.pathname , location.search])
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/blog/:blogId" element={<BlogPage/>} />
      <Route path="/tag/:tag" element={<TagPage/>} />
      <Route path="/categories/:category" element={<CategoryPage/>} />
     

      
    </Routes>
       
   
  );
}

export default App;
