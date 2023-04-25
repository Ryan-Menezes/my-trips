import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import LinkWrapper from '@/components/LinkWrapper';
import * as S from './styles';

const About = () => {
  return (
    <S.Content>
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Fechar" />
      </LinkWrapper>

      <S.Heading>My Trips</S.Heading>

      <S.Body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          corporis consequuntur nesciunt adipisci incidunt ducimus accusamus
          dolorem aliquid sequi exercitationem, porro eos, tenetur optio
          voluptatum earum assumenda sed est doloremque!
        </p>
      </S.Body>
    </S.Content>
  );
};

export default About;
