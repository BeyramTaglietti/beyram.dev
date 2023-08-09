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
        <Link href={`/posts/${post.fields.link}`} key={index}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center flex-col gap-4">
              <h1 className="text-4xl w-full font-bold">{post.fields.title}</h1>
              <Image
                src={`https:${post.fields.background.fields.file.url}`}
                alt={post.fields.title}
                height={450}
                width={900}
                className="border border-gray-700 rounded-xl overflow-hidden"
              />

              <div className="mt-4 text-justify">
                {post.fields.shortDescription}
              </div>
            </div>

            {index % 2 === 0 && (
              <hr className="h-px border-0 bg-gray-700 my-4"></hr>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default Posts;
