'use client';

import BackButton from '@/components/backButton';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const userRegister = async () => {
        try {
            const user = await api.post('/user', {
                email,
                password,
                nickname,
            });
            if (user.status === 201) {
                alert('회원가입 되었습니다.');
                router.push('/login');
            } else {
                alert('회원가입 실패!');
            }
        } catch (err) {
            alert(`회원가입 실패!\n${err}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">회원가입</h1>
            <input
                className="w-64 border p-2 mb-2"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-64 border p-2 mb-2"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                className="w-64 border p-2 mb-4"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={userRegister} className="bg-blue-600 text-white px-4 py-2 rounded w-64">
                회원가입
            </button>
            <BackButton />
        </div>
    );
}
