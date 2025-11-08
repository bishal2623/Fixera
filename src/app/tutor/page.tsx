'use client';

import dynamic from 'next/dynamic';

const AITutor = dynamic(
  () => import('@/components/features/ai-tutor'),
  { ssr: false }
);

export default function AITutorPage() {
  return <AITutor />;
}
