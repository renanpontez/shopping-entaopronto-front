import { Header } from '@/components/atoms/Header/Header';

export default async function StoresLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
