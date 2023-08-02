import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AlbumPage from './pages/AlbumPage';
import ChoseeFramePage from './pages/ChooseFramePage';
import UploadImagePage from './pages/UploadImagePage';
import ConvertAIPage from './pages/ConvertAIPage';
import FramePage from './pages/FramePage';
import CustomizingPage from './pages/CustomizingPage';
import TestPage from './pages/TestPage';
import LoadingPage from './pages/LoadingPage';
import { AuthProvider } from './contexts/AuthContext';

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="album" element={<AlbumPage />} />
          <Route path="choose" element={<ChoseeFramePage />} />
          <Route path="upload" element={<UploadImagePage />} />
          <Route path="convert" element={<ConvertAIPage />} />
          <Route path="frame" element={<FramePage />} />
          <Route path="custom" element={<CustomizingPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="loading" element={<LoadingPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
