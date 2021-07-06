import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { api } from '../../services/index';

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
      <h1>Post {id}</h1>
      <ul>
        {comments.map(({ id, body }) => (
          <li key={id}>{body}</li>
        ))}
      </ul>
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

export const getStaticProps: GetStaticProps<ICommentsProps> = async ({
  params
}) => {
  const { id } = params;
  const { commentsUrl } = api;

  const response = await fetch(`${commentsUrl}?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments
    },
    revalidate: 5
  };
};
