'use client';

import BlogCard from "../app/components/BlogCard";
import { useEffect, useState } from "react";
import { getAllBlogs } from "./Functions/api.services";
import Loading from "./Loading/loading"; 

export default function Home() {
  const [blogData, setBlogData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogData(response);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="container grid md:grid-cols-4 gap-2">
        <BlogCard blog={blogData} onRefresh={fetchBlogs} />
      </div>
    </main>
  );
}
