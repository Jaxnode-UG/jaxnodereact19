"use client";
import type { Metar } from '../types/metar';
import ClientMetar from './clientmetar';
import { useActionState } from "react";

async function getData(wxdata: Metar, formData: FormData): Promise<Metar> {
  try {
    const icao = formData.get("station")?.valueOf() as string;
    const res = await fetch(`https://avwx.fekke.com/metar/${icao}`);
    const data = await res.json() as Metar[];
    if (data.length > 0) {
      return data[0];
    } else {
      return wxdata;
    }
  } catch (error) {
    console.error(error);
    return wxdata;
  }
}

interface MetarSearchFormProps {
  readonly wxdata: Metar;
}

export default function MetarSearchForm({ wxdata }: MetarSearchFormProps) {
  const [wx, formAction, isPending] = useActionState(getData, wxdata);
  return (
    <div className="">
      <form action={formAction} className="flex flex-col gap-2 max-w-xs">
        <label htmlFor="station" className="font-bold">Enter Station ID</label>
        <input type="text" id="station" name="station"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <button disabled={isPending} className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline 
          ${isPending ? 
          'bg-gray-500 text-gray-300 cursor-not-allowed' : 
          'bg-blue-500 hover:bg-blue-700 text-white'}`} type="submit">Search</button>
      </form>
      <ClientMetar wxdata={wx} />
    </div>
    
  );
}