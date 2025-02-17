"use client";
import type { Metar } from '../types/metar';
import MetarComponent from './metar';

interface ClientMetarProps {
  readonly wxdata: Metar;
}

export default function ClientMetar({ wxdata }: ClientMetarProps) {
  return (<div className="bg-pink-200 border-1 p-1">
    <MetarComponent wxdata={wxdata} />
  </div>);
}