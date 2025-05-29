'use client';

import api from '@/lib/axios';
import { useEffect, useState } from 'react';

type User = {
    email: string;
    nickname: string;
};

type Room = {
    id: string;
    name: string;
};

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken: string | null = localStorage.getItem('accessToken');

                if (accessToken) {
                    const res = await api.get('/auth/checkUser');
                    setUser(res.data);
                } else {
                    alert('로그인 후 이용가능합니다.');
                    window.location.href = '/login';
                }
            } catch (err) {
                alert('로그인 후 이용가능합니다.');
                window.location.href = '/login';
            }
        };

        fetchUser();
    }, []);
}
