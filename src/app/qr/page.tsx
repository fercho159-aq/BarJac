"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function QRPage() {
  const [qrUrl, setQrUrl] = useState("");
  const [linksUrl, setLinksUrl] = useState("");

  useEffect(() => {
    const base = window.location.origin;
    const target = `${base}/links`;
    setLinksUrl(target);
    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(target)}&bgcolor=FAF7F2&color=2A3A1A&margin=20`
    );
  }, []);

  return (
    <div className="min-h-[100svh] bg-[hsl(var(--cream))] flex flex-col items-center justify-center p-6 print:p-0">
      {/* Printable QR Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:max-w-none print:w-[400px] mx-auto">
        {/* Top bar */}
        <div className="bg-[#3D4F27] px-6 py-8 flex flex-col items-center text-white">
          <Image
            src="/images/Imagen de WhatsApp 2025-11-25 a las 10.21.55_ff8ad4cb.jpg"
            alt="BarJac Logo"
            width={72}
            height={72}
            className="rounded-full border-3 border-white/40 shadow-lg"
          />
          <h1 className="font-display text-3xl font-bold mt-3">BARJAC</h1>
          <p className="text-white/70 text-sm mt-1">Música, amigos y el mejor ambiente</p>
        </div>

        {/* QR Section */}
        <div className="px-6 py-8 flex flex-col items-center">
          <h2 className="text-[#2A3A1A] font-display text-2xl font-bold mb-2 text-center">ESCANÉAME</h2>
          <p className="text-[#6B7B5C] text-sm mb-6 text-center">
            Menú · WhatsApp · Redes Sociales · Ubicación
          </p>

          {qrUrl ? (
            <div className="bg-[#FAF7F2] p-4 rounded-2xl shadow-inner">
              <img
                src={qrUrl}
                alt="QR Code - BarJac Links"
                width={280}
                height={280}
                className="rounded-xl"
              />
            </div>
          ) : (
            <div className="w-[280px] h-[280px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
              <p className="text-gray-400 text-sm">Generando QR...</p>
            </div>
          )}

          {/* Icon row */}
          <div className="flex items-center justify-center gap-4 mt-6 text-[#3D4F27]">
            <div className="flex flex-col items-center gap-1">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span className="text-[10px] font-semibold">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              <span className="text-[10px] font-semibold">TikTok</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.378-2.143l-.446-.35-3.155 1.058 1.058-3.155-.35-.446A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              <span className="text-[10px] font-semibold">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C7.27 0 3.43 3.84 3.43 8.57c0 6.43 8.57 15.43 8.57 15.43s8.57-9 8.57-15.43C20.57 3.84 16.73 0 12 0zm0 12.86a4.29 4.29 0 110-8.58 4.29 4.29 0 010 8.58z"/></svg>
              <span className="text-[10px] font-semibold">Maps</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 2h18a1 1 0 011 1v18a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v16h16V4H4zm6.5 4a1 1 0 011 1v2h2a1 1 0 010 2h-2v2a1 1 0 01-2 0v-2h-2a1 1 0 010-2h2V9a1 1 0 011-1z"/></svg>
              <span className="text-[10px] font-semibold">Menú</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#3D4F27] px-6 py-4 text-center">
          <p className="text-white/80 text-xs">Álvaro Obregón 234, Roma Norte, CDMX</p>
          <p className="text-white/60 text-[10px] mt-1">barjac.web.app/links</p>
        </div>
      </div>

      {/* Print button - hidden when printing */}
      <div className="mt-8 flex gap-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-[#3D4F27] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2A3A1A] transition-colors shadow-lg"
        >
          Imprimir QR
        </button>
        {linksUrl && (
          <a
            href={linksUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#3D4F27] text-[#3D4F27] px-8 py-3 rounded-full font-semibold hover:bg-[#3D4F27] hover:text-white transition-colors"
          >
            Ver página de enlaces
          </a>
        )}
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; }
          @page { margin: 1cm; size: auto; }
        }
      `}</style>
    </div>
  );
}
