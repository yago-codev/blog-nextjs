import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';

import { SEO } from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';

import styles from './posts.module.scss';

export interface IPost {
  id: number;
  title: string;
}

export interface IPostsProps {
  posts: IPost[];
}

export default function Posts() {
  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href="#">
            <a>
              <time>25 de dezembro</time>
              <strong>Titulo</strong>
              <p>Parágrafo</p>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content']
    }
  );

  console.log(response);

  return {
    props: {},
    revalidate: 60 * 60 * 12 // 12 horas
  };
};
