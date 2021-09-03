// ESLint 代码规范校验工具的配置文件
// 注意：修改该文件必须重启项目才能生效
// 如果配置文件修改后未生效可尝试删除 node_modules 下的 .cache 文件清除缓存后  重启项目
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 自定义代码校验规范
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off' // 关闭定义未使用的规则验证
    // 'semi': 'off' //关闭末尾不能有分号的验证
    // 'semi': ['error', 'always'] //末尾必须有分号的验证

  }
}
// 'key':value    key:规则代号 value:具体的限定方式 具体查看ESLint官方文档
// 'off' or 0 :关闭规则
// 'warn' or 1 :将规则视为一个警告(不会影响退出码)
// 'error' or 2 :将规则视为一个错误(退出码为1)
// process.env.NODE_ENV === 'production' 判定代码运行环境 production 生产环境 development 开发环境
