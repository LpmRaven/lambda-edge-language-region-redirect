# Lambda@Edge Language-Region Redirect

An origin request AWS Lambda@Edge to redirect users to localised content.

## What does it do?

The language-region-redirect lambda@edge will redirect users to approved Web URIs that include a language-region path. eg. '/en-gb' '/en-eu' '/fr-eu'. Consistent behaviour can be created using a `language-region-override` cookie, allowing users to set their preference.

### Usercases

- English speaking user browsing from within the US will be redirected to https://<span></span>your-site.com/en-us/*
- French speaking user browsing from within the US will be redirected to https://<span></span>your-site.com/fr-us/*
- English speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/en-gb/*
- French speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/fr-gb/*

## How it works

1. `language-region-override` cookie is checked (for return users) - maintains user's current languageRegion settings.
2. Viewer requests have cache parameters checked ('Accept-Language' and 'CloudFront-Viewer-Country' headers).
3. Lambda@edge redirects origin requests to approved language-regions URIs (set in country-config and langauge-config).

- Any changes to your folked repo deployment branch will be deployed (which is set in cloudformation codepipleline setup.)

- All languages are in ISO 639-1 format (as used for [hreflang attributes](https://support.google.com/webmasters/answer/189077?hl=en)) from the [iso-639-1 repo](https://github.com/meikidd/iso-639-1).
- All regions are in ISO 3166-1 alpha-2 format (as used for [hreflang attributes](https://support.google.com/webmasters/answer/189077?hl=en)) from the [country-list repo](https://github.com/fannarsh/country-list).

## How to use

I have written cloudformation for long-lasting systems. This includes codepipeline for automated deployment. Lambda@Edge cloudformation is different to regular Lambdas as Cloudfront requires a versioned ARN. Lambda@Edge logs are also located differently to regular Lambdas, they can be found in the AWS Cloudfront service console under the monitoring tab (in the region from which the user is requesting data.)

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

1. On first use, run the `yarn run countryReset` and `yarn run languageReset` commands (more details below)
2. Make config changes inside your folked repo `country-config.js` and `language-config.js`
3. Push changes to your repo `aws-deployment` branch (or the branch that you set as GitHubBranch when creating the codepipeline stack)
4. Cloudformation should automatically redeploy your Lambdas and Cloudfront

#### Reset Country Config

Updates the country list, sets default country to "US" (United States of America) and disables all countries

`yarn run countryReset` after installing dependencies

| Variable              |type      | Default value     | What it does  |
|-----------------------|----------|-------------------|---------------|
| domainDefaultCountry  | string   | "US"              | The websites default country. eg. "US" combined with a domainDefaultLanguage of "EN" - `my-domain.com/en-us/some-url` will become `my-domain.com/some-url` |
| countryFallback       | string   | "US"              | If the country code provided is disabled or invalid, this will be the fallback value   |
| europeanUnionEnabled  | boolean  | false             | Passed in cookie for use on client-side, the EU is not used by hreflang attributes but this is helpful for 'country' selection and e-commerce systems. You must also enable all EU countries in countryConfig |
| countryConfig         | array    | generated values  | Enables and disabled countries to be used in country selection and hreflang attributes |

#### Reset Language Config

Updates the language list, sets default language to "EN" (English) and disables all countries

`yarn run languageReset` after installing dependencies

| Variable              |type      | Default value     | What it does  |
|-----------------------|----------|-------------------|---------------|
| domainDefaultLanguage  | string   | "EN"              | The websites default language. eg. "EN" combined with a domainDefaultCountry of "GB" - `my-domain.com/en-gb/some-url` will become `my-domain.com/some-url` |
| languageFallback       | string   | "EN"              | If the language code provided is disabled or invalid, this will be the fallback value   |
| languageConfig         | array    | generated values  | Enables and disabled countries to be used in language selection and hreflang attributes |


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
- https://gist.github.com/jed/56b1f58297d374572bc51c59394c7e7f#gistcomment-3536254