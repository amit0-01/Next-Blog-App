import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; 
import { deleteBlog } from '../Functions/api.services';

// BlogCard component
const BlogCard: React.FC<any> = ({ blog, onRefresh }) => {
  console.log('blog',blog)
  const router = useRouter();
  
  // FOR NAVIGATING TO VIEW BLOG
  const handleViewBlog = (id: string) => {
    router.push(`/particular-blog/${id}`);
  };

  // FOR DELETING THE BLOG
  const handleDelete = async (id:string)=>{    
   const response = await deleteBlog(id)
   console.log('response', response);
   onRefresh();
  }

  return (
    <>
      {blog.map((item: any) => (
        <div className="w-full p-4" key={item.id}>
          <Card className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-200">
              <CardTitle>
                <h1 className="text-xl font-semibold">{item.title}</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <img 
                src={item.coverImageURL}
                alt="Card image cap" 
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-2 text-gray-800 line-clamp-3">{item.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleViewBlog(item.id)}>View</Button>
              <Button onClick={() => handleDelete(item.id)} variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
};

export default BlogCard;
