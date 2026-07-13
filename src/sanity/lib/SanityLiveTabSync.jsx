'use client';

import { startTransition, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CHANNEL_NAME = 'sanity-live-refresh';
const STORAGE_KEY = 'sanity-live-refresh';

let tabId;

function getTabId() {
    if (!tabId) {
        tabId = crypto.randomUUID();
    }

    return tabId;
}

function notifyOtherTabs(message) {
    if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.postMessage(message);
        channel.close();
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
    }
}

export function SanityLiveTabSync({ version }) {
    const router = useRouter();
    const previousVersion = useRef(version);
    const remoteVersion = useRef();

    useEffect(() => {
        if (previousVersion.current === version) {
            return;
        }

        previousVersion.current = version;

        if (remoteVersion.current === version) {
            remoteVersion.current = undefined;
            return;
        }

        notifyOtherTabs({
            source: getTabId(),
            timestamp: Date.now(),
            version,
        });
    }, [version]);

    useEffect(() => {
        const refresh = (message) => {
            if (!message || message.source === getTabId()) {
                return;
            }

            remoteVersion.current = message.version;
            startTransition(() => router.refresh());
        };

        const handleStorage = (event) => {
            if (event.key !== STORAGE_KEY || !event.newValue) {
                return;
            }

            try {
                refresh(JSON.parse(event.newValue));
            } catch {
                refresh({});
            }
        };

        let channel;

        if ('BroadcastChannel' in window) {
            channel = new BroadcastChannel(CHANNEL_NAME);
            channel.addEventListener('message', (event) => refresh(event.data));
        } else {
            window.addEventListener('storage', handleStorage);
        }

        return () => {
            channel?.close();
            window.removeEventListener('storage', handleStorage);
        };
    }, [router]);

    return null;
}
