export default {
  failFast: true,
  verbose: true,
  require: ['ts-node/register', 'tsconfig-paths/register.js'],
  files: ['test/**/*.spec.ts'],
  typescript: {
    rewritePaths: {
      'src/': 'dist/',
    },
    compile: false,
  },
}
