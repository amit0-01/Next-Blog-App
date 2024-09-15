"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddBlog } from "../Functions/api.services";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long.",
  }),
  coverImage: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function BlogUploadForm() {
  const router = useRouter()
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      coverImage: undefined,
    },
  });
  

  // FORM SUBMISSION
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }
   try {
      const res:any = await AddBlog(data)
      if(res.success){
       router.push(`/particular-blog/${res.blog.id}`)
      }
      
        } catch (error) {
        console.log('error', error)
      }    


  };

  return (
    <div className="flex justify-center mt-4 p-4 border">
    <Form >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the blog title" {...field} />
              </FormControl>
              <FormMessage>{errors.title?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the blog content" rows={10} {...field} />
              </FormControl>
              <FormMessage>{errors.content?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      console.log('e',e.target.files[0]);
                      
                      setValue('coverImage', e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage>{errors.coverImage?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
        <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  );
}
