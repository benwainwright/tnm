module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        "force",
        'feat',
        'ci',
        'fix',
        'test',
        'vuln',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'chore',
        'revert'
      ]
    ]
  }
};
