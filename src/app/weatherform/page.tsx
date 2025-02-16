import React from "react";
import type { Metar } from '../../types/metar';
import MetarSearchForm from '../../components/metarsearchform';

// Helper to fetch the default weather data for a given ICAO code.
async function getDefaultWeather(icao: string): Promise<Metar[]> {
  const res = await fetch(`https://avwx.fekke.com/metar/${icao}`);
  return res.json();
}

// The server component that fetches default data and then loads the client form.
export default async function WeatherFormPage() {
  const defaultWeather = await getDefaultWeather("kcrg");

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Aviation Weather</h1>
      <MetarSearchForm wxdata={defaultWeather[0]}/>
    </div>
  );
}
