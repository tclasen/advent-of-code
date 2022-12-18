import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import * as path from "https://deno.land/std@0.102.0/path/mod.ts";
import { solution } from "./main.ts";

export const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));

Deno.test(async function samplePart1Test() {
  const data = await Deno.readTextFile(mainModuleDir + "/" + "sample.txt");
  assertEquals(solution(data), 2);
});

Deno.test(async function inputPart1Test() {
  const data = await Deno.readTextFile(mainModuleDir + "/" + "input.txt");
  assertEquals(solution(data), 503);
});

Deno.test(async function samplePart2Test() {
  const data = await Deno.readTextFile(mainModuleDir + "/" + "sample.txt");
  assertEquals(solution(data, true), 4);
});

Deno.test(async function inputPart2Test() {
  const data = await Deno.readTextFile(mainModuleDir + "/" + "input.txt");
  assertEquals(solution(data, true), 827);
});
