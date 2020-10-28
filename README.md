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

## How to use

I have written cloudformation for long-lasting systems. This includes codepipeline for automated deployment.

1. Fork this repo
2. Follow Cloudformation steps

### Cloudformation (yaml)

1. Copy `cloudformation/codepipeline.yml`
2. Create a new Cloudformation stack in AWS Console (Cloudformation > New Stack > Create template in designer > Select Template and YAML > Paste)
3. Wait for a successful codepipeline build, deploying the lambda code.
4. Update your existing cloudfront cloudformation to include the contents of `cloudformation/cloudfront.yml`

Note: If you do not have existing cloudfront cloudformation, you will need to make changes to `cloudformation/cloudfront.yml` at the `# ...all your other distribution config` comment.

## Relevant articles and documentation
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
- https://medium.com/@gavinlewis/localizing-content-with-lambda-edge-fefb12aa6199
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples
- https://aws.amazon.com/about-aws/whats-new/2020/07/cloudfront-geolocation-headers/
- https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-cloudfront-announces-cache-and-origin-request-policies/
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cachepolicy.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-cachepolicy-cachepolicyconfig.html