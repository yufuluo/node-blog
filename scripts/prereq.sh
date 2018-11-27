#!/bin/bash

# Get the AWS Zone to extract the AWS region
awsZone=$(ec2metadata --availability-zone)

# THe AWS Region is the AWS zone with out the last character
export AWS_DEFAULT_REGION=$(echo $awsZone |sed -e "s/.$//")

export accountId=$(python -c 'import urllib, json; print json.loads(urllib.urlopen("http://169.254.169.254/latest/dynamic/instance-identity/document").read())["accountId"]')

export INST_ID=$(ec2metadata --instance-id)
