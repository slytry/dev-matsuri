import { type FormEventHandler, useEffect, useMemo, useState } from "react";
import {
  buildDefaultRange,
  buildRange,
  dateFromUnixInput,
  estimatePoints,
  formatLocalDate,
  MAX_POINTS,
  STEP_OPTIONS,
  unixFromInput
} from "@/tools/timestamp/timestamp";

type Validation = {
  startTs: number;
  endTs: number;
  points: number;
};

function validateRange(startValue: string, endValue: string, stepSeconds: number): Validation | { error: string } {
  const startTs = unixFromInput(startValue);
  const endTs = unixFromInput(endValue);

  if (startTs === null || endTs === null) {
    return { error: "Check date and time format." };
  }

  if (endTs < startTs) {
    return { error: "End date must be greater than or equal to start date." };
  }

  const points = estimatePoints(startTs, endTs, stepSeconds);
  if (points > MAX_POINTS) {
    return { error: `Range is too large (${points} points). Increase step or reduce period.` };
  }

  return { startTs, endTs, points };
}

export function TimestampTool() {
  const defaults = useMemo(() => buildDefaultRange(), []);
  const [start, setStart] = useState(defaults.start);
  const [end, setEnd] = useState(defaults.end);
  const [stepSeconds, setStepSeconds] = useState(60);
  const [startUnixInput, setStartUnixInput] = useState("");
  const [endUnixInput, setEndUnixInput] = useState("");
  const [message, setMessage] = useState("Ready. Timestamps are Unix seconds (UTC).");

  const validation = useMemo(() => validateRange(start, end, stepSeconds), [start, end, stepSeconds]);

  const rows = useMemo(() => {
    if ("error" in validation) {
      return [];
    }

    return buildRange(validation.startTs, validation.endTs, stepSeconds);
  }, [validation, stepSeconds]);

  useEffect(() => {
    const startTs = unixFromInput(start);
    if (startTs !== null) {
      setStartUnixInput(String(startTs));
    }
  }, [start]);

  useEffect(() => {
    const endTs = unixFromInput(end);
    if (endTs !== null) {
      setEndUnixInput(String(endTs));
    }
  }, [end]);

  const onStartUnixChange = (value: string) => {
    setStartUnixInput(value);
    const converted = dateFromUnixInput(value);
    if (converted !== null) {
      setStart(converted);
    }
  };

  const onEndUnixChange = (value: string) => {
    setEndUnixInput(value);
    const converted = dateFromUnixInput(value);
    if (converted !== null) {
      setEnd(converted);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if ("error" in validation) {
      setMessage(validation.error);
      return;
    }

    setMessage("Done. Values are ready for scripts and logs.");
  };

  const startTs = startUnixInput;
  const endTs = endUnixInput;
  const pointsCount = "error" in validation ? "0" : String(validation.points);

  return (
    <section className="tool-card">
      <header className="tool-head">
        <h1>Timestamp Range</h1>
        <p>Default period starts at 00:00 and ends at 00:00 next day.</p>
      </header>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          <span>Start</span>
          <input type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)} required />
        </label>

        <label>
          <span>End</span>
          <input type="datetime-local" value={end} onChange={(event) => setEnd(event.target.value)} required />
        </label>

        <label>
          <span>Step</span>
          <select value={stepSeconds} onChange={(event) => setStepSeconds(Number(event.target.value))}>
            {STEP_OPTIONS.map((option) => (
              <option key={option.seconds} value={option.seconds}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Generate</button>
      </form>

      <div className="summary-grid">
        <p>
          <span>Start Unix</span>
          <input
            type="text"
            inputMode="numeric"
            value={startTs}
            onChange={(event) => onStartUnixChange(event.target.value)}
          />
        </p>
        <p>
          <span>End Unix</span>
          <input
            type="text"
            inputMode="numeric"
            value={endTs}
            onChange={(event) => onEndUnixChange(event.target.value)}
          />
        </p>
        <p>
          <span>Points</span>
          <strong>{pointsCount}</strong>
        </p>
      </div>

      <p className="message" aria-live="polite">
        {"error" in validation ? validation.error : message}
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Local date/time</th>
              <th>Unix timestamp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((ts, index) => (
              <tr key={ts}>
                <td>{index + 1}</td>
                <td>{formatLocalDate(ts)}</td>
                <td>{ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
