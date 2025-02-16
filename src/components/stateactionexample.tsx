"use client";

import { useActionState } from "react";

async function increment(previousState: number) {
  return previousState + 1;
}

export default function StatefulForm() {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      <p>{state}</p>
      <button 
        formAction={formAction} 
        className="py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white">
          Increment
      </button>
    </form>
  )
}