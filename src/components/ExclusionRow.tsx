import { Button, TableCell, TableRow } from "grommet";

import Exclusion from "../domain/Exclusion";
import React from "react";
import TableCellCheckbox from "./TableCellCheckbox";
import TableCellInputField from "./TableCellInputField";
import YesNoDialog from "./YesNoDialog";

import { deleteExclusion } from "../actions/exclusions";

interface ExclusionRowProps {
  exclusion: Exclusion;
  onChange: (oldExclusion: Exclusion, newExclusion: Exclusion) => void;
}

const ExclusionRow: React.FC<ExclusionRowProps> = (props) => {
  const [showDoDelete, setShowDoDelete] = React.useState(false);
  return (
    <TableRow>
      <TableCell scope="row">
        <TableCellInputField
          name="name"
          thing={props.exclusion}
          mutator={(newExclusion, event): void => {
            newExclusion.name = event.target.value;
          }}
          value={props.exclusion.name}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell scope="row">
        <TableCellCheckbox
          name="allergen"
          thing={props.exclusion}
          mutator={(newExclusion, event): void => {
            newExclusion.allergen = event.target.checked;
          }}
          checked={props.exclusion.allergen}
          onChange={props.onChange}
        />
      </TableCell>
      <TableCell scope="row">
        <Button
          secondary
          onClick={(): void => setShowDoDelete(true)}
          label="Delete"
        />
        <YesNoDialog
          show={showDoDelete}
          header="Are you sure?"
          onYes={(): void => {
            deleteExclusion(props.exclusion);
            setShowDoDelete(false);
          }}
          onNo={(): void => setShowDoDelete(false)}
        >
          Are you sure you want to delete this exclusion?
        </YesNoDialog>
      </TableCell>
    </TableRow>
  );
};

export default ExclusionRow;