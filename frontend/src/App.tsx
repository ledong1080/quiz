import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExamCreate from './pages/ExamCreate';
import ExamList from './pages/ExamList';
import ExamTake from './pages/ExamTake';
import ExamResult from './pages/ExamResult';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/create" element={<ExamCreate />} />
        <Route path="/take/:id" element={<ExamTake />} />
        <Route path="/result/:id" element={<ExamResult />} />
      </Routes>
    </BrowserRouter>
  );
}
