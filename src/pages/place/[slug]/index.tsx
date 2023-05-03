import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { NextSeo } from 'next-seo';

import LinkWrapper from '@/components/LinkWrapper';
import client from '@/graphql/client';
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries';
import {
  GetPlaceBySlugQuery,
  GetPlacesQuery,
} from '@/graphql/generated/graphql';

import * as S from '@/styles/place';

type ImageProps = {
  url: string;
  width: number;
  height: number;
};

export type PlaceProps = {
  place: {
    slug: string;
    name: string;
    description?: {
      html: string;
      text: string;
    };
    gallery: ImageProps[];
  };
};

export default function Place({ place }: PlaceProps) {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  return (
    <>
      <NextSeo
        title={`${place.name} - My Trips`}
        description={place.description?.text}
      />

      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>

          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />

          <S.Gallery>
            {place.gallery.map((image) => (
              <Image
                key={`photo-${image.url}`}
                src={image.url}
                alt={place.name}
                width={1000}
                height={600}
                quality={75}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3,
  });

  const paths = places.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`,
    }
  );

  if (!place) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      place,
    },
    revalidate: 5,
  };
};
