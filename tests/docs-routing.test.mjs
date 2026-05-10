import assert from "node:assert/strict";
import test from "node:test";

import { getLegacyDocsRedirectPath } from "../src/lib/docs-routing.ts";
import { siteConfig } from "../src/lib/site.ts";

test("site config points docs links at the root path", () => {
  assert.equal(siteConfig.docsPath, "/");
});

test("legacy docs root redirects to the new landing page", () => {
  assert.equal(getLegacyDocsRedirectPath(), "/");
});

test("legacy nested docs routes keep their nested path", () => {
  assert.equal(
    getLegacyDocsRedirectPath(["packages", "conditional"]),
    "/packages/conditional",
  );
});
