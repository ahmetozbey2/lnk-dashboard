import HomepageView from '@/packages/homepage/view';

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <HomepageView />
    </div>
  );
}
