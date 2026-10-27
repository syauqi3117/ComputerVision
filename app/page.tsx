"use client";

import React, { useState } from "react";

// --- Types & Data ---
type TabType = "detection" | "segmentation" | "ocr";
type CodeLang = "python" | "javascript" | "curl";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("detection");
  const [activeLang, setActiveLang] = useState<CodeLang>("python");
  const [copiedCode, setCopiedCode] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const codeSnippets: Record<CodeLang, string> = {
    python: `import visionflow as vf

# Inisialisasi client dengan API key
client = vf.Client(api_key="vf_live_xxxxxxxx")

# Analisis gambar dengan model deteksi presisi tinggi
result = client.detect(
    image="https://example.com/sample.jpg",
    model="vision-v3-accurate",
    confidence_threshold=0.85
)

for obj in result.predictions:
    print(f"{obj.label}: {obj.confidence:.2%} di {obj.bbox}")`,
    javascript: `import { VisionClient } from "@visionflow/sdk";

// Inisialisasi client
const client = new VisionClient({ apiKey: process.env.VISIONFLOW_KEY });

// Jalankan inferensi real-time
const response = await client.detect({
  image: "https://example.com/sample.jpg",
  model: "vision-v3-accurate",
  confidenceThreshold: 0.85,
});

console.log("Objek terdeteksi:", response.predictions);`,
    curl: `curl -X POST https://api.visionflow.ai/v1/detect \\
  -H "Authorization: Bearer vf_live_xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/sample.jpg",
    "model": "vision-v3-accurate",
    "threshold": 0.85
  }'`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const faqs = [
    {
      q: "Apakah saya membutuhkan kartu kredit untuk memulai uji coba gratis?",
      a: "Sama sekali tidak. Anda bisa mendaftar akun gratis dalam 30 detik tanpa kartu kredit dan langsung mendapatkan 10.000 kredit API secara cuma-cuma.",
    },
    {
      q: "Berapa lama rata-rata waktu yang dibutuhkan untuk integrasi?",
      a: "Dengan SDK resmi kami untuk Python, Node.js, Go, dan REST API standar, sebagian besar developer berhasil melakukan integrasi penuh dan testing dalam waktu kurang dari 15 menit.",
    },
    {
      q: "Apakah privasi data dan gambar yang kami kirimkan terjamin aman?",
      a: "Ya, 100%. VisionFlow mematuhi standar privasi internasional SOC 2 Type II dan GDPR. Secara default kami menerapkan kebijakan Zero-Retention, artinya gambar Anda hanya diproses di memori RAM selama inferensi dan tidak pernah disimpan atau digunakan untuk melatih model publik tanpa izin eksplisit Anda.",
    },
    {
      q: "Dapatkah VisionFlow dijalankan secara offline (On-Premise / Edge)?",
      a: "Tentu saja. Untuk paket Enterprise, kami menyediakan container Docker berakselerasi TensorRT/ONNX yang dapat di-deploy langsung di server lokal Anda atau perangkat Edge seperti NVIDIA Jetson tanpa koneksi internet.",
    },
    {
      q: "Bagaimana cara menangani lonjakan traffic yang tiba-tiba?",
      a: "Infrastruktur cloud kami beroperasi secara serverless dan auto-scaling multi-region dengan kapasitas hingga ribuan request per detik secara mulus dengan latensi stabil di bawah 25ms.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      {/* ========================================================= */}
      {/* HEADER / NAVIGATION */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg tracking-tight text-slate-900">
                      Vision<span className="text-indigo-600">Flow</span>
                    </span>
                    <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-200">
                      AI
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a
                href="#fitur"
                className="hover:text-indigo-600 transition-colors"
              >
                Fitur
              </a>
              <a
                href="#demo"
                className="hover:text-indigo-600 transition-colors"
              >
                Demo Live
              </a>
              <a
                href="#cara-kerja"
                className="hover:text-indigo-600 transition-colors"
              >
                Cara Kerja
              </a>
              <a
                href="#solusi"
                className="hover:text-indigo-600 transition-colors"
              >
                Solusi
              </a>
              <a
                href="#harga"
                className="hover:text-indigo-600 transition-colors"
              >
                Harga
              </a>
              <a href="#faq" className="hover:text-indigo-600 transition-colors">
                FAQ
              </a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-lg transition-colors"
              >
                Masuk
              </a>
              <a
                href="#mulai"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95"
              >
                <span>Coba Gratis</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Fitur
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Demo Live
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Cara Kerja
            </a>
            <a
              href="#solusi"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Solusi
            </a>
            <a
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Harga
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </a>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="#login"
                className="w-full text-center px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Masuk
              </a>
              <a
                href="#mulai"
                className="w-full text-center px-4 py-2.5 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm"
              >
                Coba Gratis Sekarang
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        {/* Subtle decorative background blur spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-cyan-100/30 to-purple-200/40 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs mb-6 hover:bg-indigo-100 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Versi 3.2 Dirilis</span>
            <span className="text-indigo-400">•</span>
            <span className="text-slate-600 font-normal">
              Inferensi 2x Lebih Cepat &amp; Akurasi 99.8%
            </span>
            <svg
              className="w-3.5 h-3.5 ml-0.5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Kecerdasan Visual Modern untuk{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Aplikasi Skala Nyata
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Deteksi objek real-time, segmentasi citra presisi tinggi, dan OCR
            otomatis melalui satu API yang cepat, andal, dan mudah
            diintegrasikan.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#mulai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-indigo-600/35 transition-all duration-200 active:scale-95"
            >
              <span>Mulai Uji Coba Gratis</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            <a
              href="#cara-kerja"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs"
            >
              <svg
                className="w-4 h-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Dokumentasi API</span>
            </a>
          </div>

          {/* Social Proof Mini */}
          <p className="mt-4 text-xs text-slate-500">
            Tanpa perlu kartu kredit • 10.000 request gratis/bulan • Setup 2
            menit
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                18<span className="text-indigo-600 font-bold">ms</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">
                Rata-rata Latensi
              </div>
            </div>
            <div className="text-center p-2 border-l border-slate-100 md:border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                99.8<span className="text-indigo-600 font-bold">%</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">
                Tingkat Akurasi
              </div>
            </div>
            <div className="text-center p-2 border-t md:border-t-0 md:border-l border-slate-100 md:border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                500M<span className="text-indigo-600 font-bold">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">
                Prediksi / Bulan
              </div>
            </div>
            <div className="text-center p-2 border-t md:border-t-0 border-l border-slate-100 md:border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                99.99<span className="text-indigo-600 font-bold">%</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">
                Uptime SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LOGO CLOUD (TRUSTED BY) */}
      {/* ========================================================= */}
      <section className="py-10 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Dipercaya oleh tim engineering dan inovator industri vision
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-wider">
              <span className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center text-xs font-black">
                N
              </span>
              NEXUSTECH
            </div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-wider">
              <span className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                Δ
              </span>
              ALPHALABS
            </div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-wider">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-black">
                V
              </span>
              VISIONARY
            </div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-wider">
              <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                D
              </span>
              DATACORE
            </div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-700 tracking-wider">
              <span className="w-6 h-6 rounded bg-violet-600 text-white flex items-center justify-center text-xs font-black">
                M
              </span>
              METRIC.IO
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE DEMO / SHOWCASE */}
      {/* ========================================================= */}
      <section id="demo" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Uji Coba Interaktif
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lihat Kemampuan Model Kami Bekerja
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Pilih mode deteksi di bawah ini untuk melihat contoh segmentasi,
              deteksi objek, dan ekstraksi data visual secara instan.
            </p>

            {/* Tab switchers */}
            <div className="mt-8 inline-flex p-1.5 rounded-xl bg-slate-200/80 border border-slate-300">
              <button
                onClick={() => setActiveTab("detection")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "detection"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Deteksi Objek (Bounding Box)
              </button>
              <button
                onClick={() => setActiveTab("segmentation")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "segmentation"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Segmentasi Poligon
              </button>
              <button
                onClick={() => setActiveTab("ocr")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === "ocr"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                OCR &amp; Dokumen
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 text-slate-200">
            {/* Window bar */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs text-slate-400 font-mono">
                  visionflow-live-preview // {activeTab}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live: 14ms
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  FPS: 60
                </span>
              </div>
            </div>

            {/* Interactive Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
              {/* Visual Simulation Canvas */}
              <div className="lg:col-span-7 p-6 relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

                {activeTab === "detection" && (
                  <div className="relative w-full h-80 rounded-xl border border-slate-700/80 bg-slate-800/40 p-4 flex flex-col justify-center items-center">
                    {/* Simulated objects with detection boxes */}
                    <div className="absolute top-10 left-12 p-3 border-2 border-indigo-400/90 rounded-md bg-indigo-500/10 backdrop-blur-xs flex flex-col items-start transition-all hover:scale-105 cursor-pointer">
                      <span className="px-1.5 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded">
                        Vehicle: SUV (98.6%)
                      </span>
                      <div className="mt-2 text-xs text-indigo-200">
                        x: 120, y: 84 | w: 240, h: 140
                      </div>
                    </div>

                    <div className="absolute bottom-12 right-16 p-3 border-2 border-emerald-400/90 rounded-md bg-emerald-500/10 backdrop-blur-xs flex flex-col items-start transition-all hover:scale-105 cursor-pointer">
                      <span className="px-1.5 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded">
                        Pedestrian (97.2%)
                      </span>
                      <div className="mt-2 text-xs text-emerald-200">
                        x: 480, y: 210 | w: 60, h: 160
                      </div>
                    </div>

                    <div className="absolute top-14 right-20 p-2 border-2 border-amber-400/90 rounded-md bg-amber-500/10 backdrop-blur-xs flex flex-col items-start">
                      <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded">
                        Traffic Light: Green (99.1%)
                      </span>
                    </div>

                    <div className="text-center text-slate-400 text-xs mt-auto font-mono">
                      [ Simulated Stream: 1920x1080 @ 60 FPS • Model:
                      YOLO-Vision-X ]
                    </div>
                  </div>
                )}

                {activeTab === "segmentation" && (
                  <div className="relative w-full h-80 rounded-xl border border-slate-700/80 bg-slate-800/40 p-4 flex flex-col justify-center items-center">
                    <div className="relative w-64 h-52 border-2 border-dashed border-cyan-400/70 rounded-2xl p-4 bg-cyan-950/30 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 border-2 border-cyan-400 flex items-center justify-center text-cyan-200 font-mono text-xs">
                        Mask: Defect #04
                      </div>
                      <span className="mt-3 px-2 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[11px] rounded-full">
                        Precision: 99.4% • Area: 3,420 px²
                      </span>
                    </div>
                    <div className="text-center text-slate-400 text-xs mt-auto font-mono">
                      [ Semantic Segmentation: Pixel-level boundary mask
                      detected ]
                    </div>
                  </div>
                )}

                {activeTab === "ocr" && (
                  <div className="relative w-full h-80 rounded-xl border border-slate-700/80 bg-slate-800/40 p-5 flex flex-col justify-between">
                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-700 flex justify-between items-center">
                        <span className="text-slate-400">NIK / ID:</span>
                        <span className="text-emerald-400 font-bold">
                          3271028392100004 [100%]
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-700 flex justify-between items-center">
                        <span className="text-slate-400">Nama Lengkap:</span>
                        <span className="text-indigo-300 font-semibold">
                          ADITYA PRATAMA [99.2%]
                        </span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-700 flex justify-between items-center">
                        <span className="text-slate-400">Total Tagihan:</span>
                        <span className="text-amber-300 font-semibold">
                          IDR 2.450.000 [98.9%]
                        </span>
                      </div>
                    </div>
                    <div className="text-center text-slate-400 text-xs font-mono">
                      [ OCR Engine: Smart Multi-Language Text Parsing &amp; Auto-Deskew ]
                    </div>
                  </div>
                )}

                {/* Footer simulation info */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <span>Backend GPU: NVIDIA H100 Tensor Core</span>
                  <span className="text-emerald-400 font-medium">
                    Status: Siap Produksi
                  </span>
                </div>
              </div>

              {/* JSON / Data Response Inspector */}
              <div className="lg:col-span-5 bg-slate-950 p-5 border-t lg:border-t-0 lg:border-l border-slate-800 font-mono text-xs overflow-x-auto flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                    <span className="text-indigo-400 font-semibold">
                      HTTP/2 200 OK
                    </span>
                    <span>Content-Type: application/json</span>
                  </div>

                  <pre className="text-slate-300 text-[11px] leading-relaxed">
                    {activeTab === "detection" &&
                      JSON.stringify(
                        {
                          status: "success",
                          latency_ms: 14.2,
                          detected_objects_count: 3,
                          predictions: [
                            {
                              label: "vehicle",
                              confidence: 0.986,
                              bbox: [120, 84, 240, 140],
                            },
                            {
                              label: "pedestrian",
                              confidence: 0.972,
                              bbox: [480, 210, 60, 160],
                            },
                            {
                              label: "traffic_light",
                              confidence: 0.991,
                              color: "green",
                            },
                          ],
                        },
                        null,
                        2
                      )}

                    {activeTab === "segmentation" &&
                      JSON.stringify(
                        {
                          status: "success",
                          latency_ms: 21.8,
                          model: "segment-v3-medical",
                          mask: {
                            class: "surface_anomaly",
                            area_pixels: 3420,
                            confidence: 0.994,
                            polygon_points: 64,
                          },
                        },
                        null,
                        2
                      )}

                    {activeTab === "ocr" &&
                      JSON.stringify(
                        {
                          status: "success",
                          latency_ms: 18.5,
                          document_type: "indonesian_ktp",
                          fields: {
                            nik: { value: "3271028392100004", confidence: 1.0 },
                            name: { value: "ADITYA PRATAMA", confidence: 0.992 },
                            amount: { value: 2450000, currency: "IDR" },
                          },
                        },
                        null,
                        2
                      )}
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                  <span>Skema OpenAPI v3.1</span>
                  <a
                    href="#cara-kerja"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Buka Dokumentasi &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURES / KEUNGGULAN UTAMA (BENTO GRID) */}
      {/* ========================================================= */}
      <section id="fitur" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Keunggulan Unggulan
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dirancang untuk Performa, Skalabilitas, &amp; Kemudahan
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Semua infrastruktur komputasi visual yang Anda butuhkan untuk
              membangun produk AI masa depan tanpa ribet kelola server GPU
              sendiri.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Inferensi Ultra-Cepat
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pemrosesan gambar dengan latensi di bawah 20ms berkat arsitektur
                GPU cluster terdistribusi di kawasan Asia Pasifik dan global.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Keamanan &amp; Kepatuhan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kebijakan Zero-Retention tanpa penyimpanan data visual tanpa izin.
                Sertifikasi SOC 2 Type II, enkripsi end-to-end TLS 1.3, dan siap
                audit.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                SDK Developer Friendly
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dukungan resmi untuk Python, Node.js, Go, Flutter, Swift, serta
                REST API dan WebSocket streaming untuk kamera CCTV real-time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Edge &amp; Offline Deployment
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ekspor model terlatih ke format ONNX, TensorRT, atau CoreML untuk
                dijalankan langsung di drone, robot, kamera industri, maupun
                perangkat IoT.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Fine-Tuning Dataset Anda
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Latih ulang model dengan dataset produk spesifik perusahaan Anda
                menggunakan dashboard anotasi visual no-code kami.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-600/10 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Observability &amp; Analytics
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pantau metrik penggunaan, grafik latensi p99, throughput per
                detik, dan error tracking secara transparan melalui dashboard
                lengkap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW IT WORKS (CARA KERJA DENGAN CODE SNIPPET) */}
      {/* ========================================================= */}
      <section id="cara-kerja" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 3 Steps */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
                  Cara Kerja
                </h2>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Integrasi Sederhana dalam 3 Langkah
                </p>
                <p className="mt-3 text-slate-600 text-base leading-relaxed">
                  Tidak perlu konfigurasi server rumit atau manajemen driver
                  CUDA. Mulai kirim request dan dapatkan hasil dalam hitungan
                  milidetik.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Pasang SDK &amp; Dapatkan API Key
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Install paket resmi untuk bahasa pemrograman favorit Anda
                      hanya dengan 1 perintah package manager.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Kirim Gambar atau Stream Video
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Kirim URL gambar, base64 payload, buffer file lokal, atau
                      koneksikan stream RTSP kamera.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Dapatkan Respon JSON Terstruktur
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Terima koordinat objek, label probabilitas, segmentasi mask,
                      atau teks yang siap diolah logika aplikasi Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Code Snippet Card */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
              {/* Header with language tabs and copy button */}
              <div className="px-5 py-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveLang("python")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeLang === "python"
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveLang("javascript")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeLang === "javascript"
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Node.js
                  </button>
                  <button
                    onClick={() => setActiveLang("curl")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeLang === "curl"
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    cURL
                  </button>
                </div>

                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-emerald-400 font-mono">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-mono">Salin Kode</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
                <pre>{codeSnippets[activeLang]}</pre>
              </div>

              {/* Bottom footer */}
              <div className="px-5 py-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>pip install visionflow</span>
                <span className="text-slate-500">v3.2.1 • Latency: ~18ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* USE CASES / SOLUSI INDUSTRI */}
      {/* ========================================================= */}
      <section id="solusi" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Solusi Industri
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mendorong Inovasi di Berbagai Sektor
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Dari lini pabrik manufaktur hingga aplikasi mobile konsumen,
              VisionFlow mendukung berbagai skenario kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Solution 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Manufaktur &amp; QC
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspeksi otomatis kecacatan produk mikroskopis pada ban berjalan
                dengan akurasi hingga 99.9%.
              </p>
            </div>

            {/* Solution 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Smart Retail &amp; Kasir
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pelacakan stok rak otomatis dan checkout tanpa kasir dengan
                pengenalan barcode &amp; produk instan.
              </p>
            </div>

            {/* Solution 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Transportasi Pintar
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Penghitungan kepadatan arus lalu lintas, deteksi plat nomor
                (ALPR), dan peringatan keselamatan berkendara.
              </p>
            </div>

            {/* Solution 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Fintech &amp; Verifikasi ID
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ekstraksi data otomatis KTP, SIM, paspor, serta liveness
                detection untuk proses e-KYC cepat tanpa fraud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PRICING SECTION (PAKET HARGA) */}
      {/* ========================================================= */}
      <section id="harga" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Paket Harga
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Harga Transparan, Skalabel Sesuai Kebutuhan
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Mulai gratis hari ini. Tingkatkan paket kapan saja saat skala
              aplikasi Anda bertumbuh.
            </p>

            {/* Billing cycle switcher */}
            <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-white border border-slate-300 shadow-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
                  billingCycle === "yearly"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Tahunan</span>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded">
                  Hemat 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    Hobi / Prototipe
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Sempurna untuk eksplorasi awal, testing API, dan proyek kecil.
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    Rp 0
                  </span>
                  <span className="text-slate-500 text-sm ml-2">/ selamanya</span>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3.5 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>10.000 Prediksi API / bulan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Model Deteksi Objek &amp; OCR Dasar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Latensi standar (~45ms)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Dukungan Komunitas Discord</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#mulai"
                  className="w-full inline-flex justify-center items-center py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Mulai Gratis Sekarang
                </a>
              </div>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="relative p-8 rounded-2xl bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-500/10 flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                Paling Diminati
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                    Startup &amp; Tim
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Untuk produk digital dan aplikasi komersial dengan performa
                  tinggi.
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {billingCycle === "yearly" ? "Rp 399rb" : "Rp 499rb"}
                  </span>
                  <span className="text-slate-500 text-sm ml-2">/ bulan</span>
                  {billingCycle === "yearly" && (
                    <div className="text-xs text-indigo-600 font-semibold mt-1">
                      Ditagih tahunan (Hemat Rp 1.200.000/th)
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3.5 text-sm text-slate-700 font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>500.000 Prediksi API / bulan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Akses semua model v3 &amp; Segmentasi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Latensi Prioritas (&lt;18ms)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-indigo-600 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Support Email &amp; Chat Prioritas</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#mulai"
                  className="w-full inline-flex justify-center items-center py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                >
                  Pilih Paket Pro
                </a>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    Kustom &amp; Skala Besar
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Untuk perusahaan dengan kebutuhan volume tinggi, On-Premise,
                  atau SLA 99.99%.
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    Kustom
                  </span>
                  <span className="text-slate-500 text-sm ml-2">/ kuotasi</span>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3.5 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Request tak terbatas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>On-Premise / Edge Container offline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Dedicated Cluster GPU H100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Dedicated Account Manager &amp; SLA 99.99%</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="#kontak"
                  className="w-full inline-flex justify-center items-center py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Hubungi Tim Penjualan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Ulasan Pengguna
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kata Mereka yang Telah Menggunakan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;Akurasi deteksi plat nomor dan jenis kendaraan VisionFlow
                  sangat stabil bahkan dalam kondisi malam hari dan hujan lebat.
                  Waktu integrasi API-nya hanya butuh satu sore.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  BW
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Budi Wicaksono
                  </div>
                  <div className="text-xs text-slate-500">
                    Head of Engineering, SmartTraffic ID
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;Sebelumnya kami mengelola server GPU sendiri yang
                  memakan biaya puluhan juta per bulan. Pindah ke VisionFlow
                  memotong beban pengeluaran kami hingga 65% dengan latensi yang
                  jauh lebih konsisten.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-sm">
                  SL
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Sarah Lestari
                  </div>
                  <div className="text-xs text-slate-500">
                    CTO, Nexa Retail AI
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {"★".repeat(5)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;Fitur Zero-Retention dan kepatuhan SOC 2 menjadi faktor
                  penentu mengapa tim legal kami menyetujui VisionFlow untuk
                  memproses verifikasi identitas e-KYC pelanggan.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                  RA
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Reza Ardiansyah
                  </div>
                  <div className="text-xs text-slate-500">
                    VP of Product, FinPay Nusantara
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ SECTION (ACCORDION) */}
      {/* ========================================================= */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
              Tanya Jawab
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </p>
            <p className="mt-3 text-slate-600 text-base">
              Punya pertanyaan lain? Tim teknis kami siap membantu menjawabnya
              melalui live chat.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-indigo-600" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA BANNER */}
      {/* ========================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-10 sm:p-16 text-center text-white overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Siap Mengakselerasi Analisis Visual Bisnis Anda?
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg">
                Daftar sekarang dan nikmati 10.000 kredit API gratis. Mulai uji
                coba dalam 2 menit tanpa kartu kredit.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#mulai"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-lg transition-all active:scale-95"
                >
                  Mulai Uji Coba Gratis
                </a>
                <a
                  href="#kontak"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 font-semibold text-slate-200 transition-all"
                >
                  Jadwalkan Demo Tim
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  VF
                </div>
                <span className="font-bold text-lg text-white tracking-tight">
                  Vision<span className="text-indigo-400">Flow</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                Platform Computer Vision canggih dan infrastruktur AI untuk
                developer dan enterprise global.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Semua sistem operasional normal (99.99%)</span>
              </div>
            </div>

            {/* Links 1 */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Produk
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#fitur" className="hover:text-white transition-colors">
                    Deteksi Objek
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-white transition-colors">
                    Segmentasi Citra
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-white transition-colors">
                    Smart OCR Engine
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-white transition-colors">
                    Edge SDK
                  </a>
                </li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Developer
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#cara-kerja" className="hover:text-white transition-colors">
                    Dokumentasi API
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" className="hover:text-white transition-colors">
                    Python SDK
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" className="hover:text-white transition-colors">
                    Node.js SDK
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Status Server
                  </a>
                </li>
              </ul>
            </div>

            {/* Links 3 */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Perusahaan
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Syarat Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontak Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              &copy; 2026 VisionFlow Inc. Hak Cipta Dilindungi.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">
                Privasi
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Keamanan
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
