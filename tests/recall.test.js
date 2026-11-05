import assert from "node:assert/strict";
import { test } from "node:test";
import { createRecallPlan, getRecallSummary } from "../src/hooks/useNotes.js";

const start = new Date("2026-01-01T12:00:00.000Z");

test("enabling recall schedules its first checkpoint one day later", () => {
  const plan = createRecallPlan(start);
  assert.equal(plan.enabled, true);
  assert.equal(plan.startedAt, start.toISOString());
  assert.equal(plan.nextDueAt, "2026-01-02T12:00:00.000Z");
  assert.equal(plan.completedSteps, 0);
  assert.equal(plan.completedAt, null);
});

test("a note outside recall is never marked due", () => {
  const summary = getRecallSummary({ recall: null }, start);
  assert.equal(summary.enabled, false);
  assert.equal(summary.due, false);
  assert.equal(summary.mastered, false);
});

test("a checkpoint becomes due at its exact scheduled instant", () => {
  const note = { recall: createRecallPlan(start) };
  assert.equal(getRecallSummary(note, new Date("2026-01-02T11:59:59.999Z")).due, false);
  assert.equal(getRecallSummary(note, new Date("2026-01-02T12:00:00.000Z")).due, true);
});

test("completing the schedule prevents further due checkpoints", () => {
  const note = { recall: { ...createRecallPlan(start), completedSteps: 3 } };
  const summary = getRecallSummary(note, new Date("2026-12-01T12:00:00.000Z"));
  assert.equal(summary.mastered, true);
  assert.equal(summary.due, false);
  assert.equal(summary.nextInterval, null);
});
