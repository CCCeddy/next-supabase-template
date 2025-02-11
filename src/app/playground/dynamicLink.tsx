"use client";
import { useReducer } from "react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const initialState = { count: 2 };

const reducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const DynamicLink = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <li className="space-y-2 text-red-400">
      <Link href={`/playground/about/${state.count}`}>
        Dynamic Route Post {state.count}
      </Link>
      <div>
        <Button
          variant="secondary"
          size="icon"
          className="m-1"
          onClick={handleIncrement}
        >
          +
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="m-1"
          onClick={handleDecrement}
        >
          -
        </Button>
      </div>
    </li>
  );
};

export default DynamicLink;
