import Head from 'next/head';

interface ISEOProps {
  title: string;
  description?: string;
  image?: string;
  excludeTitleSuffix?: boolean;
  indexPage?: boolean;
}

export function SEO({
  title,
  description,
  image,
  excludeTitleSuffix = false,
  indexPage = true
}: ISEOProps) {
  const pageImage = image && `${process.env.NEXT_PUBLIC_SITE_URL}/${image}`;

  return (
    <Head>
      <title>{!excludeTitleSuffix ? title + ' | Dev News' : title}</title>
      {description && <meta name="description" content={description} />}
      {pageImage && <meta name="image" content={pageImage} />}
      {!indexPage && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
}
