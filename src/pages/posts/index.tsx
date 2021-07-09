import { Fragment } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { SEO } from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';

import styles from './posts.module.scss';

export interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

export interface IPostsProps {
  posts: IPost[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(({ excerpt, slug, title, updatedAt }) => (
            <Fragment key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>
                  <time>{updatedAt}</time>
                  <strong>{title}</strong>
                  <p>{excerpt}</p>
                </a>
              </Link>
            </Fragment>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<IPostsProps> = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content']
    }
  );

  // console.log(response);

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    };
  });

  console.log(posts);

  return {
    props: {
      posts
    },
    revalidate: 60 * 60 * 12 // 12 horas
  };
};
