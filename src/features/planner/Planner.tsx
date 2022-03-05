import { Heading, Header, Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import { allRecipesSelector } from "../recipes/recipesSlice";
import Finalize from "./Finalize";
import { clearPlanner, customerSelectionsSelector } from "./planner-reducer";
import generateDeliveryPlanDocumentDefinition from "../../lib/generateDeliveryPlanDocumentDefinition";
import generateCookPlanDocumentDefinition from "../../lib/generateCookPlanDocumentDefinition";
import downloadPdf from "../../lib/downloadPdf";
import { generateLabelData, makeCookPlan } from "../../meal-planning";
import DownloadLabelsDialog from "../../components/download-labels-dialog/download-labels-dialog";
import fileDownload from "js-file-download";
import generateCsvStringFromObjectArray from "../../lib/generateCsvStringFromObjectArray";

const Planner: React.FC = () => {
  const dispatch = useDispatch();
  const customerMeals = useSelector(customerSelectionsSelector);
  const recipes = useSelector(allRecipesSelector);
  const [showLabelsDialog, setShowLabelDialog] = useState(false);

  return (
    <>
      <Header align="center" justify="start" gap="small">
        {showLabelsDialog && (
          <DownloadLabelsDialog
            onClose={() => setShowLabelDialog(false)}
            onDownload={(useBy, cook) => {
              setShowLabelDialog(false);
              fileDownload(
                generateCsvStringFromObjectArray(
                  generateLabelData(customerMeals ?? [], useBy, recipes, cook)
                ),
                "labels.csv"
              );
            }}
          />
        )}
        <Heading level={2}>Planner</Heading>
        <Button
          primary
          size="small"
          label="Pack Plan"
          disabled={Boolean(!customerMeals || !recipes)}
          onClick={() => {
            const plan = generateDeliveryPlanDocumentDefinition(
              customerMeals ?? [],
              recipes
            );
            downloadPdf(plan, "pack-plan.pdf");
          }}
        />
        <Button
          primary
          size="small"
          label="Cook Plan"
          disabled={Boolean(!customerMeals || !recipes)}
          onClick={() => {
            const plan = makeCookPlan(customerMeals ?? [], recipes);
            downloadPdf(
              generateCookPlanDocumentDefinition(plan),
              "cook-plan.pdf"
            );
          }}
        />
        <Button
          primary
          size="small"
          label="Download Label Data"
          disabled={Boolean(!customerMeals || !recipes)}
          onClick={() => {
            setShowLabelDialog(true);
          }}
        />
        <Button
          primary
          size="small"
          label="Reset"
          onClick={(): void => {
            dispatch(clearPlanner());
          }}
        />
      </Header>
      <Finalize />
    </>
  );
};

export default Planner;
