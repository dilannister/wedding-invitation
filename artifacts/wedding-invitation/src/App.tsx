import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  maroon: "#4b1f28",
  gold: "#C9A46C",
  goldLight: "#e8c98a",
  cream: "#F5E9E2",
  dark: "#1a0d10",
};

const FONTS = {
  script: "'Great Vibes', cursive",
  heading: "'Playfair Display', serif",
  body: "'Cormorant Garamond', serif",
  ui: "'Inter', sans-serif",
};

const BACKGROUNDS = {
  dark: "linear-gradient(180deg, #1a0d10 0%, #2a1618 40%, #4b1f28 70%, #2a1618 100%)",
  light: "linear-gradient(180deg, #f0e6d6 0%, #f5ede3 40%, #ece0cc 70%, #f0e6d6 100%)",
  maroonGlow: "linear-gradient(180deg, #1a0d10 0%, #2a1618 30%, #3a1820 60%, #2a1618 100%)",
};

const BATIK_PATTERN = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A46C' fill-opacity='0.05'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const IMAGE_GUNUNGAN = "/images/gunungan.png";
const IMAGE_GROOM = "/images/groom.png";
const IMAGE_BRIDE = "/images/bride.png";
const MUSIC_URL = "/music/wedding-music.mp3";

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "Tamu Undangan";
}

function useCountdown(targetDate: Date) {
  const calc = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [targetDate]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = window.setInterval(() => setTime(calc()), 1000);
    return () => window.clearInterval(id);
  }, [calc]);

  return time;
}

