import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import LinkWrapper from '@/components/LinkWrapper';
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline';
import { MapProps } from '@/components/Map';
import client from '@/graphql/client';
import { GET_PLACES } from '@/graphql/queries';
import { GetPlacesQuery } from '@/graphql/generated/graphql';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

export default function Home({ places }: MapProps) {
  const router = useRouter();

  return (
    <>
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map router={router} places={places} />
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES);

  return {
    props: {
      places,
    },
    revalidate: 1000,
  };
};
