'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const login = async () => {
        try {
            console.log('axios to:', process.env.NEXT_PUBLIC_API_URL + '/auth/login');

            const res = await api.post('/auth/login', { email, password });

            if (res.status === 201) {
                localStorage.setItem('accessToken', res.data.accessToken);
                router.push('/main');
            } else {
                return alert('로그인 실패');
            }

            // router.push('/main');
        } catch (err) {
            alert(`로그인 실패 \n${err}`);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">로그인</h1>
            <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-4 py-2 mb-2 rounded w-64"
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-4 py-2 mb-4 rounded w-64"
            />
            <button onClick={login} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-64">
                로그인
            </button>
            <button onClick={() => (window.location.href = '/register')} className="text-blue-500 py-2 hover:underline">
                회원가입
            </button>
        </main>
    );
}
