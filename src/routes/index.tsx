import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  Sparkles,
  HeartHandshake,
  Leaf,
  Instagram,
  Mail,
  MapPin,
  ArrowUp,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMG =
  "https://drive.google.com/uc?export=view&id=1nMB3LJecDiEthtuzNhyIS4gz6_0DMDUE";
const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1920&q=80";

const WHATSAPP_BASE = "https://wa.me/5567992671108";
const wa = (msg: string) => `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;
const svcMsg = (name: string) =>
  `Olá, Isabela! Gostaria de mais informações sobre o serviço de ${name}.`;
const laserMsg = (region: string) =>
  `Olá, Isabela! Gostaria de mais informações sobre Epilação a Laser - ${region}.`;

type Service = { name: string; message: string };
type Tab = { id: string; label: string; intro?: string; items: Service[] };

const TABS: Tab[] = [
  {
    id: "pele",
    label: "Pele",
    items: [
      "Bioestimulador",
      "Ultraformer MPT",
      "Botox",
      "Laser Lavieen",
      "Jato de Plasma",
      "Microagulhamento",
      "Limpeza de Pele Plus",
      "Limpeza de Pele",
      "Revitalização",
    ].map((n) => ({ name: n, message: svcMsg(n) })),
  },
  {
    id: "corpo",
    label: "Corpo",
    items: [{ name: "Drenagem Corporal", message: svcMsg("Drenagem Corporal") }],
  },
  {
    id: "maquiagem",
    label: "Maquiagem & Olhos",
    items: [
      { name: "Maquiagem Completa", message: svcMsg("Maquiagem Completa") },
      { name: "Maquiagem Express", message: svcMsg("Maquiagem Express") },
      { name: "Revitalização Labial", message: svcMsg("Revitalização Labial") },
      { name: "Lifting de Cílios", message: svcMsg("Lifting de Cílios") },
    ],
  },
  {
    id: "sobrancelhas",
    label: "Sobrancelhas",
    items: [
      { name: "Design de Sobrancelhas", message: svcMsg("Design de Sobrancelhas") },
      { name: "Design com Henna / Tintura / Clareamento", message: svcMsg("Design com Henna") },
      { name: "Brown Lamination", message: svcMsg("Brown Lamination") },
      { name: "Nanopigmentação", message: svcMsg("Nanopigmentação") },
      { name: "Epilação a Cera / Linha", message: svcMsg("Epilação a Cera") },
    ],
  },
  {
    id: "laser",
    label: "Epilação a Laser",
    intro:
      "Pacotes e combos disponíveis sob consulta. Método moderno e eficiente com tecnologia avançada.",
    items: [
      { name: "Região Pequena", message: laserMsg("Região Pequena") },
      { name: "Região Média", message: laserMsg("Região Média") },
      { name: "Região Grande", message: laserMsg("Região Grande") },
    ],
  },
];

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [showTop, setShowTop] = useState(false);
  const [heroSrc, setHeroSrc] = useState(HERO_IMG);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá, Isabela! Meu nome é ${form.nome} (${form.email}).\n\n${form.mensagem}`;
    window.open(wa(msg), "_blank", "noopener,noreferrer");
  };

  const tab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-background"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#inicio" className="font-display text-xl md:text-2xl text-ink tracking-tight">
            Isabela Bertolli <span className="text-graphite italic">Estética</span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm tracking-wide">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-ink hover:text-graphite transition-colors uppercase text-[12px] tracking-[0.15em]"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={wa("Olá, Isabela! Gostaria de agendar uma avaliação.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center px-5 py-3 bg-ink text-white text-[11px] uppercase tracking-[0.2em] hover:bg-beige hover:text-ink transition-colors"
          >
            Agendar Avaliação
          </a>
          <button
            className="lg:hidden p-2 text-ink"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-beige bg-background">
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={closeMenu}
                  className="text-ink uppercase text-sm tracking-[0.15em]"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={wa("Olá, Isabela! Gostaria de agendar uma avaliação.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-2 inline-flex justify-center px-5 py-3 bg-ink text-white text-[11px] uppercase tracking-[0.2em]"
              >
                Agendar Avaliação
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroSrc}
          alt="Isabela Bertolli Estética"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHeroSrc(HERO_FALLBACK)}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.75) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl fade-in-up">
          <p className="text-beige uppercase tracking-[0.4em] text-xs md:text-sm mb-6">
            Estética | Saúde | Beleza
          </p>
          <h1 className="font-display text-white text-5xl md:text-7xl leading-[1.05] mb-6">
            Isabela Bertolli <span className="italic font-normal">Estética</span>
          </h1>
          <div className="w-16 h-px bg-beige mx-auto mb-6" />
          <p className="text-white/90 text-base md:text-lg font-light tracking-wide mb-10 max-w-xl mx-auto">
            Há 10 anos priorizando a qualidade da sua pele
          </p>
          <a
            href={wa("Olá, Isabela! Gostaria de agendar uma avaliação.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-beige text-ink text-[11px] uppercase tracking-[0.25em] hover:bg-white transition-colors"
          >
            Agende sua avaliação
          </a>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-5xl px-6 text-center reveal">
          <p className="uppercase tracking-[0.3em] text-xs text-graphite mb-4">Sobre</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">
            Sobre Isabela Bertolli
          </h2>
          <div className="w-12 h-px bg-beige mx-auto mb-10" />
          <p className="text-graphite text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Nossa missão é oferecer serviços estéticos personalizados para quem busca autoestima,
            bem-estar e praticidade, com atendimento humanizado, dermocosméticos de alta qualidade
            e tecnologia segura. Trabalhamos com homens e mulheres, valorizando a naturalidade e a
            excelência em cada procedimento.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-20 grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "Profissionalismo", desc: "Uma década de dedicação e conhecimento técnico." },
            { icon: HeartHandshake, title: "Atendimento Personalizado", desc: "Cada pele, um protocolo único e humanizado." },
            { icon: Leaf, title: "Resultados Naturais", desc: "Realce da sua beleza, respeitando sua essência." },
          ].map((c, i) => (
            <div
              key={i}
              className="reveal bg-ice p-10 text-center border border-transparent hover:border-beige transition-colors"
            >
              <c.icon className="mx-auto mb-6 text-ink" size={32} strokeWidth={1.2} />
              <h3 className="font-display text-xl text-ink mb-3">{c.title}</h3>
              <p className="text-graphite text-sm font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 md:py-32 bg-ice">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center reveal mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-graphite mb-4">Serviços</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Nossos Tratamentos</h2>
            <div className="w-12 h-px bg-beige mx-auto mt-8" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-3 text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                  activeTab === t.id
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink border-beige hover:bg-beige"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab.intro && (
            <p className="text-center text-graphite max-w-2xl mx-auto mb-10 font-light italic">
              {tab.intro}
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tab.items.map((s) => (
              <div
                key={s.name}
                className="bg-white border border-beige rounded-2xl shadow-sm p-8 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-display text-xl text-ink mb-6">{s.name}</h3>
                <a
                  href={wa(s.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-ink text-white text-[11px] uppercase tracking-[0.2em] hover:bg-beige hover:text-ink transition-colors w-full"
                >
                  Agendar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section id="localizacao" className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="uppercase tracking-[0.3em] text-xs text-graphite mb-4">Localização</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-8">Onde Estamos</h2>
            <div className="w-12 h-px bg-beige mb-8" />
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="text-ink mt-1 shrink-0" size={20} strokeWidth={1.4} />
              <p className="text-graphite font-light leading-relaxed">
                Rua Spipe Calarge, 455 - Sala 04<br />
                Tv Morena, Campo Grande - MS
              </p>
            </div>
          </div>
          <div className="reveal border border-beige overflow-hidden aspect-[4/3]">
            <iframe
              title="Mapa Isabela Bertolli Estética"
              src="https://www.google.com/maps?q=Rua+Spipe+Calarge+455+Campo+Grande+MS&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32 bg-ice">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center reveal mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-graphite mb-4">Depoimentos</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">O que dizem</h2>
            <div className="w-12 h-px bg-beige mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="reveal bg-white border border-beige p-10 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={16} className="text-beige fill-beige" />
                  ))}
                </div>
                <p className="text-graphite font-light italic leading-relaxed">
                  "Em breve, depoimentos de nossos clientes."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO / FORM */}
      <section id="contato" className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center reveal mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-graphite mb-4">Contato</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Fale Conosco</h2>
            <div className="w-12 h-px bg-beige mx-auto mt-8" />
          </div>
          <form onSubmit={submitForm} className="reveal space-y-5">
            <input
              required
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full px-5 py-4 bg-ice border border-beige focus:border-ink focus:outline-none text-ink placeholder:text-graphite/70"
            />
            <input
              required
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-4 bg-ice border border-beige focus:border-ink focus:outline-none text-ink placeholder:text-graphite/70"
            />
            <textarea
              required
              rows={5}
              placeholder="Mensagem"
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              className="w-full px-5 py-4 bg-ice border border-beige focus:border-ink focus:outline-none text-ink placeholder:text-graphite/70 resize-none"
            />
            <button
              type="submit"
              className="w-full px-6 py-4 bg-ink text-white text-[11px] uppercase tracking-[0.25em] hover:bg-beige hover:text-ink transition-colors"
            >
              Enviar via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-white pt-20 pb-8">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-2xl mb-4">Isabela Bertolli</h3>
            <p className="text-beige uppercase tracking-[0.25em] text-[11px] mb-6">
              Estética | Saúde | Beleza
            </p>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Há 10 anos priorizando a qualidade da sua pele em Campo Grande - MS.
            </p>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs text-beige mb-5">Contato</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a
                  href={wa("Olá, Isabela! Gostaria de agendar uma avaliação.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-beige transition-colors"
                >
                  WhatsApp: (67) 99267-1108
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/isabertolliestetica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-beige transition-colors inline-flex items-center gap-2"
                >
                  <Instagram size={14} /> @isabertolliestetica
                </a>
              </li>
              <li>
                <a
                  href="mailto:isabelabertolli7@hotmail.com"
                  className="hover:text-beige transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} /> isabelabertolli7@hotmail.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs text-beige mb-5">Endereço</h4>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Rua Spipe Calarge, 455 - Sala 04<br />
              Tv Morena, Campo Grande - MS
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/60">
          <p>© 2026 Isabela Bertolli Estética - Todos os direitos reservados</p>
          <a
            href="https://wa.me/5567999222720?text=Olá%20Gabriel!%20Vi%20seu%20trabalho%20no%20site%20da%20Isabela%20Bertolli%20e%20tenho%20interesse%20em%20criar%20um%20site%20também.%20Podemos%20conversar%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-beige transition-colors"
          >
            Desenvolvido por Gabriel Cavalcanti
          </a>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/5567992671108?text=Olá%20Isabela!%20Gostaria%20de%20agendar%20uma%20avaliação%20ou%20tirar%20dúvidas%20sobre%20os%20procedimentos."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-ink border border-beige flex items-center justify-center hover:bg-beige transition-colors group"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-beige group-hover:text-ink transition-colors"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.006c6.582 0 11.941-5.335 11.944-11.893a11.821 11.821 0 0 0-3.475-8.453zm-8.475 18.297h-.004a9.87 9.87 0 0 1-5.03-1.378l-.36-.214-3.742.977 1.004-3.635-.235-.374a9.834 9.834 0 0 1-1.512-5.26c.002-5.45 4.455-9.884 9.936-9.884 2.652 0 5.145 1.032 7.021 2.905a9.788 9.788 0 0 1 2.909 6.986c-.003 5.45-4.456 9.877-9.987 9.877z" />
        </svg>
      </a>

      {/* BACK TO TOP */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-24 right-6 z-50 w-11 h-11 bg-ink border border-beige flex items-center justify-center hover:bg-beige transition-colors group"
        >
          <ArrowUp size={18} className="text-beige group-hover:text-ink transition-colors" />
        </button>
      )}
    </div>
  );
}
