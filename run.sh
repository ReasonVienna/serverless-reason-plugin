SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

VOLUME=${SCRIPT_DIR}/_build:/app/_build

docker run -v $VOLUME -it serverless:reasonml node compile.js
