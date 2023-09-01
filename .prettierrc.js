module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,

  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    'react',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^../(.*)$',
    '^./(.*)$',
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
