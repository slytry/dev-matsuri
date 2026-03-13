export const MAX_POINTS = 5000;

export type StepOption = {
  label: string;
  seconds: number;
};

export const STEP_OPTIONS: StepOption[] = [
  { label: "1 second", seconds: 1 },
  { label: "1 minute", seconds: 60 },
  { label: "1 hour", seconds: 3600 },
  { label: "1 day", seconds: 86400 }
];

export function toLocalInputValue(date: Date): string {
  const tzOffset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export function buildDefaultRange(now = new Date()): { start: string; end: string } {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

  return {
    start: toLocalInputValue(startOfToday),
    end: toLocalInputValue(startOfTomorrow)
  };
}

export function unixFromInput(value: string): number | null {
  const millis = new Date(value).getTime();
  if (Number.isNaN(millis)) {
    return null;
  }

  return Math.floor(millis / 1000);
}

export function dateFromUnixInput(value: string): string | null {
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    return null;
  }

  const unixSeconds = Number(trimmed);
  if (!Number.isSafeInteger(unixSeconds)) {
    return null;
  }

  const date = new Date(unixSeconds * 1000);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return toLocalInputValue(date);
}

export function estimatePoints(startTs: number, endTs: number, stepSeconds: number): number {
  return Math.floor((endTs - startTs) / stepSeconds) + 1;
}

export function buildRange(startTs: number, endTs: number, stepSeconds: number): number[] {
  const list: number[] = [];

  for (let ts = startTs; ts <= endTs; ts += stepSeconds) {
    list.push(ts);
  }

  return list;
}

export function formatLocalDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium"
  });
}
