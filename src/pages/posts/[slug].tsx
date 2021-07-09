import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { SEO } from '../../components/SEO';

import { api } from '../../services/index';

import styles from './post.module.scss';

interface ICommentProps {
  id: number;
  body: string;
}

interface ICommentsProps {
  comments: ICommentProps[];
}

export default function Post({ comments }: ICommentsProps) {
  const {
    query: { id },
    isFallback
  } = useRouter();

  return isFallback ? (
    <p>Loading...</p>
  ) : (
    <>
      <SEO title="Post" />
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>Titulo</h1>
          <time>Data</time>
          <div>Conteudo</div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { postsUrl } = api;

  // const response = await fetch(postsUrl);
  // const posts = await response.json();

  // const paths = posts.map(({ id }) => {
  //   return {
  //     params: { id: String(id) }
  //   };
  // });

  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {},
    revalidate: 60 * 60 * 12
  };
};
