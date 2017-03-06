# Serverless & ReasonML

## Adding a Function

1. Create a ReasonML file with a name of your choice e.g. myCustomFunction.re
2. Add your function to `serverless.yml` e.g.

```
functions:
  myFunction:
    handler: myCustomFunction
    compileReason: native
```

## Docker stuff

```
# Before running, build your docker container
docker build . -t serverless:reasonml

# Use this script to automatically run the built container
./run.sh
```
