"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, Facebook, Linkedin, Share, X } from "@/components/Shared/Icons";
import { toast } from "sonner";

const SharePostLinks = ({ title, shareUrl, triggerClassName = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousBodyOverflow = document.body.style.overflow;
        const previousBodyPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.paddingRight = previousBodyPaddingRight;
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    if (!shareUrl) {
        return null;
    }

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            Icon: Linkedin,
        },
        {
            name: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            Icon: Facebook,
        },
        {
            name: "X",
            href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            Icon: X,
        },
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Enlace copiado");
        } catch {
            toast.error("No se pudo copiar el enlace");
        }
    };

    const modalContainer = typeof window !== "undefined" ? document.getElementById("modal") : null;

    const modal = (
        <div
            className="fixed inset-0 z-[120] bg-dark/55 backdrop-blur-[3px]"
            onClick={() => setIsOpen(false)}
        >
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Compartir publicación"
                    className="relative w-full max-w-xl rounded-2xl border border-dark/10 bg-light px-6 py-6 text-dark shadow-2xl dark:border-light/20 dark:bg-dark dark:text-light sm:px-4"
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 text-xl leading-none text-dark/60 transition-colors hover:text-dark dark:text-light/60 dark:hover:text-light"
                        aria-label="Cerrar ventana de compartir"
                    >
                        ×
                    </button>

                    <h3 className="text-center text-2xl font-bold sm:text-xl">Compartir</h3>

                    <div className="mt-6 flex justify-between w-full items-center gap-2 rounded-lg bg-dark/[0.04] p-2 dark:bg-light/[0.08] sm:flex-col sm:items-stretch">
                        <p className="truncate px-2 text-sm sm:text-xs">{shareUrl}</p>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-dark px-3 py-2 text-sm font-semibold text-light transition-colors hover:bg-dark/85 dark:bg-light dark:text-dark dark:hover:bg-light/90"
                        >
                            <Copy className="h-4 w-4" />
                            Copiar
                        </button>
                    </div>

                    <div className="mt-6">
                        <p className="mb-3 text-center text-sm text-dark/70 dark:text-light/70">Compartir en redes sociales</p>
                        <div className="flex items-center justify-center gap-5">
                            {shareLinks.map(({ name, href, Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Compartir en ${name}`}
                                    className="inline-flex items-center justify-center p-1 text-dark dark:text-light"
                                >
                                    <Icon className="h-8 w-8" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`inline-flex items-center font-medium text-dark/75 dark:text-light/75 underline underline-offset-2 sm:text-sm ${triggerClassName}`}
            >
                <Share className="mr-1 h-auto !w-5 md:!w-4" />
                Compartir
            </button>
            {isOpen && modalContainer ? createPortal(modal, modalContainer) : null}
        </>
    );
};

export default SharePostLinks;
