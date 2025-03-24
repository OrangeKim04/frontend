module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier', // prettier와의 충돌을 방지하는 설정
   ],
   plugins: ['prettier'],
   rules: {
      'prettier/prettier': 'error',
   },
   settings: {
      react: {
         version: 'detect',
      },
   },
};
