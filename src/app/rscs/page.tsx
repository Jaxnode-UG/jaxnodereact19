
import type { Metar } from '../../types/metar';

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
      <section className="bg-white shadow-md rounded-lg p-6 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">METAR Information</h2>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">Live</span>
            <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Updated</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-medium mb-1">Raw Text</h3>
            <p className="text-gray-700">{data[0].raw_text}</p>
            <div className="mt-2 text-gray-600">
              <p><strong>Station:</strong> {data[0].station_id}</p>
              <p><strong>Observation Time:</strong> {data[0].observation_time}</p>
              <p><strong>Wind Speed:</strong> {data[0].wind_speed_kt} kt</p>
              <p><strong>Wind Direction:</strong> {data[0].wind_dir_degrees}°</p>
              <p><strong>Visibility:</strong> {data[0].visibility_statute_mi} sm</p>
              <p><strong>Temperature:</strong> {data[0].temp_c}°C</p>
              <p><strong>Dew Point:</strong> {data[0].dewpoint_c}°C</p>
              <p><strong>Altimeter:</strong> {data[0].altim_in_hg} inHg</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-medium mb-1">Additional Details</h3>
            <p className="text-gray-600">More metar details can go here.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
