import React from "react";
import Recipe from "../../domain/Recipe";

interface SelectionCellProps {
  recipe: Recipe;
  variant?: string;
}

const colors: { [key: string]: { fg: string; bg: string } } = {
  A: { bg: "red", fg: "white" },
  B: { bg: "green", fg: "white" },
  C: { bg: "blue", fg: "white" },
  D: { bg: "yellow", fg: "black" },
  E: { bg: "orange", fg: "black" },
  F: { bg: "purple", fg: "white" },
};

const SelectionCell = (props: SelectionCellProps): JSX.Element => {
  return (
    <td
      style={{
        padding: "0.3rem",
        backgroundColor: colors[props.recipe.name].bg,
        border: "1px solid black",
        color: colors[props.recipe.name].fg,
        textAlign: "center",
      }}
    >
      <div>
        <strong>{props.recipe.name}</strong>
      </div>
      <div>{props.variant}</div>
    </td>
  );
};

export default SelectionCell;
