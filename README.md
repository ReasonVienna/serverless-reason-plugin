# Serverless & ReasonML

## Install

Build your Docker container.

```sh
docker build . -t serverless:reasonml
```

Run the following script to install the build environment inside Docker: 

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
