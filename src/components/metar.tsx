
import type { Metar } from '../types/metar';

interface MetarProps {
  wxdata: Metar;
}

export default function metar({ wxdata }: MetarProps) {
  console.log('Where am I being rendered?');
  return (<div>
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
          
          <div className="mt-2 text-gray-600">
            <p><strong>Station:</strong> {wxdata.station_id}</p>
            <p><strong>Observation Time:</strong> {wxdata.observation_time}</p>
            <p><strong>Wind Speed:</strong> {wxdata.wind_speed_kt} kt</p>
            <div className="mt-2 flex items-center">
                <svg width="60" height="60" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#ccc" strokeWidth="2" fill="none" />
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="10"
                  stroke="#f00"
                  strokeWidth="3"
                  transform={`rotate(${wxdata.wind_dir_degrees},50,50)`}
                />
              </svg>
              <span className="ml-4 text-gray-600 font-medium">{wxdata.wind_dir_degrees}°</span>
            </div>
            <p><strong>Wind Direction:</strong> {wxdata.wind_dir_degrees}°</p>
            <p><strong>Visibility:</strong> {wxdata.visibility_statute_mi} sm</p>
            <p><strong>Temperature:</strong> {wxdata.temp_c}°C</p>
            <p><strong>Dew Point:</strong> {wxdata.dewpoint_c}°C</p>
            <p><strong>Altimeter:</strong> {wxdata.altim_in_hg} inHg</p>
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          
          <h3 className="text-xl font-medium mb-1">Raw Text</h3>
          <p className="text-gray-700">{wxdata.raw_text}</p>
        </div>
      </div>
    </section>
  </div>);
} 