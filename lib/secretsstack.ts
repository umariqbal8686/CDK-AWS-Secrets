import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class secretsstack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Lambda function
    const handler = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello from Lambda!' }),
          };
        };
      `),
    });

    // Retrieve the secret from AWS Secrets Manager
    const secret = secretsmanager.Secret.fromSecretNameV2(this, 'MySecret', 'MyTestSecret');

    // Grant permission for the Lambda function to access the secret
    secret.grantRead(handler);
  }
}
