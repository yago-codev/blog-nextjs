import { GetServerSideProps } from 'next';
// import { useEffect, useState } from 'react';
import { api } from '../services';

// import styles from '../styles/home.module.scss';
import { SEO } from '../components/SEO';

export interface IPost {
  id: number;
  title: string;
}

export interface IHomeProps {
  posts: IPost[];
}

export default function Home({ posts }: IHomeProps) {
  // const { postsUrl } = api;
  // const [posts, setPosts] = useState<IPost[]>([])

  // useEffect(() => {
  //   fetch(postsUrl)
  //     .then(response => {
  //       response.json()
  //         .then(data => setPosts(data))
  //     })
  // }, [])

  return (
    <div>
      <SEO title="Dev News!" />
      <h1>Posts</h1>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const { postsUrl } = api;

  const response = await fetch(postsUrl);

  const posts = await response.json();

  return {
    props: {
      posts
    }
  };
};
