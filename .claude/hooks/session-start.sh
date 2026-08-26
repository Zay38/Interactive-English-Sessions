#!/bin/bash
# ============================================================
#  SessionStart hook — Interactive English Sessions
#
#  This project is a pure static HTML/CSS/JS site: there is no
#  package manager, no build step and no dependency manifest, so
#  there is nothing to install. What this hook does instead is
#  prepare the things a session actually needs:
#
#    * NODE_PATH, so Playwright (already installed system-wide)
#      can be required without prefixing every command
#    * a fast JS syntax gate, since a typo in a lesson data file
#      silently breaks a whole unit in the browser
#    * a status readout of the site's contents
# ============================================================
set -euo pipefail

# Only run in Claude Code on the web; local sessions keep their own setup.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
cd "$PROJECT_DIR"

# ---- environment ------------------------------------------------------
# Playwright ships with the image but lives outside the project, so
# `require('playwright')` needs NODE_PATH pointed at it. Exporting it here
# means test scripts can just be `node script.js`.
NODE_MODULES_DIR="/opt/node22/lib/node_modules"
if [ -d "$NODE_MODULES_DIR/playwright" ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export NODE_PATH=\"$NODE_MODULES_DIR\"" >> "$CLAUDE_ENV_FILE"
fi

# ---- integrity check --------------------------------------------------
# Every unit is plain <script>-loaded JS with no bundler to catch errors,
# so a syntax slip only shows up as a blank screen in the browser. Catch
# it here instead.
syntax_errors=0
checked=0
error_detail=""
while IFS= read -r file; do
  checked=$((checked + 1))
  if ! node --check "$file" 2>/dev/null; then
    syntax_errors=$((syntax_errors + 1))
    # Buffered rather than printed inline, so the banner still leads.
    error_detail+="   ✗ ${file}"$'\n'
    # `|| true` matters: node --check exits non-zero by design here, and
    # under `set -e` that would abort the hook before it prints anything.
    error_detail+="$( { node --check "$file" 2>&1 || true; } | sed 's/^/     /' | head -4)"$'\n'
  fi
done < <(find . -name '*.js' -not -path './.git/*' -not -path './node_modules/*')

unit_count=$(find units -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
game_count=$(find units -name 'jeopardy.html' 2>/dev/null | wc -l | tr -d ' ')

# ---- welcome ----------------------------------------------------------
cat <<BANNER

    ╔══════════════════════════════════════════════════════════╗
    ║   ██  ██  ██  ██████    ██  ██  ██  ██  ██████            ║
    ║        J · A · R · V · I · S   O N L I N E                ║
    ╚══════════════════════════════════════════════════════════╝

     Good day. All systems are online and functioning normally.

       ▸ Project ...... Interactive English Sessions
       ▸ Lesson units .. ${unit_count} loaded
       ▸ Review games .. ${game_count} standing by
       ▸ Scripts ....... ${checked} verified
       ▸ Test rig ...... Playwright + Chromium, armed
       ▸ Preview ....... python3 -m http.server 8123

BANNER

if [ "$syntax_errors" -gt 0 ]; then
  cat <<BANNER
     ⚠️  Sir, I must flag ${syntax_errors} script(s) with syntax faults:

${error_detail}
         I would recommend addressing those before deployment.

BANNER
else
  cat <<'BANNER'
     Diagnostics complete — no faults detected across any subsystem.
     The workshop is yours. Shall we get started?

BANNER
fi
