// 为了防止在服务单渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必把 state 第一成为一个函数，返回数据对象
const cookieparser = process.server ? require('cookieparser') : undefined;
export const state = () => { 
    return {
        // 当前登录用户的登录状态
        user: null
    }
}

export const mutations = {
    setUser(state, payload) { 
        state.user = payload;
    }
}

export const actions = {
    // 是一个特殊的action的方法
    // 这个action会在服务端渲染期间自动调用
    // 主要作用是用来初始化容器数据，传递数据给客户端使用
    nuxtServerInit({ commit }, { req }) {  // req 服务端渲染的请求对象
        let auth = null; 
        // 如果请求头中有Cookie
        if (req.headers.cookie) { 
            // 使用cookieparser把cookie字符串转换为js对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try { 
                auth = JSON.parse(parsed.user);
            } catch { 
                // No valid cookie found
            }
        };
        commit('setUser', auth)
     }
}