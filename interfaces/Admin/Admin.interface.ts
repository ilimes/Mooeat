import { ReactElement } from 'react';

export interface MenuTypes {
    key: string;
    icon?: ReactElement,
    label: string,
    onClick?: () => void,
    children?: MenuTypes[],
}