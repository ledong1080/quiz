import { useState } from 'react';
import { ExamAPI } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ExamCreate() {
  const nav = useNavigate();
  const [title, setTitle] = useState('');

  const create = () => {
    ExamAPI.create({ title }).then(() => nav('/exams'));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-2">Tạo đề thi</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Tên đề thi"
        className="border p-2 rounded w-full mb-2"
      />
      <button onClick={create} className="bg-green-600 text-white px-4 py-2 rounded">Tạo</button>
    </div>
  );
}
