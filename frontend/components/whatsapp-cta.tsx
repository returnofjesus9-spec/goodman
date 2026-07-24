export default function WhatsAppCta() {
  return (
    <a
      href="https://wa.me/919999999999"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink/20 transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96C21.99 6.46 17.54 2 12.04 2Zm5.85 14.24c-.25.7-1.45 1.36-2 1.45-.53.09-1.2.13-1.94-.12-.44-.15-1.02-.34-1.74-.67-3.06-1.33-5.06-4.4-5.21-4.6-.15-.2-1.25-1.67-1.25-3.18 0-1.52.8-2.26 1.08-2.57.28-.31.62-.39.83-.39h.6c.19 0 .45-.07.7.54.25.6.86 2.08.94 2.23.08.15.13.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.07.17-.2.72-.84.92-1.13.2-.29.4-.24.66-.15.27.1 1.72.81 2.01.96.29.15.48.22.55.34.07.13.07.7-.18 1.4Z" />
      </svg>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
