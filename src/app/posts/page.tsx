import { client } from '@/contentful/config';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description:
    "Here's a list of blog posts written by me about my developer experience",
};

export const getPosts = async () => {
  const response = await client.getEntries({
    content_type: 'post',
  });

  return response.items;
};

const Posts = async () => {
  const posts: any = await getPosts();

  return (
    <>
      {posts.map((post: any, index: number) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="flex justify-center items-center flex-col gap-4 lg:px-14">
            <h1 className="text-4xl w-full lg:max-w-[800px]">
              {post.fields.title}
            </h1>
            <Link href={`/posts/${post.fields.link}`}>
              <Image
                src={`https:${post.fields.background.fields.file.url}`}
                alt={post.fields.title}
                height={450}
                width={800}
                className="border border-gray-700 rounded-xl overflow-hidden"
              />
            </Link>
            <div className="mt-4 text-justify lg:max-w-[800px]">
              {post.fields.shortDescription}
            </div>
          </div>

          {index % 2 === 0 && (
            <hr className="h-px border-0 bg-gray-700 my-4"></hr>
          )}
        </div>
      ))}
    </>
  );
};

export default Posts;
