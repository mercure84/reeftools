/**
 * convert water conductivity (RO water for example) from ppm to µs/cm2
 * @param ppm
 * @param temperatureCelsius
 * @returns
 */
export function ppmToMicrosiemensPerCm(
  ppm: number,
  temperatureCelsius: number
): number {
  // Constants for conversion
  const at25Celsius = 1413; // microsiemens per centimeter (µS/cm) at 25 degrees Celsius
  const temperatureCoefficient = 2.12; // percent change per degree Celsius

  // Calculate temperature compensation
  const compensationFactor =
    1 + (temperatureCoefficient / 100) * (temperatureCelsius - 25);

  // Convert ppm to µS/cm with temperature compensation
  const microsiemensPerCm = ppm * compensationFactor;

  return microsiemensPerCm;
}

/**
 * convert water conductivity from µs/cm2 to ppm
 * @param microsiemensPerCm
 * @param temperatureCelsius
 * @returns
 */
export function microsiemensPerCmToPpm(
  microsiemensPerCm: number,
  temperatureCelsius: number
): number {
  // Constants for conversion
  const at25Celsius = 1413; // microsiemens per centimeter (µS/cm) at 25 degrees Celsius
  const temperatureCoefficient = 2.12; // percent change per degree Celsius

  // Calculate temperature compensation
  const compensationFactor =
    1 + (temperatureCoefficient / 100) * (temperatureCelsius - 25);

  // Convert µS/cm² to ppm with temperature compensation
  let ppm = microsiemensPerCm / compensationFactor;

  return ppm;
}
