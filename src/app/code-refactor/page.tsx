import dynamic from 'next/dynamic';

const CodeRefactor = dynamic(
  () => import('@/components/features/code-refactor'),
  { ssr: false }
);

export default function CodeRefactorPage() {
  return <CodeRefactor />;
}
