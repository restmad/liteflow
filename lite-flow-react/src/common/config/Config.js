/**
 * 根据同环境获取不同的配置参数
 */
const devConf = {
    name: 'LiteFlow',
    prefix: '',
    assertPrefix: ''
};
const proConf = {
    name: 'LiteFlow',
    prefix: '',
    assertPrefix: '/static/dist/'
};

let envConf = process.env.NODE_ENV == "development" ? devConf : proConf;

module.exports = {
    ...envConf,
    footerText: '版权所有 © 2019 ',
    logoSrc: 'logo/loginLogo.png',
    dashBoardLogo: 'logo/logo.png',
    logoText: 'LiteFlow',
    needLogin: true
}
