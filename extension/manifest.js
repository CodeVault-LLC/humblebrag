import fs from "node:fs";

const packageJson = JSON.parse(fs.readFileSync("../package.json", "utf8"));

const isFirefox = process.env.__FIREFOX__ === "true";

const sidePanelConfig = {
  side_panel: {
    default_path: "side-panel/index.html",
  },
  permissions: !isFirefox ? ["sidePanel"] : [],
};

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = Object.assign({
  manifest_version: 3,
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: "Humblebrag",
  version: packageJson.version,
  description:
    "Humblebrag is a browser extension that helps you to debug your web applications.",
  permissions: ["storage", "webRequest", "scripting"].concat(
    sidePanelConfig.permissions
  ),
  host_permissions: ["<all_urls>"],
  background: {
    service_worker: "background.iife.js",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["index.iife.js"],
      run_at: "document_start",
    },
  ],
  devtools_page: "devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["*.js", "*.css", "*.svg", "icon-128.png", "icon-34.png"],
      matches: ["*://*/*"],
    },
  ],
});

export default manifest;
