import { ReactNode } from 'react';

export interface ContentsTypes {
  topText: string;
  bottomText: string;
  forwardText: string;
  background: string;
  textBackground: string;
  link: string;
  img: ReactNode;
}

export interface TextComponentTypes {
  content: ContentsTypes;
  index: number;
}
