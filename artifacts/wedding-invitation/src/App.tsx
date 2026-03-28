import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLORS = {
  bg: "#1a0d10",
  bgSoft: "#2a1618",
  gold: "#C9A46C",
  goldSoft: "#e6c68b",
  cream: "#F5E9E2",
  maroon: "#4b1f28",
  light: "#f6eee4",
};

const GUNUNGAN = "/images/gunungan.png";
const GROOM = "/images/groom.png";
const BRIDE = "/images/bride.png";
const MUSIC = "/music/wedding-music.mp3";

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "Tamu Undangan";
}

function revealUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function FloatingFlowers() {
  const flowers = ["🌸", "🌺", "🌷", "🪷", "💮", "🌹"];
  const items = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="floating-layer" aria-hidden="true">
      {items.map((i) => {
        const left = 4 + i * 7;
        const size = 16 + (i % 5) * 5;
        const duration = 12 + (i % 4) * 3;
        const delay = i * 0.7;
        return (
          <motion.div
            key={i}
            className="flower-float"
            initial={{ y: -120, opacity: 0, x: 0, rotate: 0 }}
            animate={{
              y: ["-10vh", "35vh", "70vh", "110vh"],
              x: [0, i % 2 === 0 ? 16 : -16, i % 2 === 0 ? -8 : 8, 0],
              rotate: [0, 14, -10, 16],
              opacity: [0, 0.95, 0.7, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ left: `${left}%`, fontSize: `${size}px` }}
          >
            {flowers[i % flowers.length]}
          </motion.div>
        );
      })}
    </div>
  );
}

function Section({
  children,
  light = false,
  id,
}: {
  children: React.ReactNode;
  light?: boolean;
  id?: string;
}) {
  return (
    <section className={light ? "section section-light" : "section"} id={id}>
      <div className="pattern" />
      <div className="section-inner">{children}</div>
    </section>
  );
}

function SectionTitle({
  pre,
  title,
  light = false,
}: {
  pre?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <motion.div {...revealUp()} className="section-title">
      {pre && <p className={light ? "kicker kicker-dark" : "kicker"}>{pre}</p>}
      <h2 className={light ? "title-dark" : "title"}>{title}</h2>
      <div className="divider">
        <span />
        <i />
        <span />
      </div>
    </motion.div>
  );
}

