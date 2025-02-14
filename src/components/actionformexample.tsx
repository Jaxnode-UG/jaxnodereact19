"use client";
import {useState, useTransition} from 'react';
import {updateName} from '../app/actions/updatename';

export default function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const submitAction = async () => {
    startTransition(async () => {
      const result = await updateName(name);
      if (typeof result !== 'string' && result.error) {
        setError(result.error);
      } else {
        setName('');
      }
    })
  }
  
  return (
    <form action={submitAction}>
      <label>Name</label>
      <input type="text" name="name" disabled={isPending}/>
      <button type="submit" disabled={isPending}>Submit</button>
      <br />
      {error && <span>Failed: {error}</span>}
    </form>
  )
}
