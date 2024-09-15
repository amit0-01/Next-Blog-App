'use client';

import { Button } from '@/components/ui/button';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fetchDataWithId } from '@/app/Functions/api.services';
import Loading from '@/app/Loading/loading';

const BlogPage = () => {
  const path = usePathname();
  const extractIdFromPath = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const [blog, setBlog] = useState<any>();
  const [comments, setComments] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [newComment, setNewComment] = useState('');
  const id = extractIdFromPath(path);

  // FETCHING BLOG DATA
  useEffect(() => {
    const fetchUniqueBlogData = async (id: string) => {
      try {
        const response: any = await fetchDataWithId(id);
        console.log('Fetched blog data:', response);
        setBlog(response.blog);
        setComments(response.comments);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (id) {
      fetchUniqueBlogData(id);
    }
  }, [id]);

  // SUBMITTING THE COMMENT
  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('New comment:', newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container p-4'>
      <main>
        <h1 className="text-3xl font-bold text-center">{blog?.title}</h1>
        <div className="container mx-auto flex justify-center mt-4">
          <img src={blog?.coverImageURL} className="w-full max-w-screen-md" />
        </div>
        <p className="mt-3 text-lg">{blog?.content}</p>
      </main>
      <section className="container mx-auto mt-6">
        <h2 className="text-2xl font-semibold">{comments?.length}</h2>
        {/* Static user data is simulated here */}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <div className="flex justify-between gap-2">
            <input
              type="text"
              name="content"
              value={newComment}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
              className="form-input border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your comment"
            />
            <Button type="submit">
              Add
            </Button>
          </div>
        </form>

        <section className="container mx-auto mt-6 space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((comment: any, index: number) => (
              <div key={index} className="flex items-start space-x-4">
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s'
                  alt='User avatar'
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <span className="font-semibold">Amit Kumar</span>
                  <pre className="whitespace-pre-wrap mt-2">{comment.content}</pre>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </section>
      </section>
    </div>
  );
};

export default BlogPage;
