import React from "react";
import Exclusion from "../../domain/Exclusion";
import Recipe from "../../domain/Recipe";

interface SelectionCellProps {
  recipe: Recipe;
  exclusions: Exclusion[];
  variant?: string;
  picked?: boolean;
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
  const invalidExclusions = props.recipe.invalidExclusions?.map((exclusionId) =>
    props.exclusions.find((exclusion) => exclusion.id === exclusionId)
  );
  const invalidExclusionsString =
    (invalidExclusions?.length ?? 0) > 0 && props.picked ? (
      <div>{` (exclude if ${invalidExclusions
        ?.map((exclusion) => exclusion?.name)
        .join(", ")})`}</div>
    ) : (
      ``
    );

  return (
    <td
      style={{
        padding: "0.3rem",
        backgroundColor: colors[props.recipe.name].bg,
        border: "1px solid black",
        color: colors[props.recipe.name].fg,
        textAlign: "center",
        width: "2%",
      }}
    >
      <div>
        <strong>{props.recipe.name}</strong>
      </div>
      <div>{props.variant}</div>
      {invalidExclusionsString}
    </td>
  );
};

export default SelectionCell;
