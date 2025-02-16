
import type { Metar } from '../../types/metar';
import MetarComponent from '../../components/metar';

async function getData(): Promise<Metar[]> {
  const res = await fetch('https://avwx.fekke.com/metar/kcrg');
  const result = await res.json();
  return result;
}

export default async function ReactServerComponents() {
  const data = await getData();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">React Server Component Example</h1>
      <MetarComponent wxdata={data[0]} />
    </div>
  );
}
