#!/usr/bin/env bash
# Generate the static redirect site for community.flake.parts.
#
# The site has been retired; its documentation moved to the individual
# projects (see https://github.com/flake-parts/community.flake.parts/issues/488).
# This script produces one meta-refresh page per old URL listed in
# redirects.tsv, plus the landing page and a 404 fallback that forwards
# unlisted URLs by prefix.
#
# Usage: generate.sh <output-directory>
set -euo pipefail

out=${1:?usage: generate.sh <output-directory>}
sitedir=$(dirname "$0")

mkdir -p "$out"
cp "$sitedir/index.html" "$sitedir/404.html" "$sitedir/favicon.svg" "$out/"

while IFS=$'\t' read -r path target; do
  [ -n "$path" ] || continue
  mkdir -p "$out/$(dirname "$path")"
  cat > "$out/$path.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=$target">
<link rel="canonical" href="$target">
<title>Page moved</title>
<style>
:root { color-scheme: dark; }
body { background: #1a1b26; color: #c0caf5; font-family: system-ui, sans-serif; }
a { color: #7aa2f7; }
</style>
</head>
<body>
<p>This page has moved to <a href="$target">$target</a>.</p>
</body>
</html>
EOF
done < "$sitedir/redirects.tsv"

echo "Generated $(find "$out" -name '*.html' | wc -l) pages in $out"
