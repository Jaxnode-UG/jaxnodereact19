"use client";
import {useState, useTransition} from 'react';
import {updateName} from '../app/actions/updatename';

export default function UpdateName() {
  const [resultName, setResultName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const submitAction = async (formData: FormData) => {
    const nameValue = formData.get('name')?.valueOf() as string;

    startTransition(async () => {
      const result = await updateName(nameValue);
      if (typeof result !== 'string' && result.error) {
        setError(result.error);
        setResultName('');
      } else {
        setResultName(result as string);
        setError(null);
      }
    })
  }
  
  return (    
    <form action={submitAction} className="flex flex-col gap-2 max-w-xs">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='name'>Name</label>
      <input 
        type="text" 
        name="name" 
        disabled={isPending} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      <button 
        type="submit" 
        disabled={isPending} 
        className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
          ${isPending ? 
          'bg-gray-500 text-gray-300 cursor-not-allowed' : 
          'bg-blue-500 hover:bg-blue-700 text-white'}`}>
            Submit
      </button>
      {error && <span className="text-red-500">Failed: {error}</span>}
      {resultName && <span className="text-green-500">Success: {resultName}</span>}
    </form>
  )
}
