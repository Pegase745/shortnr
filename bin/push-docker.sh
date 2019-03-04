#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t pegase/shortnr -f Dockerfile.prod .

docker tag pegase/shortnr:latest pegase/shortnr:$TRAVIS_TAG

docker push pegase/shortnr:latest
docker push pegase/shortnr:$TRAVIS_TAG
