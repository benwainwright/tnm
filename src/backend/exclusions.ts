import * as database from "./database";
import * as uuid from "uuid";
import {
  AllQueryVariables,
  CreateExclusionMutationVariables,
  ListExclusionsQueryVariables,
} from "./query-variables-types";
import { AppSyncResolverEvent } from "aws-lambda";
import Exclusion from "../domain/Exclusion";

export const isListExclusionsQuery = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<ListExclusionsQueryVariables> => {
  return event.info.fieldName === "listExclusions";
};

const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (value) {
    return value;
  }
  throw new Error(`process.env.${name} not set`);
};

export const listExclusions = async (): Promise<Exclusion[]> => {
  const exclusionsTable = getRequiredEnvVar("EXCLUSIONS_TABLE");
  return ((await database.getAll(exclusionsTable)) as unknown) as Exclusion[];
};

export const isCreateExclusionMutation = (
  event: AppSyncResolverEvent<AllQueryVariables>
): event is AppSyncResolverEvent<CreateExclusionMutationVariables> => {
  return event.info.fieldName === "createExclusion";
};

export const createExclusion = async (
  input: CreateExclusionMutationVariables["input"]
): Promise<Exclusion> => {
  const exclusionsTable = getRequiredEnvVar("EXCLUSIONS_TABLE");
  const id = uuid.v4();

  const record = { ...input, id };

  await database.putAll([{ table: exclusionsTable, record }]);

  return record;
};
