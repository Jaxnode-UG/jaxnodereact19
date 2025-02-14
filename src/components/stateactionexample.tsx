"use client";

import { useActionState } from "react";

async function increment(previousState: number, formData: FormData) {
  console.log(formData);
  return previousState + 1;
}

export default function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      <p>{state}</p>
      <button formAction={formAction}>Increment</button>
    </form>
  )
}