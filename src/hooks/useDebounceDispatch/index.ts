import { useRef } from "react";
import _ from "lodash";
import { useAppDispatch } from "../reduxHooks";

/**
 * Dispatches the new state with a debounce delay.
 *
 * How to use:
 * 1. Declare a new function using `useDebounceDispatch`, passing the action creator and delay as arguments.
 * 2. When using the declared function, pass the new state you want to dispatch.
 *
 * It triggers a new debounced function when called with the new state you want to dispatch.
 * The action creator passed as an argument to `useDebounceDispatch` will be invoked after the debounce delay.
 *
 * @param actionCreator - the reducer you want to dispatch.
 * @param delay - the time you want to delay.
 * @returns - the debounced function.
 */
export function useDebounceDispatch<T>(
  actionCreator: (args: T) => any,
  delay: number
) {
  const dispatch = useAppDispatch();

  // Create a debounced function
  const debouncedDispatch = useRef(
    _.debounce((newValue: T) => {
      // Call the action creator with newValue and dispatch the result
      dispatch(actionCreator(newValue));
    }, delay)
  );

  // Return the debounced function
  return debouncedDispatch.current;
}