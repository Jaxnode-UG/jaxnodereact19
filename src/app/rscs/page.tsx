
import type { Metar } from '../../types/metar';
import MetarComponent from '../../components/metar';

async function getData(): Promise<Metar[]> {
  const res = await fetch('https://avwx.fekke.com/metar/kcrg');
  const result = await res.json();
  return result;
}

export default async function ReactServerComponents() {
  const data = await getData();
  console.log(data);
  return (
    <MetarComponent wxdata={data[0]} />
  );
}
