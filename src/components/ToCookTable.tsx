import React from "react";
import CookPlan from "../types/CookPlan";
import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

interface ToCookTableProps {
  plan: CookPlan;
}

const ToCookTable: React.FC<ToCookTableProps> = (props) => (
  <React.Fragment>
    <Heading is="h2" level={2}>
      To Cook
    </Heading>
    <Table alignSelf="start">
      <TableHeader>
        <TableRow>
          <TableCell>Meal</TableCell>
          <TableCell>Quantities</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.plan.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Text>{item.recipe.name}</Text>
            </TableCell>
            <TableCell>
              <ul>
                {Object.keys(item.plan).map((variantName) => (
                  <li key={variantName}>
                    <Text>
                      {item.plan[variantName]} x {variantName}
                    </Text>
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </React.Fragment>
);

export default ToCookTable;
