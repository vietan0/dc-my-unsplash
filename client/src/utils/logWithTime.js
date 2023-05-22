export default function logWithTime(msg, start = Date.now()) {
  console.log(msg, `⌚ Elapsed: ${Date.now() - start}ms`);
}
