import { Metadata } from 'next';
import DetailTitle from '@/_components/QuestionDetail/DetailTitle';
import DetailCategory from '@/_components/QuestionDetail/DetailCategory';
import DetailAnswer from '@/_components/QuestionDetail/DetailAnswer';
import { getDetailQuestion } from '@/_apis/question';
import PageInnerLayout from '@/_components/common/PageInnerLayout/PageInnerLayout';
import Nav from '@/_components/common/Nav/Nav';

type QuestionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: QuestionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const detailQuestion = await getDetailQuestion({ id: decodedSlug });

  return {
    title: `매일메일 - ${detailQuestion.title}`,
    description: detailQuestion.content,
  };
}

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const detailQuestion = await getDetailQuestion({ id: decodedSlug });

  return (
    <div>
      <Nav />
      <PageInnerLayout>
        <DetailTitle title={detailQuestion.title} />
        <DetailCategory category={detailQuestion.category} />
        <DetailAnswer content={detailQuestion.content} />
      </PageInnerLayout>
    </div>
  );
}
