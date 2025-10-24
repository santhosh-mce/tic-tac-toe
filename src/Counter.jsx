import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  amountadd,
} from "./features/Counter/counterSlice.js";

function Counter() {
  const { count, amount } = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <>
      <div>
        <h1 className="text-center">Counter</h1>
        <p className="text-center">count is {count}</p>
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={() => dispatch(increment())}
            className="text-4xl px-4 py-2 border-2 bg-gray-500 "
          >
            +
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="text-4xl px-4 py-2 border-2 bg-gray-500"
          >
            -
          </button>
          <button
            onClick={() => dispatch(reset())}
            className="text-4xl px-4 py-2 border-2 bg-gray-500"
          >
            Reset
          </button>
          <button
            onClick={() => dispatch(amountadd())}
            className="text-4xl px-4 py-2 border-2 bg-gray-500"
          >
            Add Amount
          </button>
        </div>
        <p className="text-center">count is {amount}</p>
      </div>
    </>
  );
}

export default Counter;