function OpeningCover({
  onOpen,
  audioRef,
}: {
  onOpen: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const guest = getGuestName();

  return (
    <motion.div
      className="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="pattern" />
      <motion.div
        className="cover-card"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
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
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
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
          <p className="guest-name">{guest}</p>
          <p className="guest-sub">Bapak / Ibu / Saudara / i</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.64, duration: 0.9 }}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          className="primary-btn"
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

function HeroSection() {
  return (
    <Section id="hero">
      <div className="hero">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="hero-glow"
        />
        <motion.img
          {...revealUp(0.05)}
          src={GUNUNGAN}
          alt="Gunungan"
          className="hero-gunungan"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <motion.p {...revealUp(0.1)} className="kicker">
          The Wedding Of
        </motion.p>
        <motion.h1 {...revealUp(0.16)} className="hero-name">
          Alman &amp; Terii
        </motion.h1>
        <motion.p {...revealUp(0.22)} className="hero-date">
          26 April 2026
        </motion.p>
        <motion.p {...revealUp(0.28)} className="hero-text">
          Dengan penuh rasa syukur kepada Allah SWT, kami mengundang
          Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari
          bahagia kami.
        </motion.p>
        <motion.button
          {...revealUp(0.34)}
          whileTap={{ scale: 0.98 }}
          className="ghost-btn"
          onClick={() =>
            document
              .getElementById("quote")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Lihat Undangan
        </motion.button>
      </div>
    </Section>
  );
}

function QuoteSection() {
  return (
    <Section id="quote">
      <SectionTitle pre="QS. Adz-Dzariyat : 49" title="Ayat Cinta" />
      <motion.div {...revealUp(0.08)} className="quote-box">
        <p className="quote-main">
          “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri.”
        </p>
        <p className="quote-sub">
          Semoga pernikahan ini menjadi awal perjalanan hidup yang penuh
          keberkahan, kasih sayang, dan kebahagiaan.
        </p>
      </motion.div>
    </Section>
  );
}

function CoupleCard({
  name,
  role,
  birth,
  parents,
  image,
}: {
  name: string;
  role: string;
  birth: string;
  parents: string;
  image: string;
}) {
  return (
    <motion.div {...revealUp()} className="couple-card">
      <div className="couple-photo-wrap">
        <img
          src={image}
          alt={name}
          className="couple-photo"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <h3 className="couple-name">{name}</h3>
      <p className="couple-role">{role}</p>
      <p className="couple-meta">{birth}</p>
      <p className="couple-meta italic">{parents}</p>
    </motion.div>
  );
}

function CoupleSection() {
  return (
    <Section light id="couple">
      <SectionTitle pre="Bismillahirrahmanirrahim" title="Groom & Bride" light />
      <div className="panel">
        <CoupleCard
          name="D. Sukma Almansyah"
          role="Mempelai Pria"
          birth="25 Desember 1990"
          parents="(Alm) Ade Ibrahim & Ibu Yani Riyani"
          image={GROOM}
        />
        <motion.div {...revealUp(0.1)} className="ampersand">
          &
        </motion.div>
        <CoupleCard
          name="Tri Andini"
          role="Mempelai Wanita"
          birth="04 Maret 2002"
          parents="Bapak Nurohmat & Ibu Siti Mulyani"
          image={BRIDE}
        />
      </div>
    </Section>
  );
}

function useCountdown(targetDate: Date) {
  const calculate = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calculate());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function SaveDateSection() {
  const c = useCountdown(new Date("2026-04-26T09:00:00"));

  const items = [
    { label: "Hari", value: c.days },
    { label: "Jam", value: c.hours },
    { label: "Menit", value: c.minutes },
    { label: "Detik", value: c.seconds },
  ];

  return (
    <Section light id="save-date">
      <SectionTitle pre="Save The Date" title="26 April 2026" light />
      <motion.p {...revealUp(0.06)} className="center-text dark-text">
        Kami akan memulai perjalanan baru sebagai suami dan istri pada hari
        yang berbahagia.
      </motion.p>
      <div className="countdown-grid">
        {items.map((item, i) => (
          <motion.div {...revealUp(i * 0.06)} key={item.label} className="count-box">
            <div className="count-value">{String(item.value).padStart(2, "0")}</div>
            <div className="count-label">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function EventCard({
  title,
  subtitle,
  date,
  time,
  address,
  maps,
}: {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  address: string;
  maps: string;
}) {
  return (
    <motion.div {...revealUp()} className="event-card">
      <div className="event-head">
        <img
          src={GUNUNGAN}
          alt=""
          className="event-icon"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div>
          <h3 className="event-title">{title}</h3>
          <p className="event-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="event-detail">
        <strong>Tanggal</strong>
        <p>{date}</p>
      </div>
      <div className="event-detail">
        <strong>Waktu</strong>
        <p>{time}</p>
      </div>
      <div className="event-detail">
        <strong>Lokasi</strong>
        <p style={{ whiteSpace: "pre-line" }}>{address}</p>
      </div>
      <a href={maps} target="_blank" rel="noreferrer" className="ghost-btn-link">
        Lihat Maps
      </a>
    </motion.div>
  );
}

function EventSection() {
  return (
    <Section id="event">
      <SectionTitle pre="Waktu & Tempat" title="Detail Acara" />
      <div className="stack">
        <EventCard
          title="Akad Nikah"
          subtitle="Ijab Kabul"
          date="Minggu, 26 April 2026"
          time="09.00 WIB"
          address={`JL Al-Innayah Karang Ampel RT003/RW004 No.15
Kp Rawa Kalong
Desa Karang Satria
Kecamatan Tambun Utara
Kabupaten Bekasi`}
          maps="https://share.google/rB1z28aq7zzRBFh7p"
        />
        <EventCard
          title="Resepsi Pernikahan"
          subtitle="Wedding Reception"
          date="Minggu, 26 April 2026"
          time="10.00 WIB – Selesai"
          address={`JL Al-Innayah Karang Ampel RT003/RW004 No.15
Kp Rawa Kalong
Desa Karang Satria
Kecamatan Tambun Utara
Kabupaten Bekasi`}
          maps="https://share.google/rB1z28aq7zzRBFh7p"
        />
      </div>
    </Section>
  );
}

function GiftSection() {
  const gifts = [
    { title: "Bank BCA", type: "Transfer Bank", name: "Tri Andini", no: "7391383778" },
    { title: "GoPay", type: "E-Wallet", name: "Tri Andini", no: "0857-1533-3423" },
  ];

  return (
    <Section id="gift">
      <SectionTitle pre="Wedding Gift" title="Hadiah Pernikahan" />
      <motion.p {...revealUp(0.06)} className="center-text">
        Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin
        memberikan tanda kasih:
      </motion.p>
      <div className="stack">
        {gifts.map((gift, i) => (
          <motion.div {...revealUp(i * 0.08)} key={gift.title} className="gift-card">
            <p className="gift-type">{gift.type}</p>
            <h3 className="gift-title">{gift.title}</h3>
            <p className="gift-name">{gift.name}</p>
            <div className="gift-number-wrap">
              <span>{gift.no}</span>
              <button
                onClick={() => navigator.clipboard.writeText(gift.no)}
                className="copy-btn"
              >
                Salin
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ClosingSection() {
  return (
    <Section id="closing">
      <motion.div {...revealUp()} className="closing">
        <img
          src={GUNUNGAN}
          alt="Gunungan"
          className="closing-gunungan"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <p className="center-text">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <div className="divider">
          <span />
          <i />
          <span />
        </div>
        <p className="kicker">Kami yang berbahagia</p>
        <h2 className="cover-name small">Alman &amp; Terii</h2>
        <p className="hero-date">26 April 2026</p>
      </motion.div>
    </Section>
  );
}

function MusicButton({
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
        if (playing) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {});
        }
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
      {open && <FloatingFlowers />}

      <AnimatePresence>
        {!open && <OpeningCover onOpen={() => setOpen(true)} audioRef={audioRef} />}
      </AnimatePresence>

      {open && (
        <>
          <MusicButton audioRef={audioRef} />
          <HeroSection />
          <QuoteSection />
          <CoupleSection />
          <SaveDateSection />
          <EventSection />
          <GiftSection />
          <ClosingSection />
        </>
      )}
    </div>
  );
}
