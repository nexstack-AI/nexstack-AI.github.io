import Spline from "@splinetool/react-spline";
import type { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "404 - 页面未找到",
  description: "您访问的页面不存在或已被移动。",
};

const NotFoundPage = () => {
  return (
    <>
      <Suspense fallback={<div>加载中...</div>}>
        <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
      </Suspense>
    </>
  );
};

export default NotFoundPage;
