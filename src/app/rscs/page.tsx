
import type { Metar } from '../../types/metar';

async function getData(): Promise<Metar[]> {
  const res = await fetch('https://avwx.fekke.com/metar/kcrg');
  return res.json();
}

export default async function ReactServerComponents() {
  const data = await getData();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">React Server Component Example</h1>
      <p>{data[0].raw_text}</p>
    </div>
  );
}
