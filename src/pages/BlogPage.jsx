import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { baseUrl } from "../baseUrl";
import Header from "../components/Header";
import Spinner from "../components/spinner";
import BlogDetails from "../components/BlogDetails";

const BlogPage = () => {
    const [blog , setBlog] = useState(null)
    const[releatedblog, setReleatedBlog] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {loading , SetLoading} = useContext(AppContext);
    const blogId = location.pathname.split("/").at(-1);
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";


    async function fetchReleatedBlogs() {
        SetLoading(true);
        
         let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
         try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setReleatedBlog(data.releatedblog);

         }
         catch(error) {
            console.log("error in blog");
            setBlog(null);
            setReleatedBlog([]);
         }
         SetLoading(false);
    }
     
    useEffect(() => {
        if(blogId) {
            fetchReleatedBlogs();
        }
    },[location.pathname])
    return(
        <div>
            <Header />
            <div>
                <button onClick={() => navigation(-1)}>
                    Back
                </button>

            </div>
            {
                loading ? <p><Spinner/></p> : blog ? (<div>
                    <BlogDetails post = {blog}/>
                    <h2>Releated Blogs</h2>
                    {
                        releatedblog.map((post) => {
                            <div key={post.id}>
                                <BlogDetails post = {post} />
                                </div>
                        })

                    }
                    </div>) : (
                    <p>No blog found </p>
                )
            }
        </div>
    )
}

export default BlogPage;