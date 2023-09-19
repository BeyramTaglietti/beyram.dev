import { client } from '@/contentful/config';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { getPosts } from '../page';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts: any = await getPosts();

  return posts.map((post: any) => ({
    slug: post.fields.link,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { postLink: string };
}): Promise<Metadata> {
  const post: any = await getPost(params.postLink);

  return {
    title: post.fields.title,
    description: post.fields.shortDescription,
    openGraph: {
      images: [`https:${post.fields.background.fields.file.url}`],
    },
  };
}

const getPost = async (link: string) => {
  const response = await client.getEntries({
    content_type: 'post',
    'fields.link': link,
  });

  return response.items[0];
};

const Post = async ({ params }: { params: { postLink: string } }) => {
  const post: any = await getPost(params.postLink);

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl w-full font-bold">{post.fields.title}</h1>

        <div className="mt-4 text-justify">
          {documentToReactComponents(post.fields.postContent, renderOptions)}
        </div>
      </div>
    </>
  );
};

export default Post;

const renderOptions = {
  renderNode: {
    'embedded-asset-block': (node: any) => {
      return (
        <div className='flex justify-center py-10'>
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt="blog image"
          />
        </div>
      );
    },
  },
};
