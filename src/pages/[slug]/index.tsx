import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { NextSeo } from 'next-seo';

import LinkWrapper from '@/components/LinkWrapper';
import client from '@/graphql/client';
import { GET_PAGES, GET_PAGE_BY_SLUG } from '@/graphql/queries';
import { GetPageBySlugQuery, GetPagesQuery } from '@/graphql/generated/graphql';

import * as S from './styles';

export type PageProps = {
  heading: string;
  body: string;
};

export default function Page({ heading, body }: PageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  return (
    <>
      <NextSeo title={`${heading} - My Trips`} />

      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Content>
        <S.Heading>{heading}</S.Heading>

        <S.Body dangerouslySetInnerHTML={{ __html: body }} />
      </S.Content>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, {
    first: 3,
  });

  const paths = pages.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`,
  });

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      heading: page.heading,
      body: page.body.html,
    },
    revalidate: 5,
  };
};
