import { del, get,post } from './apiCliient';


// GET ALL BLOGS
const getAllBlogs = ()=>{
  return get('/blog/all')
}
// GET BLOG WITH ID
const fetchDataWithId = (id:string)=>{
  return get(`/blog/${id}`)
}

// DELETE BLOG
const deleteBlog = (id:string)=>{
  console.log('id',id);
  
 return del(`/blog/${id}`)
}

// ADD BLOG
const AddBlog = (formData: any) => {
  console.log('formdata', formData);
  
  const uploadData = new FormData();
  uploadData.append('title', formData.title)
  uploadData.append('coverImage', formData.coverImage); 
  uploadData.append('content', formData.content); 

  return post(`/blog`, uploadData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
};

export {getAllBlogs, fetchDataWithId, deleteBlog, AddBlog};