import React, { useContext } from "react";
import Spinner from './spinner';
import {AppContext} from '../context/appContext'
import BlogDetails from "./BlogDetails";

const Blogs = () => {

    // consume

const { posts , loading} =useContext(AppContext);
    return(
        <div className="flex flex-col gap-y-10 my-4">
            {
                loading
                 ? (<Spinner></Spinner>) : (
                 posts.length === 0 ? (
                    <div>
                        <p>No posts found</p>
                        </div>
                 ) 
                 : 
                 (
                    posts.map((post) => (
                        <BlogDetails key={post.id} post= {post}>
                        </BlogDetails>
                    ))
                 )
                )
            }
        </div>
    )
}

export default Blogs;