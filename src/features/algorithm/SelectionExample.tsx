import { Heading } from "grommet";
import React from "react";
import styled from "styled-components";
import Customer from "../../domain/Customer";
import { chooseMeals, isSelectedMeal } from "../../meal-planning";
import DeliveryMealsSelection from "../../types/DeliveryMealsSelection";
import SelectionCell from "./SelectionCell";

interface SelectionExampleProps {
  customers: Customer[];
  deliverySelection: DeliveryMealsSelection;
  name: string;
}

const Row = styled.tr`
  border: 1px solid black;
`;

const HeaderRow = styled.tr`
  border: 1px solid black;
  text-align: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 3rem;
`;

const Cell = styled.td`
  padding: 0.3rem;
  border: 1px solid black;
  text-align: center;
`;

const SelectionExample = (props: SelectionExampleProps): JSX.Element => {
  const chosenMeals = chooseMeals(
    [props.deliverySelection, props.deliverySelection, props.deliverySelection],
    [new Date(Date.now()), new Date(Date.now()), new Date(Date.now())],
    props.customers
  );

  const customersColLength = props.customers.reduce(
    (accum, item) => accum + (item.newPlan?.deliveries[0].items.length ?? 0),
    0
  );

  const colLength = chosenMeals.reduce(
    (accum, item) =>
      accum +
      item.deliveries.reduce(
        (accum2, delivery) =>
          typeof delivery !== "string" ? delivery.length : 1,
        0
      ),
    0
  );

  return (
    <>
      <Heading level={3}>{props.name}</Heading>
      <Table>
        <thead>
          <HeaderRow>
            <Cell colSpan={customersColLength}>
              <strong>Customers</strong>
            </Cell>
          </HeaderRow>
        </thead>

        <tbody>
          {props.customers.map((customer) => (
            <Row key={`${props.name}-${customer.id}-customers`}>
              <Cell>
                <strong>{customer.firstName}</strong>{" "}
              </Cell>
              {customer.newPlan?.deliveries[0].items.map((item) => (
                <Cell key={`${customer.id}-${item.name}-recipe`}>
                  {item.name} x {item.quantity}
                </Cell>
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
      <Table>
        <thead>
          <HeaderRow>
            <Cell colSpan={props.deliverySelection.length}>
              <strong>Picked Meals</strong>
            </Cell>
          </HeaderRow>
        </thead>
        <tbody>
          <Row>
            {props.deliverySelection.map((item) => (
              <SelectionCell key={`${props.name}-${item.id}`} recipe={item} />
            ))}
          </Row>
        </tbody>
      </Table>

      <Table>
        <thead>
          <HeaderRow>
            <Cell colSpan={colLength}>
              <strong>Output</strong>
            </Cell>
          </HeaderRow>
        </thead>
        <tbody>
          {chosenMeals.map((customer) => (
            <Row key={`${props.name}-${customer.customer.id}-name`}>
              <Cell style={{ textAlign: "center", fontWeight: "bold" }}>
                {customer.customer.firstName}
              </Cell>
              {customer.deliveries.flatMap((item) =>
                typeof item !== "string" ? (
                  item.map((innerItem) =>
                    isSelectedMeal(innerItem) ? (
                      <SelectionCell
                        recipe={innerItem.recipe}
                        variant={innerItem.chosenVariant}
                      />
                    ) : (
                      <Cell></Cell>
                    )
                  )
                ) : (
                  <Cell></Cell>
                )
              )}
            </Row>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SelectionExample;
