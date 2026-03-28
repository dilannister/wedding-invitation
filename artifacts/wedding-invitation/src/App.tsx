import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GUNUNGAN = "/images/gunungan.png";
const GROOM = "/images/groom.png";
const BRIDE = "/images/bride.png";
const MUSIC = "/music/wedding-music.mp3";

function guestName() {
  const p = new URLSearchParams(window.location.search);
  return p.get("to") || "Tamu Undangan";
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 32, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function Flowers() {
  const flowers = ["🌸", "💮", "💮", "💮", "💮", "🌸",
  return (
    <div className="floating-layer" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <motion.div
          key={i}
          className="flower"
          initial={{ y: -120, opacity: 0, x: 0, rotate: 0 }}
          animate={{
            y: ["-10vh", "35vh", "70vh", "110vh"],
            x: [0, i % 2 === 0 ? 18 : -18, i % 2 === 0 ? -8 : 8, 0],
            rotate: [0, 14, -10, 16],
            opacity: [0, 0.95, 0.7, 0],
          }}
          transition={{
            duration: 11 + (i % 4) * 3,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: `${4 + i * 7}%`, fontSize: `${16 + (i % 5) * 5}px` }}
        >
          {flowers[i % flowers.length]}
        </motion.div>
      ))}
    </div>
  );
}

function Section({
  id,
  light = false,
  children,
}: {
  id?: string;
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={light ? "sec sec-light" : "sec"} id={id}>
      <div className="pattern" />
      <div className="inner">{children}</div>
    </section>
  );
}

function Title({
  pre,
  title,
  light = false,
}: {
  pre?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div {...reveal()} className="title-wrap">
      {pre && <p className={light ? "kicker kicker-dark" : "kicker"}>{pre}</p>}
      <h2 className={light ? "title title-dark" : "title"}>{title}</h2>
      <div className="divider"><span /><i /><span /></div>
    </motion.div>
  );
}

function Cover({
  onOpen,
  audioRef,
}: {
  onOpen: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  return (
    <motion.div
      className="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="pattern" />
      <motion.div
        className="cover-card luxury"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={GUNUNGAN}
          alt="Gunungan"
          className="cover-gunungan"
          initial={{ opacity: 0, y: -24, scale: 0.88, rotate: -4 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, duration: 1 }}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.62, y: 0 }}
          transition={{ delay: 0.24, duration: 0.8 }}
          className="kicker"
        >
          The Wedding Of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 1 }}
          className="cover-name"
        >
          Alman &amp; Terii
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.9 }}
          className="cover-date"
        >
          26 April 2026
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.9 }}
          className="guest-box"
        >
          <p className="guest-label">Kepada Yth.</p>
          <p className="guest-name">{guestName()}</p>
          <p className="guest-sub">Bapak / Ibu / Saudara / i</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.64, duration: 0.9 }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          className="btn-gold"
          onClick={() => {
            audioRef.current?.play().catch(() => {});
            onOpen();
          }}
        >
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <Section id="hero">
      <div className="hero">
        <motion.div
          className="hero-glow"
          animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          {...reveal(0.05)}
          src={GUNUNGAN}
          alt="Gunungan"
          className="hero-gunungan"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
        />
        <motion.p {...reveal(0.1)} className="kicker">The Wedding Of</motion.p>
        <motion.h1 {...reveal(0.16)} className="hero-name">Alman &amp; Terii</motion.h1>
        <motion.p {...reveal(0.22)} className="hero-date">26 April 2026</motion.p>
        <motion.p {...reveal(0.28)} className="hero-text">
          Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.
        </motion.p>
      </div>
    </Section>
  );
}

function CoupleCard({
  image, name, role, meta1, meta2,
}: {
  image: string; name: string; role: string; meta1: string; meta2: string;
}) {
  return (
    <motion.div {...reveal()} className="couple-card">
      <div className="photo-ring">
        <img src={image} alt={name} className="photo" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
      </div>
      <h3 className="couple-name">{name}</h3>
      <p className="couple-role">{role}</p>
      <p className="couple-meta">{meta1}</p>
      <p className="couple-meta italic">{meta2}</p>
    </motion.div>
  );
}

function Couple() {
  return (
    <Section light id="couple">
      <Title pre="Bismillahirrahmanirrahim" title="Groom & Bride" light />
      <div className="glass-panel">
        <CoupleCard
          image={GROOM}
          name="D. Sukma Almansyah"
          role="Mempelai Pria"
          meta1="25 Desember 1990"
          meta2="(Alm) Ade Ibrahim & Ibu Yani Riyani"
        />
        <motion.div {...reveal(0.08)} className="amp">&amp;</motion.div>
        <CoupleCard
          image={BRIDE}
          name="Tri Andini"
          role="Mempelai Wanita"
          meta1="04 Maret 2002"
          meta2="Bapak Nurohmat & Ibu Siti Mulyani"
        />
      </div>
    </Section>
  );
}

function AppInner() {
  return (
    <>
      <Hero />
      <Couple />
    </>
  );
}

function MusicBtn({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(true);
  return (
    <motion.button
      className="music-btn"
      animate={{
        boxShadow: playing
          ? [
              "0 0 12px rgba(201,164,108,.22), 0 4px 16px rgba(0,0,0,.4)",
              "0 0 24px rgba(201,164,108,.42), 0 4px 16px rgba(0,0,0,.4)",
              "0 0 12px rgba(201,164,108,.22), 0 4px 16px rgba(0,0,0,.4)",
            ]
          : "0 4px 16px rgba(0,0,0,.4)",
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (!audioRef.current) return;
        if (playing) audioRef.current.pause();
        else audioRef.current.play().catch(() => {});
        setPlaying(!playing);
      }}
    >
      <motion.span
        animate={playing ? { rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {playing ? "♫" : "♪"}
      </motion.span>
    </motion.button>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#0d0508";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="app-shell">
      <audio ref={audioRef} src={MUSIC} loop preload="auto" />
      {open && <Flowers />}
      <AnimatePresence>
        {!open && <Cover onOpen={() => setOpen(true)} audioRef={audioRef} />}
      </AnimatePresence>
      {open && (
        <>
          <MusicBtn audioRef={audioRef} />
          <AppInner />
        </>
      )}
    </div>
  );
}
