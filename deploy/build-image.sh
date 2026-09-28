#!/bin/sh
set -eu

: "${CI_PROJECT_DIR:?Run this script in GitLab CI}"
: "${CI_COMMIT_SHORT_SHA:?Missing commit SHA}"

# REGISTRY_* permits deployment to a private registry; otherwise GitLab's
# project registry credentials are used automatically.
if [ -n "${REGISTRY_HOST:-}${REGISTRY_IMAGE:-}${REGISTRY_USER:-}${REGISTRY_PASSWORD:-}" ]; then
    : "${REGISTRY_HOST:?Configure REGISTRY_HOST}"
    : "${REGISTRY_IMAGE:?Configure REGISTRY_IMAGE}"
    : "${REGISTRY_USER:?Configure REGISTRY_USER}"
    : "${REGISTRY_PASSWORD:?Configure REGISTRY_PASSWORD}"
    image_repository="${REGISTRY_HOST}/${REGISTRY_IMAGE}"
else
    : "${CI_REGISTRY:?Enable GitLab Container Registry or configure REGISTRY_*}"
    : "${CI_REGISTRY_IMAGE:?Missing GitLab registry image path}"
    : "${CI_REGISTRY_USER:?Missing GitLab registry user}"
    : "${CI_REGISTRY_PASSWORD:?Missing GitLab registry password}"
    REGISTRY_HOST="$CI_REGISTRY"
    REGISTRY_USER="$CI_REGISTRY_USER"
    REGISTRY_PASSWORD="$CI_REGISTRY_PASSWORD"
    image_repository="$CI_REGISTRY_IMAGE"
fi

case "$REGISTRY_HOST" in
    ''|*[!a-zA-Z0-9.:-]*) echo 'REGISTRY_HOST must be hostname[:port], without scheme or path' >&2; exit 1 ;;
esac

image_ref="${image_repository}:${CI_COMMIT_SHORT_SHA}"
mkdir -p /kaniko/.docker
(
    umask 077
    registry_auth=$(printf '%s:%s' "$REGISTRY_USER" "$REGISTRY_PASSWORD" | base64 | tr -d '\n')
    printf '{"auths":{"%s":{"auth":"%s"}}}\n' "$REGISTRY_HOST" "$registry_auth" > /kaniko/.docker/config.json
)
trap 'rm -f /kaniko/.docker/config.json' EXIT
unset REGISTRY_PASSWORD CI_REGISTRY_PASSWORD

/kaniko/executor \
    --context "$CI_PROJECT_DIR" \
    --dockerfile "$CI_PROJECT_DIR/Dockerfile" \
    --destination "$image_ref" \
    --cache=true \
    --cache-run-layers=true \
    --cache-copy-layers=true \
    --cache-repo "${KANIKO_CACHE_REPO:-$image_repository}" \
    --cache-ttl "${KANIKO_CACHE_TTL:-168h}"

printf 'IQUEST_PUBLISH_IMAGE=%s\nBUILD_JOB_ID=%s\nBUILD_JOB_URL=%s\n' \
    "$image_ref" "${CI_JOB_ID:-}" "${CI_JOB_URL:-}" > "$CI_PROJECT_DIR/image.env"
printf 'Image published: %s\n' "$image_ref"
