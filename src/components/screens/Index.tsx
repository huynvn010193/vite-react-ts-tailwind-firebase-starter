import { Dialog } from '@headlessui/react';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export type Tool = {
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

  const [formError, setFormError] = useState<boolean>(false);

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save data to Firebase
    try {
      const toolsCollection = collection(firestore, 'tools');
      const newTool: Partial<Tool> = {
        title: inputData.title,
        description: inputData.description,
        url: inputData.url,
      };
      await addDoc(toolsCollection, newTool);
      toast.success('🦄 Saved tool successful!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setTools([...tools, newTool as Tool]);
      setInputData({ title: '', description: '', url: '' });
    } catch (error) {
      setFormError(true);
    }
  };

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <form className="flex" onSubmit={handleFormSubmit}>
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
          <div className="grid grid-cols-3 gap-4 w-full bg-transparent text-slate-50">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="h-48 group relative flex flex-col justify-between rounded-md shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700"
              >
                <div>
                  <div className="text-xl mb-2 font-bold">{tool.title}</div>
                  <div className="">{tool.description}</div>
                </div>
                <a className="text-slate-200" href={tool.url}>
                  {tool.url}
                </a>
                <PencilSquareIcon className="h-6 w-6 text-blue-500 hidden group-hover:block absolute top-4 right-4 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Index;
