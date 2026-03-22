
import { Link } from "react-router";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Startup Guide", href: "#guide" },
      { label: "Templates", href: "#templates" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#careers" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

const socials = [
  {
    label: "Twitter",
    href: "#twitter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#github",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12
        0 5.303 3.438 9.8 8.205 11.385
        .6.113.82-.258.82-.577
        0-.285-.01-1.04-.015-2.04
        -3.338.724-4.042-1.61-4.042-1.61
        -.546-1.385-1.333-1.754-1.333-1.754
        -1.089-.745.084-.729.084-.729
        1.205.084 1.839 1.236 1.839 1.236
        1.07 1.835 2.809 1.305 3.495.998
        .108-.776.417-1.305.76-1.605
        -2.665-.3-5.467-1.332-5.467-5.93
        0-1.31.468-2.38 1.235-3.22
        -.123-.303-.536-1.523.117-3.176
        0 0 1.008-.322 3.301 1.23
        .957-.266 1.983-.399 3.003-.404
        1.02.005 2.047.138 3.006.404
        2.291-1.552 3.297-1.23 3.297-1.23
        .655 1.653.242 2.873.119 3.176
        .77.84 1.233 1.91 1.233 3.22
        0 4.61-2.807 5.624-5.479 5.921
        .43.372.823 1.103.823 2.222
        0 1.606-.014 2.898-.014 3.293
        0 .321.218.694.825.576
        C20.565 22.092 24 17.592 24 12.297
        c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569
        c0-1.328-.027-3.037-1.852-3.037
        -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
        c.477-.9 1.637-1.85 3.37-1.85
        3.601 0 4.267 2.37 4.267 5.455v6.286z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#07070b] pt-20 pb-12 overflow-hidden">

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

      .headline{font-family:'Sora',sans-serif;}
      .body{font-family:'Inter',sans-serif;}

      .footer-link{
        transition:all .2s ease;
      }

      .footer-link:hover{
        color:white;
        transform:translateX(4px);
      }

      .social{
        transition:all .25s ease;
      }

      .social:hover{
        transform:translateY(-3px);
        background:rgba(255,255,255,.08);
        border-color:rgba(255,255,255,.2);
      }
      `}</style>

      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[220px] bg-violet-600/10 blur-[120px] rounded-full"/>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[180px] bg-cyan-600/10 blur-[110px] rounded-full"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* main footer */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">

          {/* brand */}
          <div className="lg:col-span-2 flex flex-col gap-5 max-w-sm">

            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="headline text-white text-xl font-bold">
                Tasko
              </span>
            </Link>

            <p className="body text-sm text-zinc-400 leading-relaxed">
              The startup workspace designed for student founders.  
              Organize ideas, manage execution, and build startups faster.
            </p>

            {/* socials */}
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-zinc-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>

          </div>

          {/* links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">

            {footerLinks.map((col) => (
              <div key={col.heading}>

                <p className="headline text-xs text-zinc-500 uppercase tracking-widest mb-5">
                  {col.heading}
                </p>

                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-link body text-sm text-zinc-400"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="body text-xs text-zinc-500">
            © {year} Tasko — Built for student founders.
          </p>

          <div className="flex gap-5 text-xs text-zinc-500">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
