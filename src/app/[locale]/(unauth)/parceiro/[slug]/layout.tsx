import { Header } from '@/components/atoms/Header/Header';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
