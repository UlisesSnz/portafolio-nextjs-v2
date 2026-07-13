'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SanityLive } from './live';

const CHANNEL_NAME = 'sanity-live-refresh';
const STORAGE_KEY = 'sanity-live-refresh';

let tabId;

function getTabId() {
    if (!tabId) {
        tabId = crypto.randomUUID();
    }

    return tabId;
}

async function refreshPublishedTabs() {
    const message = {
        source: getTabId(),
        timestamp: Date.now(),
    };

    if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.postMessage(message);
        channel.close();
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
    }

    return 'refresh';
}

export function ProductionSanityLive() {
    const router = useRouter();

    useEffect(() => {
        const refresh = (source) => {
            if (source === getTabId()) {
                return;
            }

            startTransition(() => router.refresh());
        };

        const handleStorage = (event) => {
            if (event.key !== STORAGE_KEY || !event.newValue) {
                return;
            }

            try {
                refresh(JSON.parse(event.newValue).source);
            } catch {
                refresh();
            }
        };

        let channel;

        if ('BroadcastChannel' in window) {
            channel = new BroadcastChannel(CHANNEL_NAME);
            channel.addEventListener('message', (event) => refresh(event.data?.source));
        } else {
            window.addEventListener('storage', handleStorage);
        }

        return () => {
            channel?.close();
            window.removeEventListener('storage', handleStorage);
        };
    }, [router]);

    return (
        <SanityLive
            includeDrafts={false}
            waitFor="function"
            action={refreshPublishedTabs}
        />
    );
}
