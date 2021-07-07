import Head from 'next/head';

interface ISEOProps {
  title: string;
}

export function SEO({ title }: ISEOProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
