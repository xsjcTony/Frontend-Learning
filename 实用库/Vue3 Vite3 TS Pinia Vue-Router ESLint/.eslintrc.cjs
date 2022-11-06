module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
    'vue/setup-compiler-macros': true
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    },
    vueFeatures: {
      filter: false,
      interpolationAsNonHTML: true,
      styleCSSVariableInjection: true
    },
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.eslint.json', './tsconfig.node.json', './tsconfig.tailwindcss.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue',
    'import',
    '@typescript-eslint',
    'vuejs-accessibility'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    },
    {
      files: ['main.ts'],
      rules: {
        'import/orders': 'off'
      }
    }
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',


    // vue3
    'vue/block-lang': [
      'error',
      {
        script: { lang: 'ts', allowNoLang: true },
        style: { lang: 'scss', allowNoLang: true }
      }
    ],
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'consistent',
        multiline: 'consistent',
        maxEmptyLines: 0,
        blocks: {
          template: {
            singleline: 'always',
            multiline: 'always'
          },
          script: {
            singleline: 'always',
            multiline: 'always'
          },
          style: {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 1
          }
        }
      }
    ],
    'vue/component-api-style': [
      'error',
      ['script-setup', 'composition']
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/html-button-has-type': ['error', {
      button: true,
      submit: true,
      reset: true
    }],
    'vue/html-comment-content-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/html-comment-indent': ['error', 4],
    'vue/new-line-between-multi-line-property': ['error', { minLineOfMultilineProperty: 2 }],
    'vue/next-tick-style': ['error', 'promise'],
    'vue/no-boolean-default': ['error', 'no-default'],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-reserved-component-names': [
      'error',
      {
        disallowVueBuiltInComponents: true,
        disallowVue3BuiltInComponents: true
      }
    ],
    'vue/no-template-target-blank': [
      'error',
      {
        allowReferrer: true,
        enforceDynamicLinks: 'always'
      }
    ],
    'vue/no-undef-components': [
      'error',
      {
        ignorePatterns: [
          /^router-/,
          /^el/
        ]
      }
    ],
    'vue/no-undef-properties': ['error', { ignores: ['/^\\$/'] }],
    'vue/no-unused-properties': ['error', {
      groups: ['props'],
      deepData: false,
      ignorePublicMembers: false
    }],
    'vue/no-unused-refs': 'error',
    'vue/no-use-computed-property-like-method': 'error',
    'vue/no-useless-mustaches': [
      'error',
      {
        ignoreIncludesComment: true,
        ignoreStringEscape: false
      }
    ],
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: false,
        ignoreStringEscape: false
      }
    ],
    'vue/no-v-text': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-import-from-vue': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': ['error', 'always'],
    'vue/require-direct-export': ['error', { disallowFunctionalComponentFunction: false }],
    'vue/require-emit-validator': 'error',
    'vue/require-expose': 'error',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: []
      }
    ],
    'vue/static-class-names-order': 'off', // For tailwind css
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-on-function-call': ['error', 'never', { ignoreIncludesComment: false }],

    // vue default rules overwrite
    'vue/no-setup-props-destructure': 'off', // For reactivity transform
    'vue/multi-word-component-names': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-indent': [
      'error',
      4,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
    'vue/max-attributes-per-line': [
      'error', {
        singleline: {
          max: 3
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        allowEmptyLines: true,
        ignores: []
      }
    ],
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multi-spaces': ['error', { ignoreProperties: false }],
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-template-shadow': 'error',
    'vue/singleline-html-element-content-newline': 'off',

    // vue extension rules (for expression in <template>)
    'vue/arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'vue/block-spacing': ['error', 'always'],
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'vue/camelcase': [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false
      }
    ],
    'vue/comma-dangle': ['error', 'never'],
    'vue/comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'vue/comma-style': ['error', 'last'],
    'vue/eqeqeq': ['error', 'always'],
    'vue/func-call-spacing': ['error', 'never'],
    'vue/key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    'vue/keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'vue/no-extra-parens': 'error',
    'vue/no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: false,
        skipTemplates: false,
        skipHTMLAttributeValues: false,
        skipHTMLTextContents: false
      }
    ],
    'vue/no-loss-of-precision': 'error',
    'vue/no-restricted-syntax': 'error',
    'vue/no-sparse-arrays': 'error',
    'vue/no-useless-concat': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-shorthand': ['error', 'always'],
    'vue/prefer-template': 'error',
    'vue/quote-props': ['error', 'as-needed', { keywords: true }],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
    'vue/template-curly-spacing': ['error', 'never'],
    'vue/operator-linebreak': ['error', 'before'],


    // js
    'block-spacing': ['error', 'always'],
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false
      }
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
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
    'no-unexpected-multiline': 'error',
    'space-before-blocks': ['error', 'always'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-const-assign': 'error',
    'no-var': 'error',
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always'],
    'quote-props': ['error', 'as-needed', { keywords: true }],
    'no-prototype-builtins': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-eval': ['error', { allowIndirect: false }],
    'no-useless-escape': 'error',
    'no-new-func': 'error',
    'wrap-iife': ['error', 'outside'],
    'prefer-spread': 'error',
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
    'no-iterator': 'warn',
    eqeqeq: ['error', 'always'],
    'no-with': 'error',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'operator-linebreak': ['error', 'before'],


    // eslint-plugin-import
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/newline-after-import': ['error', { count: 2 }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
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


    // TypeScript
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        'default': 'array',
        readonly: 'array'
      }
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 2
      }
    ],
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string'
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean'
          },
          Number: {
            message: 'Use number instead',
            fixWith: 'number'
          },
          Symbol: {
            message: 'Use symbol instead',
            fixWith: 'symbol'
          },

          Function: {
            message: [
              'The `Function` type accepts any function-like value.',
              'It provides no type safety when calling the function, which can be a common source of bugs.',
              'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
              'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.'
            ].join('\n')
          },

          // object typing
          Object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.'
            ].join('\n')
          }
        },
        extendDefaults: false
      }
    ],
    '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowedNames: []
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    '@typescript-eslint/keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
        exceptAfterOverload: true
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        multilineDetection: 'brackets'
      }
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: false,
        ignoreVoidOperator: true
      }
    ],
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['decoratedFunctions'] }],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-parens': ['error', 'all', { ignoreJSX: 'multi-line' }],
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
        ignoreIIFE: false
      }
    ],
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false
      }
    ],
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      {
        allowInGenericTypeArguments: true,
        allowAsThisParameter: true
      }
    ],
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksVoidReturn: false
      }
    ],
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: false,
        allowDefinitionFiles: false
      }
    ],
    // '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    // '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: []
      }
    ],
    '@typescript-eslint/no-throw-literal': [
      'error',
      {
        allowThrowingAny: false,
        allowThrowingUnknown: false
      }
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
      'error',
      {
        allowComparingNullableBooleansToTrue: false,
        allowComparingNullableBooleansToFalse: false
      }
    ],
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      {
        allowConstantLoopConditions: true,
        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
      }
    ],
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'iife' },
      { blankLine: 'always', prev: 'iife', next: '*' },
      { blankLine: 'always', prev: '*', next: 'interface' },
      { blankLine: 'always', prev: 'interface', next: '*' },
      { blankLine: 'always', prev: '*', next: 'type' },
      { blankLine: 'always', prev: 'type', next: '*' }
    ],
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true
      }
    ],
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        allowedPromiseNames: [],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: false }],
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      {
        checkCompoundAssignments: true,
        allowAny: false
      }
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: false,
        allowAny: false,
        allowNullish: true,
        allowRegExp: false
      }
    ],
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/sort-type-union-intersection-members': [
      'error',
      {
        checkIntersections: true,
        checkUnions: true,
        groupOrder: [
          'named',
          'keyword',
          'operator',
          'literal',
          'function',
          'import',
          'conditional',
          'object',
          'tuple',
          'intersection',
          'union',
          'nullish'
        ]
      }
    ],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'never',
        lib: 'never'
      }
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ],
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true
      }
    ],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/default-param-last': 'error'
  }
}
