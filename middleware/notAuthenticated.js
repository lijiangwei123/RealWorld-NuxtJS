/**
 * 已存在用户信息的话不需要重新登录*/ 
export default function ({ store, redirect }) {
    if (store.state.user) { 
        return redirect('/');
    }
}