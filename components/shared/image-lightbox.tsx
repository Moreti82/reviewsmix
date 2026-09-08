"use client";

import { useState, useCallback } from "react";
import { ZoomIn } from "lucide-react";

type ImageLightboxProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback(() => setOpen(true), []);
  const closeLightbox = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Trigger wrapper */}
      <div
        className="relative cursor-zoom-in group/lb h-full w-full flex flex-col"
        onMouseEnter={openLightbox}
        onMouseLeave={closeLightbox}
      >
        {children}
        {/* Hover overlay hint */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 opacity-0 transition-all duration-300 group-hover/lb:bg-black/15 group-hover/lb:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-sm border border-slate-100">
            <ZoomIn className="size-4 text-indigo-600" />
            Ver imagem completa
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          style={{ animation: "fadeIn 0.15s ease-out" }}
        >
          {/* Full image */}
          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            style={{ animation: "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="block max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl border-2 border-white/10"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}

