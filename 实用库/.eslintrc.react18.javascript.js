module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  plugins: [
    'react',
    'react-hooks',
    'import',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    },
    // React
    react: {
      pragma: 'React',
      version: 'detect'
    },
    componentWrapperFunctions: ['styled', 'connect'], // Modify this for HOCs
    formComponents: [], // Components used as <form> tag
    linkComponents: ['Link'] // Components usea as <a> tag
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',


    // React 18
    'react/boolean-prop-naming': [
      'warn',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: 'BOOLEAN prop ({{ propName }}) should start with "is" or "has" and use camelCase',
        validateNested: false
      }
    ],
    'react/default-props-match-prop-types': 'error',
    'react/display-name': ['warn', { ignoreTranspilerName: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/hook-use-state': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-string-refs': ['error', { noTemplateLiterals: true }],
    'react/no-this-in-sfc': 'error',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          {
            'char': '>',
            alternatives: ['&gt;']
          },
          {
            'char': '}',
            alternatives: ['&#125;']
          },
          {
            'char': '"',
            alternatives: ['&quot;']
          },
          {
            'char': '\'',
            alternatives: ['&apos;']
          }
        ]
      }
    ],
    'react/no-unknown-property': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/no-unused-prop-types': 'error',
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/react-in-jsx-scope': 'off', // disabled for JSX transform from React 17
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/style-prop-object': ['error', { allow: [] }],
    'react/void-dom-elements-no-children': 'error',


    // JSX - React 18
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always'
      }
    ],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent'
      }
    ],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    'react/jsx-indent-props': ['error', 'first'],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: false, // Maybe a breaking change in future: https://github.com/facebook/react/issues/20031#issuecomment-710346866
        warnOnDuplicates: true
      }
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: {
          single: 3,
          multi: 1
        }
      }
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-no-script-url': [
      'error',
      [
        {
          name: 'Link',
          props: ['to']
        },
        {
          name: 'NavLink',
          props: ['to']
        }
      ]
    ],
    'react/jsx-no-target-blank': [
      'error',
      {
        allowReferrer: false,
        enforceDynamicLinks: 'always',
        warnOnSpreadAttributes: true,
        links: true,
        forms: true
      }
    ],
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowLeadingUnderscore: false,
        allowNamespace: false,
        ignore: []
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'ignore',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        locale: 'auto'
      }
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }
    ],
    'react/jsx-uses-react': 'off', // disabled for JSX transform from React 17
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        'return': 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],
    'jsx-quotes': ['error', 'prefer-double'],


    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      { additionalHooks: 'useAsyncEffect' }
    ],


    // js
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: true
      }
    ],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoreComments: false
      }
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ],
    'new-parens': ['error', 'always'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-multi-assign': 'error',
    'one-var': ['error', 'never'],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    semi: ['error', 'never'],
    'no-unexpected-multiline': 'error',
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-infix-ops': ['error', { int32Hint: false }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-const-assign': 'error',
    'no-var': 'error',
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always'],
    'quote-props': ['error', 'as-needed', { keywords: true }],
    'no-prototype-builtins': 'error',
    'no-array-constructor': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-eval': ['error', { allowIndirect: false }],
    'no-useless-escape': 'error',
    'no-new-func': 'error',
    'wrap-iife': ['error', 'outside'],
    'prefer-rest-params': 'error',
    'no-loop-func': 'error',
    'prefer-spread': 'error',
    'function-paren-newline': ['error', 'consistent'],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'no-iterator': 'warn',
    'no-undef': ['error', { 'typeof': true }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    eqeqeq: ['error', 'always'],
    'no-with': 'error',
    'object-curly-spacing': ['error', 'always'],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'iife' },
      { blankLine: 'always', prev: 'iife', next: '*' }
    ],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'default-param-last': 'error',
    'operator-linebreak': ['error', 'before'],
    'no-extra-parens': [
      'error',
      'all',
      {
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false
      }
    ],
    'no-extra-semi': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'operator-linebreak': [
      'error',
      'before',
      { overrides: { '=': 'none' } }
    ],
    'no-whitespace-before-property': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'no-implied-eval': 'error',
    'no-loss-of-precision': 'error',
    'no-return-await': 'error',


    // eslint-plugin-import
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/newline-after-import': ['error', { count: 2 }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never' }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '/src/**',
            group: 'internal'
          }
        ],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        warnOnUnassignedImports: false
      }
    ],
    'import/named': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-duplicates': ['error', { 'considerQueryString': true }]
  }
}
