import { GetStaticProps } from 'next';
import Link from 'next/link';

import { SEO } from '../../components/SEO';

import { api } from '../../services/index';

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
  return {
    props: {},
    revalidate: 60 * 60 * 12 // 12 horas
  };
};
