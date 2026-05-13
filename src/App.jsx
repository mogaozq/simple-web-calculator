import React, { useState } from "react";
import packageInfo from "../package.json";

const appName = "Simple Web Calculator :)";

const buttons = [
  "C",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5", 
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "="
];

const operators = ["+", "-", "*", "/"];

function calculate(left, operator, right) {
  const first = Number(left);
  const second = Number(right);

  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  if (operator === "/") return second === 0 ? "Error" : first / second;
  return second;
}

function formatValue(value) {
  if (value === "Error") return value;
  return Number.parseFloat(Number(value).toFixed(10)).toString();
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  function reset() {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForValue(false);
  }

  function inputDigit(digit) {
    if (display === "Error") {
      setDisplay(digit);
      return;
    }

    if (waitingForValue) {
      setDisplay(digit);
      setWaitingForValue(false);
      return;
    }

    setDisplay((current) => (current === "0" ? digit : current + digit));
  }

  function inputDecimal() {
    if (display === "Error" || waitingForValue) {
      setDisplay("0.");
      setWaitingForValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => `${current}.`);
    }
  }

  function toggleSign() {
    if (display === "0" || display === "Error") return;
    setDisplay((current) => (current.startsWith("-") ? current.slice(1) : `-${current}`));
  }

  function percentage() {
    if (display === "Error") return;
    setDisplay((current) => formatValue(Number(current) / 100));
  }

  function chooseOperator(nextOperator) {
    if (display === "Error") {
      reset();
      return;
    }

    if (operator && !waitingForValue) {
      const result = calculate(storedValue, operator, display);
      const formatted = formatValue(result);
      setDisplay(formatted);
      setStoredValue(formatted);
    } else {
      setStoredValue(display);
    }

    setOperator(nextOperator);
    setWaitingForValue(true);
  }

  function handleEquals() {
    if (!operator || storedValue === null || waitingForValue) return;

    const result = calculate(storedValue, operator, display);
    setDisplay(formatValue(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForValue(true);
  }

  function handleClick(value) {
    if (/^\d$/.test(value)) inputDigit(value);
    else if (value === ".") inputDecimal();
    else if (value === "C") reset();
    else if (value === "+/-") toggleSign();
    else if (value === "%") percentage();
    else if (value === "=") handleEquals();
    else if (operators.includes(value)) chooseOperator(value);
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-100 px-4 py-6 text-slate-950">
      <header className="mx-auto w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold">{appName}</h1>
      </header>

      <div className="flex flex-1 items-center justify-center py-6">
        <section className="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl">
          <div className="mb-4 flex h-24 items-end justify-end rounded-md bg-slate-950 px-4 py-3">
            <output className="w-full overflow-hidden text-right text-4xl font-semibold tabular-nums text-white">
              {display}
            </output>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {buttons.map((button) => {
              const isOperator = operators.includes(button) || button === "=";
              const isUtility = ["C", "+/-", "%"].includes(button);
              const isZero = button === "0";

              return (
                <button
                  key={button}
                  type="button"
                  onClick={() => handleClick(button)}
                  className={[
                    "h-16 rounded-md text-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2",
                    isZero ? "col-span-2" : "",
                    isOperator
                      ? "bg-cyan-600 text-white hover:bg-cyan-700"
                      : isUtility
                        ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                  ].join(" ")}
                >
                  {button}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="text-center text-xs text-slate-500">
        v{packageInfo.version}
      </footer>
    </main>
  );
}
