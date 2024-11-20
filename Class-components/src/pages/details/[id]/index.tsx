import About from '../../../About/About';
import { useRouter } from 'next/router';

const DetailPage = () => {
  const router = useRouter();
  const isrout = router.pathname !== '/';
  return <>{isrout && <About />}</>;
};

export default DetailPage;
