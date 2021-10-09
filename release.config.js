module.exports = {
  "branches": [
    "main", 
  ],
  "repositoryUrl":"https://github.com/benwainwright/tnm",
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits",
        "releaseRules": [
          { "type": "force", "release": "patch"},
          { "type": "feat", "release":"minor" },
          { "type": "fix", "release": "patch" },
          { "type": "test", "release": false },
          { "type": "vuln", "release": "patch" },
          { "type": "docs", "release": false },
          { "type": "style", "release": false },
          { "type": "refactor", "release": false },
          { "type": "perf", "release": "patch" },
          { "type": "test", "release": false },
          { "type": "build", "release": false },
          { "type": "ci", "release": false },
          { "type": "chore", "release": false },
          { "type": "revert", "release": "patch" },
        ]
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits",
        "linkCompare": true,
        "linkReferences": true,
        "presetConfig": {
          "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
          "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
          "types": [
            { "type": "feat", "section":"Features" },
            { "type": "force", "hidden": true },
            { "type": "test", "hidden": true },
            { "type": "fix", "section": "Bug Fixes" },
            { "type": "vuln", "section": "Security Updates" },
            { "type": "docs", "hidden": true },
            { "type": "style", "hidden": true },
            { "type": "refactor", "hidden": true},
            { "type": "perf", "section": "Performance Updates"},
            { "type": "test", "hidden": true },
            { "type": "build", "hidden": true },
            { "type": "ci", "hidden": true },
            { "type": "chore", "hidden": true },
            { "type": "revert", "section": "Reverts"},
          ]
        }
      }
    ],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
      }
    ],
  ]
}
