#!/bin/bash

echo $GOOGLE_SERVICES_BASE64 | base64 -di > ./google-services.json
echo $GOOGLE_SERVICE_INFO_BASE64 | base64 -di > ./GoogleService-Info.plist
echo $ENV_BASE64 | base64 -di > ./.env