import { ReactNode } from 'react';
import * as S from './style';

const TopTitle = ({ title, explain }: { title?: string | ReactNode, explain?: string | ReactNode }) => {
  return (
    <S.StyledDiv>
      <S.Title>{title}</S.Title>
      {explain && <S.Explain>{explain}</S.Explain>}
    </S.StyledDiv>
  )
}

export default TopTitle;