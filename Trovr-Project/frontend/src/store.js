import { LogOut } from 'lucide-react';
import { create } from 'zustand'

const useStore =create(()=>({
    user: null,
    token: localStorage.getItem("token") ||null,

    setUser: (user) => setInterval({ user }),
    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    
    },
}))

export default useStore