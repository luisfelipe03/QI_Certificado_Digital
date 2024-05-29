'use client';

import { useAuth } from '@/resources';
import { useRouter } from 'next/navigation'

export default function Page() {
    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();

    if (!user) {
        router.push('/login');
    }

    return router.push('/certificados');
}