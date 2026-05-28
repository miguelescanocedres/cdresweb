import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12" style={{ background: "#040810" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Image
            src="/cdres-logo.png"
            alt="CDRES INTEC"
            width={800}
            height={381}
            unoptimized
            className="h-9 w-auto"
          />

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-6 text-sm text-[#C2C6D8]">
              <a href="#servicios" className="hover:text-white transition-colors focus-visible:text-white">Servicios</a>
              <a href="#proceso" className="hover:text-white transition-colors focus-visible:text-white">Proceso</a>
              <a href="#contacto" className="hover:text-white transition-colors focus-visible:text-white">Contacto</a>
            </div>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-[#C2C6D8]">
            © {year} CDRES INTEC. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
