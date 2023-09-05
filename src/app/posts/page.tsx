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
      {posts.map((post: any) => (
        <Link
          href={`/posts/${post.fields.link}`}
          key={post.fields.link}
          className="flex justify-center flex-col gap-4 bg-[#333333] p-3 rounded-xl focus:outline-none"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4 mt-2">
                  <h1 className="text-4xl w-full font-bold">
                    {post.fields.title}
                  </h1>

                  <div className="text-justify">
                    {post.fields.shortDescription}
                  </div>
                </div>
                <div className="flex-1">
                  <Image
                    src={`https:${post.fields.background.fields.file.url}`}
                    alt={post.fields.title}
                    height={300}
                    width={600}
                    className="border border-gray-700 rounded-xl w-full h-[350px] object-cover  "
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Posts;
