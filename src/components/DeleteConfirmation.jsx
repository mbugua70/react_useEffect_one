import { useEffect, useState } from "react";
const TIMERS = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [timerId, setTimerId] = useState(null);
  const [remaining, setRemaining] = useState(TIMERS);

  useEffect(() => {
    setInterval(() => {
      setRemaining((prevTimer) => prevTimer - 10);
    }, 10);
  }, []);

  useEffect(() => {
    console.log("TIMER SET");
    const newTimerId = setTimeout(() => {
      onConfirm();
    }, TIMERS);

    setTimerId(newTimerId);

    return () => {
      console.log("Cleaning up timeout");
      clearTimeout(newTimerId);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button
          onClick={() => clearTimeout(timerId) || onConfirm()}
          className="button"
        >
          Yes
        </button>
      </div>
      <progress value={remaining} max={TIMERS} />
    </div>
  );
}
