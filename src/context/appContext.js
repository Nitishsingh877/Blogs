import { createContext, useState } from "react";
import {baseUrl} from "../baseUrl";
import { useNavigate } from "react-router-dom";

// step 1
export  const AppContext = createContext();


function AppContextProvider({children}) {
      const [loading , SetLoading] = useState(false);
      const[posts,SetPosts] = useState([]);
      const[page,setPage] = useState(1);
      const[totalPages,setTotalPages] = useState
      (null);
      const navigate = useNavigate();

// data fill

   async function fetchBlogPosts(page=1,tag = null , category) {
    SetLoading(true);
    let url = `${baseUrl}?page=${page}`
    
    if(tag) {
      url += `&tag = ${tag}`;
    }
    
    if(category) {
      url += `&category = ${category}`;
    }

      
       try{
            const results = await fetch(url);
            const data = await results.json();

            setPage(data.page)
            setTotalPages(data.totalPages);
            SetPosts(data.posts);

       }
       catch(error) {
           console.log("error in fetching data");

           setPage(1);
           SetPosts([]);
           setTotalPages(null);
       }

       SetLoading(false);
   }

   function handlePageChange(page) {
      navigate({search: `?page = ${page}`})
    setPage(page);
     
   };
      const value = {
        posts,
        SetPosts,
        loading,
        SetLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
      };

// step 2
      return <AppContext.Provider value={value}>      {children}
      </AppContext.Provider>
}

export default AppContextProvider;
