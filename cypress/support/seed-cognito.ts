/* eslint-disable @typescript-eslint/naming-convention */
import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { BackendOutputs } from "../../src/types/backend-outputs";
import { COGNITO_PASSWORD, COGNITO_USER } from "./constants";

const deleteAllFromTable = async (tableName: string): Promise<void> => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
  const scanParams = { TableName: tableName };
  const allItems = await dynamoDb.scan(scanParams).promise();
  await Promise.all(
    allItems.Items?.map(item => {
      const params = { TableName: tableName, Key: { id: item.id } };
      return dynamoDb.delete(params).promise();
    }) ?? []
  );
};

const assertIsBackendOutputs: (
  thing: unknown
) => asserts thing is BackendOutputs = thing => {
  if (
    !(
      (typeof thing === "object" &&
        Object.entries(thing as BackendOutputs).length === 0) ||
      Object.values(thing as BackendOutputs).every(config =>
        Object.hasOwnProperty.call(config, "UserPoolId")
      )
    )
  ) {
    throw new Error(
      `Whoops, the config that was loaded wasn't a valid backend configuration`
    );
  }
};

const seedCognito = async (): Promise<void> => {
  const importedConfig = await import(`${process.cwd()}/backend-outputs.json`);

  const loadedConfig = importedConfig?.default ?? importedConfig;

  assertIsBackendOutputs(loadedConfig);

  const config = Object.entries(loadedConfig).find(([, value]) =>
    Object.hasOwnProperty.call(value, "UserPoolId")
  )?.[1];

  if (!config) {
    throw new Error("No backend config was found...");
  }

  const stackName = Object.keys(loadedConfig)[0];

  if (stackName.includes("prod")) {
    throw new Error(
      "You cannot run the seed script on prod. That would not be clever!"
    );
  }

  const cognito = new CognitoIdentityServiceProvider({ region: "us-east-1" });

  await Promise.all([
    deleteAllFromTable(config.CustomerExclusionsTableName),
    deleteAllFromTable(config.CustomersTableName),
    deleteAllFromTable(config.ExclusionsTableName),
    deleteAllFromTable(config.RecipesTableName)
  ]);

  const createUserParams = {
    UserPoolId: config.UserPoolId,
    Username: COGNITO_USER,
    TemporaryPassword: "123.123.aA",
    MessageAction: "SUPPRESS",
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "True"
      },
      {
        Name: "phone_number_verified",
        Value: "True"
      },
      {
        Name: "phone_number",
        Value: "+4478910123123"
      },
      {
        Name: "email",
        Value: "a@b.c"
      }
    ]
  };

  try {
    await cognito
      .adminDeleteUser({
        UserPoolId: config.UserPoolId,
        Username: COGNITO_USER
      })
      .promise();
  } catch {
    // Noop
  }

  try {
    await cognito
      .createGroup({
        GroupName: "admin",
        UserPoolId: config.UserPoolId
      })
      .promise();
  } catch {
    // Noop
  }

  await cognito.adminCreateUser(createUserParams).promise();

  const setPasswordParams = {
    Password: COGNITO_PASSWORD,
    Permanent: true,
    Username: COGNITO_USER,
    UserPoolId: config.UserPoolId
  };

  await cognito.adminSetUserPassword(setPasswordParams).promise();

  await cognito
    .adminAddUserToGroup({
      GroupName: "admin",
      UserPoolId: config.UserPoolId,
      Username: COGNITO_USER
    })
    .promise();
};

export default seedCognito;
