export type Metar = {
  raw_text: string;
  station_id: string;
  observation_time: string;
  latitude: string;
  longitude: string;
  temp_c: string;
  dewpoint_c: string;
  wind_dir_degrees: string;
  wind_speed_kt: string;
  visibility_statute_mi: string;
  altim_in_hg: string;
  sea_level_pressure_mb: string;
  quality_control_flags: { auto_station: string };
  sky_condition: [object];
  flight_category: string;
  metar_type: string;
  elevation_m: string;
}