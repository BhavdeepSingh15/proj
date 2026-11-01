// Sections set up their animations one at a time, each in its own task, so
// the page never freezes in one long task (keeps Total Blocking Time low on
// mid-range phones). When the queue empties, ScrollTrigger measures once.
import { lib } from "./lib";

type Job = { run: () => void; done: boolean };
const jobs: Job[] = [];
let scheduled = false;

const nextTask = (fn: () => void) => {
  const ch = new MessageChannel();
  ch.port1.onmessage = fn;
  ch.port2.postMessage(0);
};

function pump() {
  scheduled = false;
  const start = performance.now();
  // Run jobs until ~12 ms have passed, then yield to the browser.
  while (jobs.length && performance.now() - start < 12) {
    const job = jobs.shift()!;
    if (!job.done) {
      job.done = true;
      job.run();
    }
  }
  if (jobs.length) schedule();
  else lib.ScrollTrigger?.refresh();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  nextTask(pump);
}

/** Queue a setup. Returns a cancel function (safe to call after it ran). */
export function enqueue(run: () => void): () => void {
  const job: Job = { run, done: false };
  jobs.push(job);
  schedule();
  return () => {
    job.done = true;
  };
}
