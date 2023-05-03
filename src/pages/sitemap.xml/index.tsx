import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';

import client from '@/graphql/client';
import { GetPlacesQuery } from '@/graphql/generated/graphql';
import { GET_PLACES } from '@/graphql/queries';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES);

  const fields = places.map(({ slug }) => ({
    loc: `https://my-trips.com.br/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  fields.push({
    loc: 'https://my-trips.com.br',
    lastmod: new Date().toISOString(),
  });

  fields.push({
    loc: 'https://my-trips.com.br/about',
    lastmod: new Date().toISOString(),
  });

  return getServerSideSitemapLegacy(ctx, fields);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
