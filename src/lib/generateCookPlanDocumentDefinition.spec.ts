import CookPlan from "../types/CookPlan";
import { HotOrCold } from "../domain/Recipe";
import generateCookPlanDocumentDefinition from "./generateCookPlanDocumentDefinition";

describe("generateCookPlanDocumentDefinition", () => {
  it("Creates a table containing the correct number of columns", () => {
    const plan: CookPlan = [
      {
        recipe: {
          id: "0",
          name: "foo",
          shortName: "f",
          hotOrCold: HotOrCold.Hot,
          potentialExclusions: [],
        },
        plan: {
          baz: 8,
          bap: 2,
        },
      },
      {
        recipe: {
          id: "1",
          name: "bar",
          shortName: "b",
          hotOrCold: HotOrCold.Hot,
          potentialExclusions: [],
        },
        plan: {
          foo: 1,
          bar: 8,
        },
      },
    ];

    const definition = generateCookPlanDocumentDefinition(plan);

    expect(definition).toEqual(
      expect.objectContaining({
        content: expect.arrayContaining([
          {
            text: expect.stringContaining("TNM Cook Plan (printed"),
            style: "header",
          },
          {
            table: {
              headerRows: 0,
              widths: ["*", "*"],
              body: [
                [
                  { text: "foo", fontSize: 15, bold: true },
                  { ul: ["bap x 2", "baz x 8"] },
                ],
                [
                  { text: "bar", fontSize: 15, bold: true },
                  { ul: ["bar x 8", "foo x 1"] },
                ],
                [
                  { text: "Total cooked", fontSize: 15, bold: true },
                  { text: `19 meals`, fontSize: 15, bold: true },
                ],
              ],
            },
          },
        ]),
        pageOrientation: "portrait",
        defaultStyle: {
          fontSize: 13,
        },
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            lineHeight: 1.5,
          },
        },
      })
    );
  });
});
