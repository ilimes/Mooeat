import { ReactNode } from 'react';
import * as S from './style';

const TopTitle = ({
  title,
  explain,
  number,
}: {
  title?: string | ReactNode;
  explain?: string | ReactNode;
  number?: number | ReactNode;
}) => (
  <S.StyledDiv>
    <S.Title>
      {title}
      {number ? <S.Number>{number}</S.Number> : ''}
    </S.Title>
    {explain ? <S.Explain>{explain}</S.Explain> : ''}
  </S.StyledDiv>
);

export default TopTitle;
