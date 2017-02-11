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
