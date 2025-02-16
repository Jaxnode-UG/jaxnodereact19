"use client";
import type { Metar } from '../types/metar';
import MetarComponent from './metar';

interface ClientMetarProps {
  readonly wxdata: Metar;
}

export default function ClientMetar({ wxdata }: ClientMetarProps) {
  return (<MetarComponent wxdata={wxdata} />);
}