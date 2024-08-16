import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Pesquisar() {

  const router = useRouter();
  const [id, setId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/conta/${id}`);
  };

  return (<div>

    <form onSubmit={handleSubmit} method="get" className="flex items-center space-x-2">
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:opacity-90"
      >
        Pesquisar
      </button>
    </form>

  </div>);
}