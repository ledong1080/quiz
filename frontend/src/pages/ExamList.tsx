import { useEffect, useState } from 'react';
import { ExamAPI } from '../api';
import { Link } from 'react-router-dom';

export default function ExamList() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    ExamAPI.list().then(res => setExams(res.data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-2">Danh sách đề thi</h2>
      <Link to="/create" className="btn bg-blue-600 text-white px-4 py-2 rounded">+ Tạo đề thi</Link>
      <ul className="mt-4">
        {exams.map(ex => (
          <li key={ex.id} className="py-1">
            <Link to={`/take/${ex.id}`} className="text-blue-500">{ex.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
