"use client";
import { useState } from 'react';

export default function ClassicCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <button 
        onClick={() => setCount(count + 1)} 
        className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white">
          Increment
      </button>
      <button 
        onClick={() => setCount(count - 1)} 
        className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white">
          Decrement
      </button>
      <span className="text-gray-700">Count: {count}</span>
    </div>
  )
}
