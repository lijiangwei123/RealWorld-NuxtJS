/**
 * Nuxt配置文件
 */

module.exports = {
    router: {
        linkActiveClass: 'active',
        // 自定义路由规则表
        extendRoutes(routes, resolve) {
            routes.splice(0)  // 清除Nuxt.js基于pages目录默认生成的路由配置表
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            name: 'home',
                            path: '', // 默认子路由
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            name: 'login',
                            path: '/login', 
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            name: 'register',
                            path: '/register', 
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            name: 'profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            name: 'settings',
                            path: '/settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            name: 'editor',
                            path: '/editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            name: 'article',
                            path: '/article/:slug',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                },
            ])
        }
    },

    server: {
        // host: '0.0.0.0',  // 支持外网访问
        port: 3000
    },

    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js',
    ]
}