# Photo Gallery

React + Vite로 구현된 포토 갤러리 웹사이트입니다.

## 기능

- 월별 갤러리 탭 인터페이스
- 이미지 클릭 시 모달로 확대 보기
- 반응형 그리드 레이아웃
- 이미지 로딩 실패 시 대체 이미지 표시

## 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/lovit/natural-wine-pages.git
cd natural-wine-pages
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```
개발 서버가 실행되면 다음 URL에서 웹사이트를 확인할 수 있습니다:
```
http://localhost:5173/natural-wine-pages/
```

## 빌드 및 배포

1. 프로덕션 빌드
```bash
npm run build
```

2. 빌드된 결과물 미리보기
```bash
npm run preview
```

## 이미지 관리

이미지는 `public/images/` 디렉토리 아래에 다음과 같은 구조로 관리됩니다:
```
public/
  images/
    25-04/  # 2025년 4월 갤러리
      250401.png
      250402.png
      250403.png
      ...
    25-05/  # 2025년 5월 갤러리
      250501.png
      250502.png
      250503.png
      ...
```

파일명 규칙:
- YYMMDD.png 형식 (예: 250401.png = 2025년 4월 1일)
- 각 월별 폴더에 해당 월의 이미지들이 저장됨

## 기술 스택

- React
- TypeScript
- Vite
- Chakra UI
- GitHub Pages (배포)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
