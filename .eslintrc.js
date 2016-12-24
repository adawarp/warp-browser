module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'block-spacing': [
      'error'
    ],
    'brace-style': [
      'error', 
      '1tbs', { 
        'allowSingleLine': true 
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'comma-spacing': [
      'error', { 'before': false, 'after': true }
    ],
    'comma-style': [
      'error',
      'last'
    ],
    'space-before-blocks': [
      'error'
    ],
    'space-before-function-paren': [
      'error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }
    ],
    'no-var': [
      'error'
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1, 'maxEOF': 1 }
    ],
    'func-call-spacing': [
      'error',
      'never'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    eqeqeq: [
      'error', 
      'always'
    ],
    'dot-location': [
      'error',
      'property'
    ],
    'curly': [
      'error'
    ],
    'keyword-spacing': [
      'error', { 'after': true }
    ],
    'no-extra-parens': [
      'error'
    ],
    'no-extra-semi': [
      'error'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'no-console': [
      'warn'
    ],
    'no-undef': [
      'warn'
    ],
    'no-useless-return': [
      'error'
    ],
    'no-multi-spaces': [
      'error'
    ],
    yoda: [
      'error',
      'never', { 
        'exceptRange': true 
      }
    ]
  }
};
