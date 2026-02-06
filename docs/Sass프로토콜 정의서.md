문제 1
``` bash
Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

More info and automated migrator: https://sass-lang.com/d/import

  ╷
2 │ @import './variables';
  │         ^^^^^^^^^^^^^
  ╵
    D:\robot-control-system\frontend-vue\src\assets\styles\main.scss 2:9  root stylesheet
```
문제1 해결방안 
최신 Sass 프로토콜에 맞춰 @import 대신 @use를 사용하도록 수정하면 에러를 해결할 수 있습니다.
@use를 사용하면 변수나 믹스인을 별도의 네임스페이스로 관리하게 됩니다.

as *를 붙여주면 이전처럼 variables.scss 내부의 변수들을 네임스페이스 없이 직접 사용할 수 있습니다.
```scss
// 수정 전
// @import './variables';

// 수정 후
@use './variables' as *;
```