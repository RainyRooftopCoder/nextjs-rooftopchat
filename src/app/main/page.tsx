'use client';

import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
    email: string;
    nickname: string;
};

type Message = {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
};

export default function MainPage() {
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessage] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/checkUser');
                setUser(res.data);
            } catch (err) {
                router.push('/login');
            }
        };

        fetchUser();

        setMessage([
            { id: 1, sender: 'admin', content: '환영합니다.', timestamp: '09:00' },
            { id: 2, sender: 'tester', content: '안녕하세요.', timestamp: '09:01' },
        ]);
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMsg = {
            id: Date.now(),
            sender: user?.nickname || 'me',
            content: input,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessage((prev) => [...prev, newMsg]);
        setInput('');
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-xl font-semibold mb-4">🙌 안녕하세요, {user?.nickname}님! 공용 채팅방입니다.</h1>

            <div className="w-full max-w-xl border rounded p-4 h-[500px] flex flex-col bg-white">
                <div className="flex-1 overflow-y-auto mb-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2">
                            <span className="font-bold text-blue-600">{msg.sender}</span>: {msg.content}
                            <span className="text-sm text-gray-400 ml-2">{msg.timestamp}</span>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 border px-4 py-2 rounded"
                        placeholder="메시지를 입력하세요"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        보내기
                    </button>
                </div>
            </div>
        </main>
    );
}
