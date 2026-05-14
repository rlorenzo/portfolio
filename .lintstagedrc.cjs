// fallow analyzes the whole project graph (cyclomatic complexity, churn,
// duplication), so its command must run without per-file args. Lint-staged
// passes staged filenames to string commands but not to function commands.
module.exports = {
  '*.css': ['csskit check lint.cks', 'oxfmt --write'],
  '*.js': ['oxlint', 'oxfmt --write', () => 'npm run lint:fallow'],
  '*.md': 'oxfmt --write',
};
