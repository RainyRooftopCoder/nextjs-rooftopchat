'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="bg-blue-600 text-white py-2 my-2 rounded w-64">
            뒤로가기
        </button>
    );
}
