import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        const data = await response.json();
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.error("Error while fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md shadow-md bg-white">
            <div className="flex items-center mb-4 h-1/8">
              <img src={post.avatar} alt="Author" className="w-10 h-10 rounded-full mr-4" />
              <h2 className="text-xl font-bold">{`${post.firstName} ${post.lastName}`}</h2>
            </div>
            <p className="mb-4 h-1/4">{post.writeup}</p>
            <img src={post.image} alt="Post" className="w-full h-1/2   object-cover rounded-md mb-4" />
          </div>
        ))}
      </div>
    </div>
  )
};

export default Posts;
