import { Dialog } from '@headlessui/react';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';

type Tool = {
  id: string;
  title: string;
  description: string;
  url: string;
};

enum InputEnum {
  ID = 'id',
  TITLE = 'title',
  DESCRIPTION = 'description',
  URL = 'url',
}

function Index() {
  const [tools, setTools] = useState<Array<Tool>>([]);
  const firestore = useFirestore();
  const [inputData, setInputData] = useState<Partial<Tool>>({
    title: '',
    description: '',
    url: '',
  });
  useEffect(() => {
    async function fetchData() {
      const toolsCollection = collection(firestore, 'tools');
      const toolsQuery = query(toolsCollection);
      const querySnapshot = await getDocs(toolsQuery);
      const fetchedData: Array<Tool> = [];

      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as Tool);
      });

      setTools(fetchedData);
    }
    fetchData();
  }, []);

  const handleInputChange = (field: InputEnum, value: string) => {
    setInputData({ ...inputData, [field]: value });
  };

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <form className="flex">
            <input
              type="text"
              placeholder="title"
              onChange={(e) => handleInputChange(InputEnum.TITLE, e.target.value)}
              value={inputData.title}
              className="m-4 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outlie-none p-4 rounded-lg text-slate-50"
            />
            <input
              type="text"
              placeholder="description"
              onChange={(e) => handleInputChange(InputEnum.DESCRIPTION, e.target.value)}
              value={inputData.description}
              className="m-4 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outlie-none p-4 rounded-lg text-slate-50"
            />
            <input
              type="text"
              placeholder="url"
              onChange={(e) => handleInputChange(InputEnum.URL, e.target.value)}
              value={inputData.url}
              className="m-4 bg-transparent border border-slate-700 focus:ring-slate-400 focus:outlie-none p-4 rounded-lg text-slate-50"
            />
            <button
              type="submit"
              className="m-4 border border-purple-500 p-5 rounded-lg bg-purple-600 bg-opacity-30 hover:bg-opacity-50 text-slate-50 transition-opacity"
            >
              Add New Tool
            </button>
          </form>
          <table className="table w-full bg-transparent text-slate-50">
            <thead>
              <tr>
                <th className="bg-slate-900 border border-slate-700 text-slate-50">Title</th>
                <th className="bg-slate-900 border border-slate-700 text-slate-50">Description</th>
                <th className="bg-slate-900 border border-slate-700 text-slate-50">Link</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id}>
                  <td className="bg-slate-800 border border-slate-700">{tool.title}</td>
                  <td className="bg-slate-800 border border-slate-700">{tool.description}</td>
                  <td className="bg-slate-800 border border-slate-700"> {tool.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
