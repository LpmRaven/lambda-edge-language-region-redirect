# Lambda@edge Language-Region Redirect

THIS REPO IS CURRENTLY A WORK IN PROGRESS.

## What does it do?

Redirects users to localised content.

The language-region-redirect lambda@edge will redirect users to approved Web URIs that include a language-region path. eg. '/en-gb' '/en-eu' '/fr-eu'


### Usercases

- English speaking user browsing from within the EU will be redirected to https://<span></span>your-site.com/en-eu/*
- French speaking user browsing from within the EU will be redirected to https://<span></span>your-site.com/fr-eu/*
- English speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/en-gb/*
- French speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/fr-gb/*

## How it works

- Viewer requests have cache parameters checked ('Accept-Language' and 'CloudFront-Viewer-Country' headers)
- Lambda@edge redirects origin requests to approved language-regions URIs
- Any changes to your folked repo aws-deployment branch will be deployed

- All languages are in ISO 639-1 format (as used for [hreflang attributes](https://support.google.com/webmasters/answer/189077?hl=en)) from the [iso-639-1 repo](https://github.com/meikidd/iso-639-1).
- All regions are in ISO 3166-1 alpha-2 format (as used for [hreflang attributes](https://support.google.com/webmasters/answer/189077?hl=en)) from the [country-list repo](https://github.com/fannarsh/country-list).

## How to use

I have written cloudformation for long-lasting systems. This includes codepipeline for automated deployment.

1. Fork this repo
2. Follow Cloudformation steps below
3. Configure by following the Config changes and updates` steps below

### Cloudformation (yaml)

1. Copy `cloudformation/codepipeline.yml`
2. Create a new Cloudformation stack in AWS Console (Cloudformation > New Stack > Create template in designer > Select Template and YAML > Paste)
3. Wait for a successful codepipeline build, deploying the lambda code.
4. Update your existing cloudfront cloudformation to include the contents of `cloudformation/cloudfront.yml`

Note: If you do not have existing cloudfront cloudformation, you will need to make changes to `cloudformation/cloudfront.yml` at the `# ...all your other distribution config` comment.

### Config changes and updates

1. Make config changes inside your folked repo `this file`
2. Push changes to your repo `aws-deployment` branch (or the branch that you set as GitHubBranch when creating the codepipeline stack)
3. re-deploy cloudfront cloudformation to update lambda version

## Relevant articles and documentation
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
- https://medium.com/@gavinlewis/localizing-content-with-lambda-edge-fefb12aa6199
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples
- https://aws.amazon.com/about-aws/whats-new/2020/07/cloudfront-geolocation-headers/
- https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-cloudfront-announces-cache-and-origin-request-policies/
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cachepolicy.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-cachepolicy-cachepolicyconfig.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-authoring-functions.html