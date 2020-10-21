# lambda-edge-language-region-redirect

The language-region-redirect lambda@edge will redirect users to approved Web URIs that include a language-region path. eg. '/en-gb' '/en-eu' '/fr-eu'

# How it works

- Viewer requests will have cache params ('Accept-Language' and 'CloudFront-Viewer-Country' headers) checked
- Lambda@edge will redirect origin requests to approved language-regions

# How to use

I have written 2 sets of instructions for how to use 'lambda-edge-language-region-redirect'. Firstly. how to get it set up quickly through AWS Console. Secondly, for long-lasting systems to use clouidformation.

## AWS Console

...Currently updating.

## Cloudformation (yaml)

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
    Type: AWS::CloudFront::CachePolicy
    Properties:
      CachePolicyConfig:
        Comment: "Origin request policy for lambda-edge-language-region-redirect"
        DefaultTTL: 86400
        MaxTTL: 31536000
        MinTTL: 1
        Name: 'lambda-edge-language-region-redirect-origin-request-policy'
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