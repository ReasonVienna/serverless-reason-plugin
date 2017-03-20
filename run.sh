SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

# we only need to sync the build folder to get out the build files
VOLUME=${SCRIPT_DIR}/_build:/app/_build

# docker run -v $VOLUME -it serverless:reasonml /bin/bash
docker run -v $VOLUME -it serverless:reasonml node compile.js
