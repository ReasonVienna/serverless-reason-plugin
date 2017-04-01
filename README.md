# Serverless & ReasonML

## Install

Make sure you have Docker up and running.

```sh
# Make sure docker-machine is up
docker-machine start <name of your machine>
eval $(docker-machine env <name of your machine>)

# Before running, build your docker container
docker build . -t serverless:reasonml
```

Run the following script to install the build environment inside docker:

```sh
./install.sh
```

Build the container manually:

```sh
# Use this script to automatically run the built container
./run.sh
```

## Adding a Function

1. Create a ReasonML file with a name of your choice e.g. myCustomFunction.re
2. Add your function to `serverless.yml` e.g.

```yml
functions:
  myFunction:
    handler: myCustomFunction
    compileReason: native
```
