'use client';

import { deleteSubscribe } from '@/_apis/subscription';
import Button from '@/_components/common/Button/Button';
import Nav from '@/_components/common/Nav/Nav';
import PageInnerLayout from '@/_components/common/PageInnerLayout/PageInnerLayout';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import {
  unsubscribeButton,
  unsubscribeContent,
  unsubscribeTitle,
  unsubscribeTypo,
} from './unsubscribe.css';
import PAGE_ROUTES from '@/_constants/pageRoutes';

export default function UnsubscribePage() {
  return (
    <React.Suspense>
      <Unsubscribe />;
    </React.Suspense>
  );
}

function Unsubscribe() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  if (!email || !token) {
    throw new Error('올바르지 않은 접근입니다.');
  }

  const handleUnsubscribe = async () => {
    await deleteSubscribe({ email, token });
    router.push(PAGE_ROUTES.unsubscribeCompleted);
  };

  return (
    <div>
      <Nav />
      <PageInnerLayout>
        <div className={unsubscribeContent}>
          <h1 className={unsubscribeTitle}>매일메일 구독 해지</h1>
          <p className={unsubscribeTypo}>
            해지하면 기술 질문을 더 이상 받아볼 수 없어요.
            <br /> 매일메일 구독을 해지하시겠습니까?
          </p>

          <Button className={unsubscribeButton} onClick={handleUnsubscribe} variant="border">
            구독 해지하기
          </Button>
        </div>
      </PageInnerLayout>
    </div>
  );
}
