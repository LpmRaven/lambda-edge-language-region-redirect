# Lambda@edge Language-Region Redirect

THIS REPO IS CURRENTLY A WORK IN PROGRESS.

## What does it do?

Redirects users to localised content.

The language-region-redirect lambda@edge will redirect users to approved Web URIs that include a language-region path. eg. '/en-gb' '/en-eu' '/fr-eu'

### Usercases

English speaking user browsing from within the EU will be redirected to https://<span></span>your-site.com/en-eu/*

French speaking user browsing from within the EU will be redirected to https://<span></span>your-site.com/fr-eu/*

English speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/en-gb/*

French speaking user browsing from within Great Britain will be redirected to https://<span></span>your-site.com/fr-gb/*

## How it works

- Viewer requests have cache parameters checked ('Accept-Language' and 'CloudFront-Viewer-Country' headers)
- Lambda@edge redirects origin requests to approved language-regions URIs

## How to use

I have written 2 sets of instructions for how to use 'lambda-edge-language-region-redirect'. Firstly. how to get it set up quickly through AWS Console. Secondly, for long-lasting systems to use clouidformation.

### AWS Console

...Currently updating.

### Cloudformation (yaml)

```yml
  ViewerRequestPolicy:
    Type: AWS::CloudFront::CachePolicy
    Properties:
      CachePolicyConfig:
        Comment: "Viewer request policy for lambda-edge-language-region-redirect"
        DefaultTTL: 86400
        MaxTTL: 31536000
        MinTTL: 1
        Name: 'lambda-edge-language-region-redirect-viewer-request-policy'
        ParametersInCacheKeyAndForwardedToOrigin:
          EnableAcceptEncodingBrotli: true
          EnableAcceptEncodingGzip: true
          HeadersConfig:
            HeaderBehavior: whitelist
            Headers: [ 'Accept-Language', 'CloudFront-Viewer-Country' ]
          QueryStringsConfig:
            QueryStringBehavior: none
          CookiesConfig:
            CookieBehavior: none

  OriginRequestPolicy:
    Type: AWS::CloudFront::OriginRequestPolicy
    Properties:
      OriginRequestPolicyConfig:
        Comment: "Origin request policy for lambda-edge-language-region-redirect"
        Name: 'lambda-edge-language-region-redirect-origin-request-policy'
        HeadersConfig:
          HeaderBehavior: whitelist
          Headers: [ 'Accept-Language', 'CloudFront-Viewer-Country' ]
        QueryStringsConfig:
          QueryStringBehavior: none
        CookiesConfig:
          CookieBehavior: none

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        # ...all your other distribution config
        CachePolicyId: !Ref ViewerRequestPolicy
        OriginRequestPolicyId: !Ref OriginRequestPolicy
```

## Relevant articles and documentation
- https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
- https://medium.com/@gavinlewis/localizing-content-with-lambda-edge-fefb12aa6199
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-redirecting-examples
- https://aws.amazon.com/about-aws/whats-new/2020/07/cloudfront-geolocation-headers/
- https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-cloudfront-announces-cache-and-origin-request-policies/
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-cachepolicy.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-cachepolicy-cachepolicyconfig.html