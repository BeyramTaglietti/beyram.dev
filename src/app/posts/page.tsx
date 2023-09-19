import { client } from '@/contentful/config';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BiSolidTimeFive } from 'react-icons/bi';

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
          className="flex justify-center flex-col gap-4 bg-primary p-3 rounded-xl focus:outline-none"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 2xl:flex-2 flex flex-col mt-2 justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-4xl w-full font-bold">
                      {post.fields.title}
                    </h1>

                    <div className="text-justify">
                      {post.fields.shortDescription}
                    </div>
                  </div>
                  <div className='flex gap-2 items-center py-1 px-3 rounded-lg w-max bg-secondary'>
                    <span>
                      <BiSolidTimeFive />
                    </span>
                    <span>{post.fields.readingTime} min read</span>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden rounded-xl">
                  <Image
                    src={`https:${post.fields.background.fields.file.url}`}
                    alt={post.fields.title}
                    height={300}
                    width={600}
                    className="w-full h-full object-cover "
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
