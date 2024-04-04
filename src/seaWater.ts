/**
 * Calculate the water density
 * @param S salinity in PSU
 * @param T temperature in Celsius degrees
 * @param P Pressure in dbar (defaults = 0)
 * @returns density in kg/m3
 */
export function seaWaterDensity(S: number, T: number, P: number = 0) {
  const T2 = Math.pow(T, 2);
  const T3 = Math.pow(T, 3);
  const T4 = Math.pow(T, 4);
  const T5 = Math.pow(T, 5);
  const S1 = Math.pow(S, 1.5);
  const S2 = Math.pow(S, 2);
  const P2 = Math.pow(P, 2);

  const rho =
    999.842594 +
    6.793952e-2 * T -
    9.09529e-3 * T2 +
    1.001685e-4 * T3 -
    1.120083e-6 * T4 +
    6.536332e-9 * T5 +
    8.24493e-1 * S -
    4.0899e-3 * T * S +
    7.6438e-5 * T2 * S -
    8.2467e-7 * T3 * S +
    5.3875e-9 * T4 * S -
    5.72466e-3 * S1 +
    1.0227e-4 * T * S1 -
    1.6546e-6 * T2 * S1 +
    4.8314e-4 * S2;

  const K =
    19652.21 +
    148.4206 * T -
    2.327105 * T2 +
    1.360447e-2 * T3 -
    5.155288e-5 * T4 +
    3.239908 * P +
    1.43713e-3 * T * P +
    1.16092e-4 * T2 * P -
    5.77905e-7 * T3 * P +
    8.50935e-5 * P2 -
    6.12293e-6 * T * P2 +
    5.2787e-8 * T2 * P2 +
    54.6746 * S -
    0.603459 * T * S +
    1.09987e-2 * T2 * S -
    6.167e-5 * T3 * S +
    7.944e-2 * S1 +
    1.6483e-2 * T * S1 -
    5.3009e-4 * T2 * S1 +
    2.2838e-3 * P * S -
    1.0981e-5 * T * P * S -
    1.6078e-6 * T2 * P * S +
    1.91075e-4 * P * S1 -
    9.9348e-7 * P2 * S +
    2.0816e-8 * T * P2 * S +
    9.1697e-10 * T2 * P2 * S;

  return Math.round((rho / (1 - P / K)) * 100) / 100;
}

/**
 * Calculate the water salinity
 * @param density in kg/m3
 * @param temperature in Celsius degree
 * @returns salinity in PSU
 */
export function seaWaterSalinity(
  density: number,
  temperature: number
): number | null {
  const maxIterations = 1000;
  const tolerance = 1e-6;

  // Equation to solve: f(salinity) = density - seawaterDensity(temperature, salinity, pressure)
  const f = (salinity: number): number => {
    return density - seaWaterDensity(temperature, salinity, 0);
  };

  // Derivative of the function f with respect to salinity
  const df = (salinity: number): number => {
    const h = 1e-5; // error margin
    return (f(salinity + h) - f(salinity - h)) / (2 * h);
  };

  // Init of salinity
  let salinity = 35; // Starting value in PSU

  // Iteration method Newton-Raphson
  for (let i = 0; i < maxIterations; i++) {
    const increment = f(salinity) / df(salinity);

    // update
    salinity -= increment;

    // Condition of convergence
    if (Math.abs(increment) < tolerance) {
      return salinity;
    }
  }

  // case of fail
  console.error("La méthode de Newton-Raphson n'a pas convergé.");
  return null;
}
