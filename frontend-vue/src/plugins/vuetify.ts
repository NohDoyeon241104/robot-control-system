import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2196F3',
          secondary: '#FF9800',
          success: '#4CAF50',
          error: '#F44336',
          warning: '#FF9800',
          info: '#2196F3',
          background: '#F5F5F5'
        }
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#FF9800',
          success: '#4CAF50',
          error: '#F44336',
          warning: '#FF9800',
          info: '#2196F3',
          background: '#1E1E1E'
        }
      }
    }
  }
})

// # 모든 필요한 패키지 설치
// npm install vue vue-router pinia axios vuetify @mdi/font
// npm install chart.js vue-chartjs
// npm install @stomp/stompjs sockjs-client
// npm install konva vue-konva
// npm install dayjs lodash-es

// # 개발 의존성
// npm install -D @types/node @types/lodash-es @types/sockjs-client
// npm install -D @vitejs/plugin-vue vite-plugin-vuetify
// npm install -D typescript vue-tsc sass
// npm install -D eslint eslint-plugin-vue prettier
// npm install -D @vue/eslint-config-typescript @vue/eslint-config-prettier