import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css";

const GUNUNGAN = "/images/gunungan.png";
const GROOM = "/images/groom.png";
const BRIDE = "/images/bride.png";
const MUSIC = "/music/wedding-music.mp3";

function guestName() {
  const p = new URLSearchParams(window.location.search);
  return p.get("to") || "Tamu Undangan";
}

const easeLuxury: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36, scale: 0.985, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      delay,
      ease: easeLuxury,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.99,
    filter: "blur(8px)",
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

const staggerWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

function FloatingParticles() {
  const flowers = ["🌸", "🌺", "🌷", "🪷", "💮", "🌹"];
  return (
    <div className="floating-layer" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="flower"
          initial={{ opacity: 0, y: "-10vh", x: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.9, 0.75, 0],
            y: ["-10vh", "30vh", "65vh", "110vh"],
            x: [0, i % 2 === 0 ? 24 : -22, i % 2 === 0 ? -12 : 14, 0],
            rotate: [0, 10, -12, 10],
          }}
          transition={{
            duration: 14 + i * 0.45,
            delay: i * 0.45,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${6 + i * 7}%`,
            fontSize: `${16 + (i % 4) * 6}px`,
          }}
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
    <section id={id} className={light ? "sec sec-light" : "sec"}>
      <div className="section-pattern" />
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
    <motion.div
      className="title-wrap"
      variants={fadeUp()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {pre && <p className={light ? "kicker kicker-dark" : "kicker"}>{pre}</p>}
      <h2 className={light ? "title title-dark" : "title"}>{title}</h2>
      <div className="divider">
        <span />
        <i />
        <span />
      </div>
    </motion.div>
  );
}

function Opening({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="opening"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <motion.div
        className="opening-center"
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.3, ease: easeLuxury }}
      >
        <motion.img
          src={GUNUNGAN}
          alt="Gunungan"
          className="opening-gunungan"
          animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <p className="opening-pre">Undangan Pernikahan</p>
        <h1 className="opening-title">Alman &amp; Terii</h1>
        <p className="opening-date">26 April 2026</p>
      </motion.div>
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
      exit={{
        opacity: 0,
        scale: 1.06,
        filter: "blur(12px)",
        transition: { duration: 1.05, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      <div className="section-pattern" />

      <motion.div
        className="cover-card"
        variants={staggerWrap}
        initial="hidden"
        animate="show"
      >
        <motion.img
          src={GUNUNGAN}
          alt="Gunungan"
          className="cover-gunungan"
          variants={fadeUp(0)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <motion.p className="kicker" variants={fadeUp(0.08)}>
          The Wedding Of
        </motion.p>
        <motion.h1 className="cover-name" variants={fadeUp(0.15)}>
          Alman &amp; Terii
        </motion.h1>
        <motion.p className="cover-date" variants={fadeUp(0.22)}>
          Minggu, 26 April 2026
        </motion.p>

        <motion.div className="guest-box" variants={fadeUp(0.28)}>
          <p className="guest-label">Kepada Yth.</p>
          <p className="guest-name">{guestName()}</p>
          <p className="guest-sub">Bapak / Ibu / Saudara / i</p>
        </motion.div>

        <motion.button
          className="btn-gold"
          variants={fadeUp(0.34)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src={GUNUNGAN}
          alt="Gunungan"
          className="hero-gunungan"
          variants={fadeUp(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <motion.div
          className="hero-float"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.p
            className="kicker"
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            className="hero-name"
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Alman &amp; Terii
          </motion.h1>

          <motion.p
            className="hero-date"
            variants={fadeUp(0.28)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            26 April 2026
          </motion.p>

          <motion.p
            className="hero-text"
            variants={fadeUp(0.36)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Dengan penuh rasa syukur kepada Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari
            bahagia kami.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}

function CoupleCard({
  image,
  name,
  role,
  meta1,
  meta2,
}: {
  image: string;
  name: string;
  role: string;
  meta1: string;
  meta2: string;
}) {
  const [src, setSrc] = useState(image);

  return (
    <motion.div
      className="couple-card"
      variants={fadeUp()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="photo-ring">
        <img
          src={src}
          alt={name}
          className="photo"
          onError={() => setSrc("https://placehold.co/600x800/png?text=Couple")}
        />
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
    <Section id="couple" light>
      <Title pre="Bismillahirrahmanirrahim" title="Groom & Bride" light />
      <div className="glass-panel">
        <CoupleCard
          image={GROOM}
          name="D. Sukma Almansyah"
          role="Mempelai Pria"
          meta1="Putra dari"
          meta2="(Alm) Ade Ibrahim & Ibu Yani Riyani"
        />
        <motion.div
          className="amp"
          variants={fadeUp(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          &
        </motion.div>
        <CoupleCard
          image={BRIDE}
          name="Tri Andini"
          role="Mempelai Wanita"
          meta1="Putri dari"
          meta2="Bapak Nurohmat & Ibu Siti Mulyani"
        />
      </div>
    </Section>
  );
}

function EventInfo() {
  return (
    <Section id="event">
      <Title pre="Save The Date" title="Wedding Event" />
      <div className="event-grid">
        <motion.div
          className="event-card"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="event-label">Akad Nikah</p>
          <h3>08.00 WIB</h3>
          <p>Minggu, 26 April 2026</p>
          <p>Kediaman Mempelai Wanita</p>
        </motion.div>

        <motion.div
          className="event-card"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="event-label">Resepsi</p>
          <h3>11.00 WIB</h3>
          <p>Minggu, 26 April 2026</p>
          <p>Gedung Serbaguna / Lokasi Acara</p>
        </motion.div>
      </div>
    </Section>
  );
}

function Countdown() {
  const target = useMemo(() => new Date("2026-04-26T08:00:00+07:00").getTime(), []);
  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setTime(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  const safe = Math.max(time, 0);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);

  return (
    <Section id="countdown" light>
      <Title pre="Menuju Hari Bahagia" title="Countdown" light />
      <motion.div
        className="count-grid"
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {[["Hari", days], ["Jam", hours], ["Menit", minutes], ["Detik", seconds]].map(
          ([label, value]) => (
            <div className="count-box" key={label}>
              <h3>{String(value).padStart(2, "0")}</h3>
              <p>{label}</p>
            </div>
          )
        )}
      </motion.div>
    </Section>
  );
}

function RSVP() {
  return (
    <Section id="rsvp">
      <Title pre="Konfirmasi Kehadiran" title="RSVP" />
      <motion.form
        className="rsvp-form"
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input className="field" type="text" placeholder="Nama Anda" />
        <select className="field" defaultValue="">
          <option value="" disabled>
            Pilih Kehadiran
          </option>
          <option>Hadir</option>
          <option>Tidak Hadir</option>
        </select>
        <textarea
          className="field area"
          placeholder="Tulis ucapan & doa terbaik"
        />
        <button className="btn-gold" type="submit">
          Kirim RSVP
        </button>
      </motion.form>
    </Section>
  );
}

function Closing() {
  return (
    <Section id="closing" light>
      <motion.div
        className="closing-box"
        variants={fadeUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="kicker kicker-dark">Terima Kasih</p>
        <h2 className="title title-dark">Atas Kehadiran & Doa Restu Anda</h2>
        <div className="divider">
          <span />
          <i />
          <span />
        </div>
        <p className="closing-text">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <h3 className="closing-name">Alman &amp; Terii</h3>
      </motion.div>
    </Section>
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
              "0 0 12px rgba(201,164,108,.18), 0 4px 16px rgba(0,0,0,.38)",
              "0 0 24px rgba(201,164,108,.34), 0 4px 16px rgba(0,0,0,.38)",
              "0 0 12px rgba(201,164,108,.18), 0 4px 16px rgba(0,0,0,.38)",
            ]
          : "0 4px 16px rgba(0,0,0,.38)",
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
        animate={
          playing
            ? { rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {playing ? "♫" : "♪"}
      </motion.span>
    </motion.button>
  );
}

function AppInner() {
  return (
    <>
      <Hero />
      <Couple />
      <EventInfo />
      <Countdown />
      <RSVP />
      <Closing />
    </>
  );
}

export default function App() {
  const [stage, setStage] = useState<"opening" | "cover" | "main">("opening");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#0d0508";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "";
      document.body.style.background = "";
      document.body.style.margin = "";
    };
  }, []);

  return (
    <div className="app-shell">
      <audio ref={audioRef} src={MUSIC} loop preload="auto" />
      {stage === "main" && <FloatingParticles />}

      <AnimatePresence mode="wait">
        {stage === "opening" && <Opening onDone={() => setStage("cover")} key="opening" />}
        {stage === "cover" && (
          <Cover
            key="cover"
            audioRef={audioRef}
            onOpen={() => setStage("main")}
          />
        )}
      </AnimatePresence>

      {stage === "main" && (
        <>
          <MusicBtn audioRef={audioRef} />
          <AppInner />
        </>
      )}
    </div>
  );
}
