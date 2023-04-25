import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1100;
  top: var(--medium);
  right: var(--medium);
  color: var(--light);
  cursor: pointer;

  svg {
    transition: color 0.3 ease-in-out;
  }

  &:hover {
    svg {
      color: var(--highlight);
    }
  }
`;
