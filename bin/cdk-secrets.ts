#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { secretsstack } from '../lib/secretsstack';

const app = new cdk.App();
new secretsstack(app, 'secrets-stack')