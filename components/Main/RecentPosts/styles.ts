import styled from 'styled-components';

export const Wrap = styled.div`
  background: #fff;
  padding: 20px 0;
`;

export const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 16px;
`;

export const CardTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  div:first-child {
    display: flex;
    align-items: center;
    font-weight: 800;
    gap: 5px;
  }
`;
