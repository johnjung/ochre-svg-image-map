import type { OchreResourceResponse } from "../src/types";

// promises were added to javascript in ECMAScript 2015 / ES6.
// a promise is an object that will produce a single value some time in the future. 

async function fetchResource(uuid: string): Promise<OchreResourceResponse> {
  const response = await fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`)
  const data = await response.json();
  return data;
  /*
  const result = use zod to parse the data.
  if (!result.success) {
    console.error(result.error.format());
    throw new Error('Invalid data');
  }
  return result.data;
  */
}

let resource = fetchResource('1d1618cf-3d01-4d22-9f26-711b9689c044');
console.log(resource);
