'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import TopTitle from "@/components/SharedComponents/TopTitle";

const Reply = () => {
  const router = useRouter();
  return (
    <div>
      <TopTitle title="댓글 관리" explain="댓글 관리 화면" />
    </div>
  );
};

export default Reply;