function SectionShell({
  children,
  background,
  light = false,
}: {
  children: React.ReactNode;
  background: string;
  light?: boolean;
}) {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 0",
        overflow: "hidden",
        background,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: BATIK_PATTERN,
          backgroundSize: "80px 80px",
          opacity: light ? 0.2 : 0.35,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          margin: "0 auto",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Divider({ light = false }: { light?: boolean }) {
  const color = light ? COLORS.maroon : COLORS.gold;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 26px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color})` }} />
      <div
        style={{
          width: 10,
          height: 10,
          transform: "rotate(45deg)",
          border: `1px solid ${color}`,
        }}
      />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
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
  const main = light ? COLORS.maroon : COLORS.gold;
  const sub = light ? COLORS.maroon : COLORS.cream;

  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      {pre && (
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.ui,
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: sub,
            opacity: 0.6,
          }}
        >
          {pre}
        </p>
      )}
      <h2
        style={{
          margin: "10px 0 0",
          fontFamily: FONTS.heading,
          fontSize: "clamp(24px, 5vw, 34px)",
          color: main,
        }}
      >
        {title}
      </h2>
      <Divider light={light} />
    </div>
  );
}

function OpeningCover({
  onOpen,
  audioRef,
}: {
  onOpen: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const guestName = getGuestName();

  const handleOpen = () => {
    audioRef.current?.play().catch(() => {});
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BACKGROUNDS.dark,
        overflowY: "auto",
        overflowX: "hidden",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: BATIK_PATTERN,
          backgroundSize: "80px 80px",
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 380,
          textAlign: "center",
          padding: "28px 20px",
          boxSizing: "border-box",
          border: "1px solid rgba(201,164,108,0.22)",
          borderRadius: 20,
          background: "rgba(26,13,16,0.55)",
          backdropFilter: "blur(6px)",
        }}
      >
        <img
          src={IMAGE_GUNUNGAN}
          alt="Gunungan"
          style={{
            width: "min(38vw, 150px)",
            minWidth: 88,
            height: "auto",
            display: "block",
            margin: "0 auto 14px",
            filter: "drop-shadow(0 0 12px rgba(201,164,108,0.35))",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <p
          style={{
            margin: 0,
            fontFamily: FONTS.ui,
            fontSize: 10,
            letterSpacing: "0.35em",
            color: COLORS.cream,
            opacity: 0.6,
            textTransform: "uppercase",
          }}
        >
          The Wedding Of
        </p>

        <h1
          style={{
            margin: "8px 0 4px",
            fontFamily: FONTS.script,
            fontSize: "clamp(44px, 14vw, 72px)",
            lineHeight: 1.1,
            color: COLORS.gold,
          }}
        >
          Alman &amp; Terii
        </h1>

        <p
          style={{
            margin: "0 0 20px",
            fontFamily: FONTS.heading,
            fontSize: "clamp(14px, 4vw, 18px)",
            letterSpacing: "0.12em",
            color: COLORS.gold,
            opacity: 0.85,
          }}
        >
          26 April 2026
        </p>

        <div
          style={{
            padding: "16px 14px",
            borderRadius: 14,
            border: "1px solid rgba(201,164,108,0.18)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontFamily: FONTS.ui,
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: COLORS.cream,
              opacity: 0.5,
            }}
          >
            Kepada Yth.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: FONTS.body,
              fontSize: "clamp(16px, 4.8vw, 22px)",
              color: COLORS.cream,
            }}
          >
            {guestName}
          </p>
        
        </div>

        <button
          onClick={handleOpen}
          style={{
            marginTop: 20,
            width: "100%",
            maxWidth: 280,
            padding: "14px 20px",
            border: "none",
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.gold})`,
            color: COLORS.dark,
            fontFamily: FONTS.ui,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <SectionShell background={BACKGROUNDS.dark}>
      <div style={{ textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <img
          src={IMAGE_GUNUNGAN}
          alt="Gunungan"
          style={{
            width: "min(44vw, 190px)",
            minWidth: 110,
            display: "block",
            margin: "0 auto 20px",
            height: "auto",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <p
          style={{
            margin: 0,
            fontFamily: FONTS.ui,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: COLORS.cream,
            opacity: 0.55,
          }}
        >
          The Wedding Of
        </p>

        <h1
          style={{
            margin: "8px 0 6px",
            fontFamily: FONTS.script,
            fontSize: "clamp(52px, 15vw, 84px)",
            lineHeight: 1.08,
            color: COLORS.gold,
          }}
        >
          Alman &amp; Terii
        </h1>

        <p
          style={{
            margin: "0 0 26px",
            fontFamily: FONTS.heading,
            fontSize: "clamp(14px, 4vw, 18px)",
            letterSpacing: "0.14em",
            color: COLORS.gold,
          }}
        >
          26 April 2026
        </p>

        <p
          style={{
            margin: "0 auto 28px",
            maxWidth: 380,
            fontFamily: FONTS.body,
            fontSize: "clamp(16px, 4.2vw, 20px)",
            lineHeight: 1.8,
            color: COLORS.cream,
            opacity: 0.78,
            fontStyle: "italic",
          }}
        >
          Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia kami.
        </p>

        <button
          onClick={() => {
            document.getElementById("quran-verse")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            alignSelf: "center",
            padding: "13px 26px",
            borderRadius: 999,
            border: "1px solid rgba(201,164,108,0.5)",
            background: "transparent",
            color: COLORS.gold,
            fontFamily: FONTS.ui,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Lihat Undangan
        </button>
      </div>
    </SectionShell>
  );
}

function QuranVerseSection() {
  return (
    <SectionShell background={BACKGROUNDS.dark}>
      <div id="quran-verse" style={{ textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.ui,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: COLORS.gold,
            opacity: 0.8,
          }}
        >
          QS. Adz-Dzariyat : 49
        </p>

        <p
          style={{
            margin: "22px 0 18px",
            fontFamily: FONTS.heading,
            fontSize: "clamp(20px, 5vw, 28px)",
            lineHeight: 1.8,
            color: COLORS.gold,
            fontStyle: "italic",
          }}
        >
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri."
        </p>

        <Divider />

        <p
          style={{
            margin: 0,
            fontFamily: FONTS.body,
            fontSize: "clamp(15px, 4vw, 18px)",
            lineHeight: 1.9,
            color: COLORS.cream,
            opacity: 0.75,
            fontStyle: "italic",
          }}
        >
          Semoga pernikahan ini menjadi awal perjalanan hidup yang penuh keberkahan, kasih sayang, dan kebahagiaan.
        </p>
      </div>
    </SectionShell>
  );
}

function CoupleCard({
  name,
  role,
  birthdate,
  parents,
  photo,
}: {
  name: string;
  role: string;
  birthdate: string;
  parents: string;
  photo: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "min(42vw, 180px)",
          height: "min(42vw, 180px)",
          minWidth: 130,
          minHeight: 130,
          margin: "0 auto 18px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(201,164,108,0.4)",
          background: "rgba(75,31,40,0.08)",
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <h3
        style={{
          margin: "0 0 4px",
          fontFamily: FONTS.script,
          fontSize: "clamp(32px, 8vw, 42px)",
          color: COLORS.maroon,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          margin: "0 0 10px",
          fontFamily: FONTS.ui,
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: COLORS.maroon,
          opacity: 0.65,
        }}
      >
        {role}
      </p>

      <p style={{ margin: "0 0 6px", fontFamily: FONTS.body, color: COLORS.maroon, lineHeight: 1.7 }}>
        {birthdate}
      </p>

      <p
        style={{
          margin: 0,
          fontFamily: FONTS.body,
          color: COLORS.maroon,
          opacity: 0.72,
          lineHeight: 1.7,
          fontStyle: "italic",
        }}
      >
        {parents}
      </p>
    </div>
  );
}

function CoupleSection() {
  return (
    <SectionShell background={BACKGROUNDS.light} light>
      <Title pre="Bismillahirrahmanirrahim" title="Groom & Bride" light />

      <div
        style={{
          padding: "28px 18px",
          borderRadius: 18,
          background: "rgba(30,12,14,0.05)",
          border: "1px solid rgba(75,31,40,0.12)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
          <CoupleCard
            name="D. Sukma Almansyah"
            role="Mempelai Pria"
            birthdate="25 Desember 1990"
            parents="(Alm) Ade Ibrahim & Ibu Yani Riyani"
            photo={IMAGE_GROOM}
          />

          <div style={{ textAlign: "center", fontFamily: FONTS.script, fontSize: 44, color: COLORS.maroon }}>
            &
          </div>

          <CoupleCard
            name="Tri Andini"
            role="Mempelai Wanita"
            birthdate="04 Maret 2002"
            parents="Bapak Nurohmat & Ibu Siti Mulyani"
            photo={IMAGE_BRIDE}
          />
        </div>
      </div>
    </SectionShell>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        minWidth: 72,
        padding: "14px 12px",
        borderRadius: 14,
        background: "linear-gradient(145deg, rgba(75,31,40,0.12), rgba(75,31,40,0.24))",
        border: "1px solid rgba(75,31,40,0.24)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.heading,
          fontSize: "clamp(28px, 7vw, 38px)",
          color: COLORS.maroon,
          lineHeight: 1,
          fontWeight: 600,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: FONTS.ui,
          fontSize: 9,
          color: COLORS.maroon,
          opacity: 0.6,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SaveTheDateSection() {
  const countdown = useCountdown(new Date("2026-04-26T09:00:00"));

  return (
    <SectionShell background={BACKGROUNDS.light} light>
      <Title pre="Save The Date" title="26 April 2026" light />

      <p
        style={{
          textAlign: "center",
          margin: "0 0 30px",
          fontFamily: FONTS.body,
          color: COLORS.maroon,
          opacity: 0.76,
          fontStyle: "italic",
          lineHeight: 1.8,
        }}
      >
        Kami akan memulai perjalanan baru sebagai suami dan istri pada hari yang berbahagia.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <CountdownBox value={countdown.days} label="Hari" />
        <CountdownBox value={countdown.hours} label="Jam" />
        <CountdownBox value={countdown.minutes} label="Menit" />
        <CountdownBox value={countdown.seconds} label="Detik" />
      </div>
    </SectionShell>
  );
}

const EVENTS = [
  {
    title: "Akad Nikah",
    subtitle: "Ijab Kabul",
    date: "Minggu, 26 April 2026",
    time: "09.00 WIB",
    address:
      "JL Al-Innayah Karang Ampel RT003/RW004 No.15\nKp Rawa Kalong\nDesa Karang Satria\nKecamatan Tambun Utara\nKabupaten Bekasi",
    mapsLink: "https://share.google/rB1z28aq7zzRBFh7p",
  },
  {
    title: "Resepsi Pernikahan",
    subtitle: "Wedding Reception",
    date: "Minggu, 26 April 2026",
    time: "10.00 WIB – Selesai",
    address:
      "JL Al-Innayah Karang Ampel RT003/RW004 No.15\nKp Rawa Kalong\nDesa Karang Satria\nKecamatan Tambun Utara\nKabupaten Bekasi",
    mapsLink: "https://share.google/rB1z28aq7zzRBFh7p",
  },
];

function EventCard({
  title,
  subtitle,
  date,
  time,
  address,
  mapsLink,
}: {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  address: string;
  mapsLink: string;
}) {
  return (
    <div
      style={{
        borderRadius: 20,
        padding: "24px 20px",
        background: "linear-gradient(145deg, rgba(75,31,40,0.58), rgba(42,22,24,0.82))",
        border: "1px solid rgba(201,164,108,0.22)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <img
          src={IMAGE_GUNUNGAN}
          alt=""
          style={{ width: 26, height: "auto", opacity: 0.85 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <h3 style={{ margin: 0, fontFamily: FONTS.heading, color: COLORS.gold, fontSize: 24 }}>
          {title}
        </h3>
      </div>

      <p
        style={{
          margin: "0 0 18px",
          fontFamily: FONTS.ui,
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: COLORS.cream,
          opacity: 0.55,
        }}
      >
        {subtitle}
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        <div>
          <p style={{ margin: "0 0 4px", fontFamily: FONTS.ui, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: COLORS.cream, opacity: 0.5 }}>
            Tanggal
          </p>
          <p style={{ margin: 0, fontFamily: FONTS.heading, color: COLORS.cream }}>{date}</p>
        </div>

        <div>
          <p style={{ margin: "0 0 4px", fontFamily: FONTS.ui, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: COLORS.cream, opacity: 0.5 }}>
            Waktu
          </p>
          <p style={{ margin: 0, fontFamily: FONTS.heading, color: COLORS.cream }}>{time}</p>
        </div>

        <div>
          <p style={{ margin: "0 0 4px", fontFamily: FONTS.ui, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: COLORS.cream, opacity: 0.5 }}>
            Lokasi
          </p>
          <p style={{ margin: 0, fontFamily: FONTS.heading, color: COLORS.cream, whiteSpace: "pre-line", lineHeight: 1.7 }}>
            {address}
          </p>
        </div>
      </div>

      <a
        href={mapsLink}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 18px",
          borderRadius: 999,
          border: "1px solid rgba(201,164,108,0.38)",
          color: COLORS.gold,
          textDecoration: "none",
          fontFamily: FONTS.ui,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Lihat Maps
      </a>
    </div>
  );
}

function WeddingEventsSection() {
  return (
    <SectionShell background={BACKGROUNDS.dark}>
      <Title pre="Waktu & Tempat" title="Detail Acara" />
      <div style={{ display: "grid", gap: 20 }}>
        {EVENTS.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </SectionShell>
  );
}

function RSVPSection() {
  const guestName = getGuestName();
  const [form, setForm] = useState({
    name: guestName !== "Tamu Undangan" ? guestName : "",
    attendance: "hadir",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionShell background={BACKGROUNDS.light} light>
      <Title title="Konfirmasi Kehadiran" light />

      {submitted ? (
        <div
          style={{
            textAlign: "center",
            padding: "28px 18px",
            borderRadius: 16,
            background: "rgba(75,31,40,0.08)",
            border: "1px solid rgba(75,31,40,0.18)",
          }}
        >
          <div style={{ fontSize: 34, marginBottom: 10 }}>🎊</div>
          <h3 style={{ margin: "0 0 10px", fontFamily: FONTS.heading, color: COLORS.maroon }}>
            Terima Kasih
          </h3>
          <p style={{ margin: 0, fontFamily: FONTS.body, color: COLORS.maroon, opacity: 0.76, lineHeight: 1.8 }}>
            Konfirmasi kehadiran Anda telah kami terima.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const existing = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
            existing.push({ ...form, submittedAt: new Date().toISOString() });
            localStorage.setItem("rsvp_responses", JSON.stringify(existing));
            setSubmitted(true);
          }}
          style={{ display: "grid", gap: 16 }}
        >
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Nama lengkap"
            required
            style={inputStyleLight}
          />

          <select
            value={form.attendance}
            onChange={(e) => setForm((p) => ({ ...p, attendance: e.target.value }))}
            style={inputStyleLight}
          >
            <option value="hadir">Ya, saya akan hadir</option>
            <option value="tidak">Maaf, saya tidak bisa hadir</option>
            <option value="mungkin">Mungkin hadir</option>
          </select>

          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            placeholder="Pesan & doa"
            style={{ ...inputStyleLight, resize: "none" }}
          />

          <button
            type="submit"
            style={{
              padding: "14px 20px",
              borderRadius: 999,
              border: "none",
              background: `linear-gradient(135deg, ${COLORS.maroon}, #6e2d38, ${COLORS.maroon})`,
              color: COLORS.cream,
              fontFamily: FONTS.ui,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Kirim Konfirmasi
          </button>
        </form>
      )}
    </SectionShell>
  );
}

const inputStyleLight: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(75,31,40,0.22)",
  background: "rgba(75,31,40,0.08)",
  color: COLORS.maroon,
  fontFamily: FONTS.body,
  fontSize: 16,
  boxSizing: "border-box",
  outline: "none",
};

const GIFTS = [
  { type: "Transfer Bank", title: "Bank BCA", name: "Tri Andini", number: "7391383778" },
  { type: "E-Wallet", title: "GoPay", name: "Tri Andini", number: "0857-1533-3423" },
];

function GiftCard({
  type,
  title,
  name,
  number,
}: {
  type: string;
  title: string;
  name: string;
  number: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      style={{
        padding: "22px 18px",
        borderRadius: 16,
        background: "linear-gradient(145deg, rgba(75,31,40,0.5), rgba(42,22,24,0.72))",
        border: "1px solid rgba(201,164,108,0.2)",
      }}
    >
      <p style={{ margin: 0, fontFamily: FONTS.ui, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: COLORS.cream, opacity: 0.45 }}>
        {type}
      </p>
      <h3 style={{ margin: "8px 0", fontFamily: FONTS.heading, color: COLORS.gold }}>{title}</h3>
      <p style={{ margin: "0 0 12px", fontFamily: FONTS.body, color: COLORS.cream }}>{name}</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 12px",
          borderRadius: 10,
          background: "rgba(201,164,108,0.08)",
          border: "1px solid rgba(201,164,108,0.18)",
        }}
      >
        <span style={{ fontFamily: FONTS.ui, color: COLORS.gold, fontWeight: 600 }}>{number}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(number).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(201,164,108,0.3)",
            background: "rgba(201,164,108,0.12)",
            color: COLORS.gold,
            fontFamily: FONTS.ui,
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
    </div>
  );
}

function WeddingGiftSection() {
  return (
    <SectionShell background={BACKGROUNDS.maroonGlow}>
      <Title pre="Wedding Gift" title="Hadiah Pernikahan" />

      <p
        style={{
          textAlign: "center",
          margin: "0 0 24px",
          fontFamily: FONTS.body,
          color: COLORS.cream,
          opacity: 0.74,
          lineHeight: 1.8,
          fontStyle: "italic",
        }}
      >
        Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin memberikan tanda kasih:
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        {GIFTS.map((gift) => (
          <GiftCard key={gift.title} {...gift} />
        ))}
      </div>
    </SectionShell>
  );
}

function ClosingSection() {
  return (
    <SectionShell background={BACKGROUNDS.dark}>
      <div style={{ textAlign: "center" }}>
        <img
          src={IMAGE_GUNUNGAN}
          alt="Gunungan"
          style={{
            width: "min(34vw, 120px)",
            minWidth: 72,
            display: "block",
            margin: "0 auto 22px",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <p
          style={{
            margin: "0 0 18px",
            fontFamily: FONTS.body,
            color: COLORS.cream,
            opacity: 0.78,
            lineHeight: 1.9,
            fontStyle: "italic",
          }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>

        <Divider />

        <p
          style={{
            margin: "0 0 8px",
            fontFamily: FONTS.ui,
            fontSize: 10,
            letterSpacing: "0.28em",
            color: COLORS.cream,
            opacity: 0.45,
            textTransform: "uppercase",
          }}
        >
          Kami yang berbahagia
        </p>

        <h2
          style={{
            margin: 0,
            fontFamily: FONTS.script,
            fontSize: "clamp(40px, 12vw, 62px)",
            color: COLORS.gold,
          }}
        >
          Alman &amp; Terii
        </h2>

        <p
          style={{
            margin: "8px 0 0",
            fontFamily: FONTS.heading,
            color: COLORS.gold,
            letterSpacing: "0.1em",
          }}
        >
          26 April 2026
        </p>
      </div>
    </SectionShell>
  );
}

function MusicButton({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const [playing, setPlaying] = useState(true);

  return (
    <button
      onClick={() => {
        if (!audioRef.current) return;
        if (playing) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {});
        }
        setPlaying(!playing);
      }}
      style={{
        position: "fixed",
        right: 16,
        bottom: 20,
        zIndex: 300,
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "1px solid rgba(201,164,108,0.35)",
        background: "rgba(42,22,24,0.92)",
        color: COLORS.gold,
        fontSize: 18,
        cursor: "pointer",
      }}
    >
      {playing ? "♫" : "♪"}
    </button>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#0d0508";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        margin: "0 auto",
        background: COLORS.dark,
        overflowX: "hidden",
        position: "relative",
        boxShadow: "0 0 60px rgba(0,0,0,0.35)",
      }}
    >
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      <AnimatePresence>
        {!isOpen && <OpeningCover onOpen={() => setIsOpen(true)} audioRef={audioRef} />}
      </AnimatePresence>

      {isOpen && (
        <>
          <MusicButton audioRef={audioRef} />
          <HeroSection />
          <QuranVerseSection />
          <CoupleSection />
          <SaveTheDateSection />
          <WeddingEventsSection />
          <RSVPSection />
          <WeddingGiftSection />
          <ClosingSection />
        </>
      )}
    </div>
  );
}