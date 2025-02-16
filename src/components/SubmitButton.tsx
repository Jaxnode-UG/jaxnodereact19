"use client";
import { useFormStatus } from 'react-dom';

export default function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending} 
    className={`font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline 
      ${status.pending ? 
        'bg-gray-500 text-gray-300 cursor-not-allowed' :
        'bg-blue-500 hover:bg-blue-700 text-white'}`}>Submit</button>
}
