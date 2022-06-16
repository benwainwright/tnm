import { Heading, Paragraph } from "grommet";
import React from "react";
import { examples, exclusions } from "./examples";
import SelectionExample from "./SelectionExample";

const AlgorithmPage = (): JSX.Element => {
  return (
    <>
      <Heading level={2}>Picking Algorithm</Heading>
      <Paragraph fill>
        Examples on this page are generated using the same code that generates
        the meal plan, so they should be up to date. If you&apos;d like me to
        add more specific examples to see how the planner would pick it, please
        ask
      </Paragraph>
      {examples.map((example) => (
        <SelectionExample
          key={example.name}
          {...example}
          exclusions={exclusions}
        />
      ))}
    </>
  );
};

export default AlgorithmPage;
