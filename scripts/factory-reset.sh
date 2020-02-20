#!/usr/bin/env bash

CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

SKIP_MAINTENANCE_APP=true . "${CURRENT_DIR}/stop.sh"
SKIP_MAINTENANCE_APP=true . "${CURRENT_DIR}/cleanup.sh"

exit 0
