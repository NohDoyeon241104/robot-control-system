// import { defineConfig, globalIgnores } from 'eslint/config'
// import globals from 'globals'
// import js from '@eslint/js'
// import pluginVue from 'eslint-plugin-vue'
// import pluginOxlint from 'eslint-plugin-oxlint'

// export default defineConfig([
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{vue,js,mjs,jsx}'],
//   },

//   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//       },
//     },
//   },

//   js.configs.recommended,
//   ...pluginVue.configs['flat/essential'],

//   ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
// ])


import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import tseslint from 'typescript-eslint' // 1. TS 설정을 위해 추가

export default defineConfig([
  {
    name: 'app/files-to-lint',
    // 2. 확장자에 ts를 추가해야 RobotCard.vue의 TS 문법을 인식합니다.
    files: ['**/*.{vue,js,mjs,jsx,ts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      // 3. Vue 안의 TS를 파싱하기 위한 설정
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...tseslint.configs.recommended, // 4. TypeScript 추천 설정 추가

  {
    // 5. 컴포넌트 이름 규칙 및 추가 규칙 설정
    rules: {
      'vue/multi-word-component-names': 'off', // Dashboard, Login 허용
      '@typescript-eslint/no-explicit-any': 'off', // 로봇 데이터 다룰 때 any 허용 (선택 사항)
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
])