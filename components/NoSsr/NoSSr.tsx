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
            <StyledSpin size='large' style={{ height: 370, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        </div>
    )
})

export const StyledSpin = styled(Spin)`
    && {
        & .ant-spin-dot-item {
            background-color: white;
        }
    }
`