import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { solution } from "./main.ts";

Deno.test(async function samplePart1Test() {
  const data = await Deno.readTextFile("sample1.txt");
  assertEquals(solution(data), 24000);
});

Deno.test(async function inputPart1Test() {
  const data = await Deno.readTextFile("input1.txt");
  assertEquals(solution(data), 74198);
});

Deno.test(async function samplePart2Test() {
  const data = await Deno.readTextFile("sample1.txt");
  assertEquals(solution(data, 3), 45000);
});

Deno.test(async function inputPart2Test() {
  const data = await Deno.readTextFile("input1.txt");
  assertEquals(solution(data, 3), 209914);
});
