'use client'

import React from 'react';
import { Button } from "antd";
import styled from "styled-components";
import TopTitle from '@/components/SharedComponents/TopTitle';

const Auth = () => {
  return (
    <div>
      <TopTitle title='권한 관리' explain='권한 관리 화면' />
    </div>
  );
};

export default Auth;