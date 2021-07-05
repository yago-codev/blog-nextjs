import { GetStaticProps } from 'next';

import { api } from '../../services/index';

export interface IPost {
  id: number;
  title: string;
}

export interface IPostsProps {
  posts: IPost[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <div>
      <h1>Listagem de Posts</h1>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<IPostsProps> = async () => {
  const { postsUrl } = api;

  const response = await fetch(postsUrl);
  const posts = await response.json();

  return {
    props: {
      posts
    },
    revalidate: 5
  };
};
