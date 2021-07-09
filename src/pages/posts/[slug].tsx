import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import { SEO } from '../../components/SEO';

import styles from './post.module.scss';

interface IPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({
  post: { title, content, updatedAt }
}: IPostProps) {
  const { isFallback } = useRouter();

  return isFallback ? (
    <p>Loading...</p>
  ) : (
    <>
      <SEO title="Post" />
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{title}</h1>
          <time>{updatedAt}</time>
          {/* Através do "dangerouslySetInnerHTML iremos fazer a introdução do
          valor que será introduzido no post. Esse valor precisa ser introduzido através
          dessa propriedade porque estamos formatando diversos tipos conteúdos que
          estão vindo do Prismic" */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
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
  const { slug } = context.params;

  // cria a conexão com o Prismic
  const prismic = getPrismicClient();

  // fazer query para buscar dados no Prismic
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asText(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )
  };

  return {
    props: {
      post
    },
    revalidate: 60 * 60 * 12
  };
};
