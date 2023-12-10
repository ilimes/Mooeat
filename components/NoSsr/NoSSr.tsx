import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

const NOSSR: React.FC<React.PropsWithChildren> = props => (
    <React.Fragment>{props.children}</React.Fragment>
)
export default dynamic(() => Promise.resolve(NOSSR), {
    ssr: false,
    loading: () => (
        <div style={{ background: '#47408f' }}>
            <StyledSpin size='large' />
        </div>
    )
})

export const StyledSpin = styled(Spin)`
    && {
        height: 370px;
        display: flex;
        justify-content: center;
        align-items: center;
        & .ant-spin-dot-item {
            background-color: white;
        }
    }
`