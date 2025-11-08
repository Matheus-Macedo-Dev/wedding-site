import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home/Home';
import Gifts from '@/pages/Gifts/Gifts';
import Gallery from '@/pages/Gallery/Gallery';
import OurStory from '@/pages/OurStory/OurStory';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentError from '@/pages/PaymentError';
import PaymentPending from '@/pages/PaymentPending';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'presentes', element: <Gifts /> },
      { path: 'album', element: <Gallery /> },
      { path: 'historia', element: <OurStory /> },
      { path: 'obrigado', element: <PaymentSuccess /> },
      { path: 'erro', element: <PaymentError /> },
      { path: 'pendente', element: <PaymentPending /> }
    ]
  }
], {
  basename: '/wedding-site'
});

export default router;
