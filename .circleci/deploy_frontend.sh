export AWS_DEFAULT_REGION=eu-west-1
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export CLOUDFRONT_DISTRO_ID=E1YRVRN38DJTEK
export BUCKET=cyf-dos

sudo apt-get -y -qq install awscli
aws configure set preview.cloudfront true

# invalidate cache in cloudfront
TIMESTAMP=$(date '+%Y-%m-%d-%H-%M-%S')
sed -i -e "s/__TIMESTAMP__/${TIMESTAMP}/g" .circleci/invalidation-batch.json

aws s3 sync frontend/build/ s3://${BUCKET} --acl public-read --delete --cache-control max-age=3600
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRO_ID \
    --invalidation-batch file://.circleci/invalidation-batch.json