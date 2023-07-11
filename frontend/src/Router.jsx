import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Album from './pages/Album';
import ChoseeFrame from './pages/ChooseFrame';
import UploadImage from './pages/UploadImage';
import ConvertAI from './pages/ConvertAI';
import Customizing from './pages/Customizing';
import Test from './pages/Test';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="album" element={<Album />} />
        <Route path="choose" element={<ChoseeFrame />} />
        <Route path="upload" element={<UploadImage />} />
        <Route path="convert" element={<ConvertAI />} />
        <Route path="custom" element={<Customizing />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
