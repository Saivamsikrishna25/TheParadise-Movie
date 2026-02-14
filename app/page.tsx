"use client";

/* ================= IMPORTS ================= */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ======================================================
   FADE-IN SECTION COMPONENT
====================================================== */
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
}

/* ======================================================
   HOME PAGE
====================================================== */
export default function Home() {
  const router = useRouter();

  /* ================= COUNTDOWN DATE ================= */
  const releaseDate = new Date("2026-08-21T00:00:00").getTime();

  /* ================= STATE MANAGEMENT ================= */
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isMuted, setIsMuted] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("glimpses");
  const [currentPage, setCurrentPage] = useState("home");
  const [showReviews, setShowReviews] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState(initialReviews);
  const [logoError, setLogoError] = useState(false);
  const audioRef = useRef(null);

  /* ================= COUNTDOWN LOGIC ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = releaseDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ================= STICKY NAV ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= GOOGLE CALENDAR LINK ================= */
  const addToCalendar = () => {
    const eventDetails = {
      text: "THE PARADISE Movie Release",
      dates: "20260821T000000Z/20260821T010000Z",
      details:
        "THE PARADISE movie release starring Nani, directed by Srikanth Odela",
      location: "Theaters Worldwide",
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.text,
    )}&dates=${eventDetails.dates}&details=${encodeURIComponent(
      eventDetails.details,
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(calendarUrl, "_blank");
  };

  /* ================= SMOOTH SCROLL & PAGE NAVIGATION ================= */
  const scrollToSection = (id: string) => {
    setCurrentPage(id);
    setShowMobileMenu(false);

    if (id === "videos") {
      openVideosModal("glimpses");
      return;
    }

    setTimeout(() => {
      return document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  /* ================= OPEN VIDEOS MODAL ================= */
  const openVideosModal = (category = "glimpses") => {
    setSelectedCategory(category);
    setShowVideos(true);
    setShowMobileMenu(false);
  };

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = () => {
    if (!userName.trim() || !reviewText.trim() || userRating === 0) {
      alert("Please fill in your name, rating, and review!");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      name: userName,
      rating: userRating,
      review: reviewText,
      date: new Date().toLocaleDateString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=dc2626&color=fff&bold=true`,
    };

    setReviews([newReview, ...reviews]);
    setUserName("");
    setReviewText("");
    setUserRating(0);
    alert("Thank you for your review! 🎬");
  };

  /* ================= CALCULATE AVERAGE RATING ================= */
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <>
      {/* ================= BACKGROUND AUDIO - PARADISE OST ================= */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/TheParadiseThemeOst.mp3" type="audio/mpeg" />
      </audio>

      {/* ======================================================
         ENHANCED HAMBURGER MENU BUTTON (Top Left)
      ====================================================== */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-[70] bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-md border-2 border-red-400/30 rounded-xl p-3 md:p-4 hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 hover:scale-110 group"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5 w-5 md:w-6">
          <span
            className={`h-0.5 bg-white rounded-full transition-all duration-300 ${showMobileMenu ? "rotate-45 translate-y-2" : "w-full"}`}
          ></span>
          <span
            className={`h-0.5 bg-white rounded-full transition-all duration-300 ${showMobileMenu ? "opacity-0 w-0" : "w-5/6 ml-auto"}`}
          ></span>
          <span
            className={`h-0.5 bg-white rounded-full transition-all duration-300 ${showMobileMenu ? "-rotate-45 -translate-y-2" : "w-full"}`}
          ></span>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-md group-hover:bg-red-400/30 transition-all duration-300 -z-10"></div>
      </button>

      {/* ======================================================
         ENHANCED MOBILE MENU OVERLAY
      ====================================================== */}
      <div
        className={`fixed inset-0 z-[60] bg-gradient-to-br from-black via-red-950/30 to-black backdrop-blur-xl transition-all duration-500 overflow-y-auto ${
          showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative flex flex-col items-center justify-start min-h-screen gap-4 p-8 pt-24 pb-16">
          <div className="mb-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
              THE PARADISE
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          </div>

          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group flex items-center gap-4 text-xl md:text-3xl font-bold text-white hover:text-red-500 transition-all transform hover:scale-110 bg-white/5 hover:bg-red-500/20 px-8 py-3 rounded-2xl border border-white/10 hover:border-red-500/50 backdrop-blur-sm shadow-lg hover:shadow-red-500/30 w-full max-w-md ${
                showMobileMenu ? "animate-slideIn" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="relative">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
          ))}

          <div className="mt-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-center mb-4 text-red-500">
              📅 Quick Updates
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎬</span>
                  <div>
                    <p className="text-white font-bold">World Premiere</p>
                    <p className="text-gray-400 text-sm">August 20, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <p className="text-white font-bold">Worldwide Release</p>
                    <p className="text-gray-400 text-sm">August 21, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎤</span>
                  <div>
                    <p className="text-white font-bold">Pre-Release Event</p>
                    <p className="text-gray-400 text-sm">August 15, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
         STICKY NAVIGATION BAR (Desktop)
      ====================================================== */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-[65] bg-gradient-to-r from-black via-red-950/20 to-black backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-900/20 transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            THE PARADISE
          </h1>

          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-gray-300 hover:text-white transition-all font-semibold group ${
                  currentPage === item.id ? "text-red-500" : ""
                }`}
              >
                <span className="flex items-center gap-2">{item.name}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                    currentPage === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection("events")}
              className={`relative text-gray-300 hover:text-white transition-all font-semibold group ${
                currentPage === "events" ? "text-red-500" : ""
              }`}
            >
              <span className="flex items-center gap-2">Events</span>
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                  currentPage === "events" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================================
         HERO SECTION
      ====================================================== */}
      <section
        id="home"
        className="min-h-screen bg-fixed bg-center bg-cover relative overflow-hidden"
        style={{ backgroundImage: "url('/BIG_IMAGE.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 animate-gradientShift"></div>

        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 text-white">
          {/* Movie Logo with Fallback */}
          <div className="relative mb-4">
            {!logoError ? (
              <img
                src="/TheParadiselogo.jpg" // ✅ removed /public
                alt="The Paradise Logo"
                className="w-64 h-auto sm:w-80 md:w-96 lg:w-[450px] mx-auto drop-shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-pulse-glow object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-pulse-glow tracking-wider">
                THE PARADISE
              </h1>
            )}
          </div>

          <p
            className="mt-4 text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 animate-fadeInUp font-light tracking-wider px-4"
            style={{ animationDelay: "0.2s" }}
          >
            WELCOME to the WORLD of THE PARADISE
          </p>

          <div
            className="mt-6 px-4 sm:px-8 py-3 bg-gradient-to-r from-red-600/30 to-orange-600/30 border-2 border-red-500/50 rounded-full backdrop-blur-sm animate-fadeInUp shadow-lg shadow-red-500/20"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-xs sm:text-sm md:text-base text-red-400 font-bold tracking-wide flex items-center gap-2">
              <span className="text-lg sm:text-xl">🎬</span>
              <span className="whitespace-nowrap">
                Worldwide Release: August 21, 2026
              </span>
            </p>
          </div>

          <div
            className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex gap-3 sm:gap-4 md:gap-6 animate-fadeInUp px-2"
            style={{ animationDelay: "0.4s" }}
          >
            {Object.entries(timeLeft).map(([label, value], index) => (
              <div
                key={label}
                className="bg-gradient-to-br from-black/70 to-red-950/30 backdrop-blur-md border-2 border-red-500/30 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-center hover:scale-105 sm:hover:scale-110 transition-all duration-300 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/40 group cursor-pointer"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-black group-hover:text-red-500 transition-colors duration-300 tabular-nums">
                  {value}
                </p>
                <span className="text-xs uppercase text-gray-400 tracking-widest font-semibold mt-1 block group-hover:text-red-400 transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-10 sm:mt-14 flex gap-4 sm:gap-8 flex-col sm:flex-row animate-fadeInUp px-4 w-full max-w-2xl"
            style={{ animationDelay: "0.9s" }}
          >
            <button
              onClick={() => openVideosModal("glimpses")}
              className="relative flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold shadow-2xl hover:scale-105 sm:hover:scale-110 transform overflow-hidden group border-2 border-red-500/50 hover:border-red-400 w-full sm:w-auto text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 relative group-hover:scale-125 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span className="relative text-base sm:text-lg">
                WATCH VIDEOS
              </span>
            </button>

            <button
              onClick={addToCalendar}
              className="relative flex items-center justify-center gap-2 sm:gap-3 border-2 border-red-500/50 hover:border-red-500 bg-black/30 hover:bg-red-500/20 transition-all px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold hover:scale-105 sm:hover:scale-110 transform group backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-red-500/30 w-full sm:w-auto text-sm sm:text-base"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-base sm:text-lg">Add Reminder</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
         MOVIE DETAILS
      ====================================================== */}
      <section className="bg-gradient-to-b from-black via-red-950/5 to-black text-white py-20 px-6 border-t border-red-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {movieDetails.map((detail, index) => (
            <div
              key={detail.label}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DetailCard
                label={detail.label}
                value={detail.value}
                icon={detail.icon}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================
         STORY SECTION
      ====================================================== */}
      <FadeInSection>
        <section
          id="story"
          className="bg-gradient-to-b from-black via-red-950/10 to-black text-white py-24 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                The Story
              </h2>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Set in a ruthless land where power defines survival,
              <span className="text-white font-bold"> THE PARADISE </span>
              follows the rise of a man shaped by violence, rebellion, and
              destiny.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         EVENTS AND UPDATES SECTION
      ====================================================== */}
      <FadeInSection>
        <section
          id="events"
          className="bg-black text-white py-24 px-6 border-t border-red-500/20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                Upcoming Events & Updates
              </h2>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/30">
                <h3 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-3">
                  <span className="text-3xl">📅</span>
                  Events & Announcements
                </h3>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {eventsData.map((event, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-black/50 to-red-950/20 rounded-xl p-5 border border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0">
                          {event.icon}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold mb-1 group-hover:text-red-500 transition">
                            {event.title}
                          </h4>
                          <p className="text-red-400 text-sm mb-2 font-semibold">
                            {event.date}
                          </p>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {event.description}
                          </p>
                          {event.tag && (
                            <span className="inline-block mt-2 px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                              {event.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/30">
                <h3 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-3">
                  <span className="text-3xl">🎥</span>
                  Videos & Highlights
                </h3>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {eventsVideos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-black/50 to-red-950/20 rounded-xl overflow-hidden border border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={video.url}
                          allowFullScreen
                          title={video.title}
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-white group-hover:text-red-500 transition flex items-center gap-2">
                          <span className="text-red-500">▶</span>
                          {video.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         TRAILER SECTION
      ====================================================== */}
      <FadeInSection>
        <section id="trailer" className="bg-black text-white py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                RAW STATEMENT
              </h2>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-red-500/30 shadow-2xl hover:shadow-red-900/70 transition-all duration-500 hover:border-red-500 hover:scale-105 transform group">
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/6B2T6prycwk?si=zn7x1qS-a7SXeE01"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         CAST SECTION (PREVIEW - FIRST 4)
      ====================================================== */}
      <FadeInSection>
        <section
          id="cast"
          className="bg-gradient-to-b from-black via-red-950/10 to-black text-white py-24 px-4"
        >
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              The Cast
            </h2>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {cast.slice(0, 4).map((actor, index) => (
              <div
                key={actor.name}
                className="bg-gradient-to-b from-red-950/20 to-black rounded-2xl overflow-hidden text-center hover:scale-110 transition-all duration-300 group cursor-pointer border-2 border-red-500/20 hover:border-red-500 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={actor.img}
                    alt={actor.name}
                    className={`w-full h-full object-cover ${actor.position} group-hover:scale-125 transition duration-700`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                <div className="p-4 bg-gradient-to-b from-red-950/40 to-black">
                  <h3 className="font-bold text-lg group-hover:text-red-500 transition">
                    {actor.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{actor.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/cast")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-110 transform overflow-hidden border-2 border-red-500/50 hover:border-red-400"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative text-lg">VIEW MORE</span>
              <svg
                className="w-5 h-5 relative group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         GALLERY SECTION (PREVIEW - FIRST 4)
      ====================================================== */}
      <FadeInSection>
        <section id="gallery" className="bg-black text-white py-24 px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Gallery
            </h2>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fadeInUp shadow-lg hover:shadow-2xl hover:shadow-red-500/30 relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/gallery")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-110 transform overflow-hidden border-2 border-red-500/50 hover:border-red-400"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative text-lg">VIEW MORE</span>
              <svg
                className="w-5 h-5 relative group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         SOCIAL MEDIA SECTION
      ====================================================== */}
      <FadeInSection>
        <section className="bg-gradient-to-b from-black via-red-950/10 to-black text-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                Follow Us
              </h2>
              <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            </div>

            <div className="flex justify-center gap-8 flex-wrap">
              <a
                href="https://www.instagram.com/theparadisemovie/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-gradient-to-b from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="font-bold text-lg group-hover:text-red-500 transition">
                  Instagram
                </span>
              </a>

              <a
                href="https://x.com/TheParadiseOffl"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-gradient-to-b from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="font-bold text-lg group-hover:text-red-500 transition">
                  X (Twitter)
                </span>
              </a>

              <a
                href="https://in.bookmyshow.com/movies/hyderabad/the-paradise/ET00436621"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-gradient-to-b from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                  <img
                    src="https://p7.hiclipart.com/preview/919/445/291/bookmyshow-office-android-ticket-android.jpg"
                    alt="BookMyShow"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="font-bold text-lg group-hover:text-red-500 transition">
                  BookMyShow
                </span>
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ======================================================
         VIDEOS MODAL
      ====================================================== */}
      {showVideos && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn">
          <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => setShowVideos(false)}
                className="fixed top-6 right-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:from-red-500 hover:to-red-700 transition-all duration-300 z-50 hover:rotate-90 hover:scale-110 shadow-lg shadow-red-900/50 border-2 border-red-400/30"
              >
                ✕
              </button>

              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Videos & Media
                </h2>
                <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {videoCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-110 animate-fadeInUp border-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-500/50 border-red-400"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/20 hover:border-red-500/50"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-xl mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                {(
                  videoData[selectedCategory as keyof typeof videoData] || []
                ).map(
                  (video: { title: string; url: string }, index: number) => (
                    <div
                      key={index}
                      className="space-y-3 bg-gradient-to-b from-red-950/20 to-black rounded-2xl p-5 border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-105 animate-fadeInUp shadow-lg hover:shadow-2xl hover:shadow-red-500/30"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="text-white text-lg font-bold flex items-center gap-2">
                        <span className="text-red-500">▶</span>
                        {video.title}
                      </h3>
                      <div className="aspect-video rounded-xl overflow-hidden border-2 border-red-500/30">
                        <iframe
                          className="w-full h-full"
                          src={video.url}
                          allowFullScreen
                          title={video.title}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
         FOOTER
      ====================================================== */}
      <footer className="bg-gradient-to-b from-black to-red-950/20 text-gray-400 text-center py-10 text-sm border-t border-red-500/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <h3 className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
              THE PARADISE
            </h3>
            <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowReviews(true)}
              className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 hover:scale-110 transform shadow-xl hover:shadow-2xl hover:shadow-red-500/50 border-2 border-red-400/50 overflow-hidden text-sm sm:text-base"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="text-xl sm:text-2xl relative">🔥</span>
              <div className="relative text-left">
                <span className="block text-base sm:text-lg font-black">
                  HYPE METER
                </span>
                <span className="block text-xs font-normal opacity-90">
                  See what fans are saying!
                </span>
              </div>
              <div className="relative flex items-center gap-1 bg-black/30 px-2 sm:px-3 py-1 rounded-full">
                <span className="text-yellow-400 text-sm sm:text-base">⭐</span>
                <span className="font-black text-base sm:text-lg">
                  {averageRating}
                </span>
                <span className="text-xs opacity-75">/ 5</span>
              </div>
            </button>
          </div>

          <p className="mb-2 text-gray-300">Made with ❤️ for THE PARADISE</p>
          <p className="text-xs text-gray-500 mb-4">
            Fan Made Website • Not affiliated with official movie promotions
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-600">
            <span>© 2026 THE PARADISE</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>

      {/* ======================================================
         REVIEWS / HYPE METER MODAL - MOBILE OPTIMIZED
      ====================================================== */}
      {showReviews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl animate-fadeIn overflow-y-auto"
          onClick={() => setShowReviews(false)}
        >
          <div
            className="bg-gradient-to-br from-red-950/40 to-black rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden border-2 border-red-500/30 shadow-2xl shadow-red-900/50 animate-modalSlideUp my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 border-b border-red-500/30 p-4 sm:p-6">
              <button
                onClick={() => setShowReviews(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border-2 border-red-400/50 hover:scale-110 hover:rotate-90"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center pr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl">🔥</span>
                  <span>HYPE METER</span>
                  <span className="text-3xl sm:text-4xl">🔥</span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-lg mb-3 sm:mb-4 px-2">
                  What are fans saying about THE PARADISE?
                </p>

                {/* Average Rating Display - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-black/30 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-red-500/30 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                      {averageRating}
                    </div>
                    <div className="flex gap-0.5 sm:gap-1 justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg sm:text-2xl ${parseFloat(averageRating) >= star ? "text-yellow-400" : "text-gray-600"}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Average Rating
                    </p>
                  </div>
                  <div className="hidden sm:block h-16 w-px bg-red-500/30"></div>
                  <div className="sm:hidden w-16 h-px bg-red-500/30"></div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                      {reviews.length}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Total Reviews
                    </p>
                  </div>
                  <div className="hidden sm:block h-16 w-px bg-red-500/30"></div>
                  <div className="sm:hidden w-16 h-px bg-red-500/30"></div>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-1">
                      {reviews.filter((r) => r.rating >= 4).length}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Hyped Fans! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body - Mobile Optimized */}
            <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(95vh-280px)]">
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Side - Submit Review */}
                <div className="bg-gradient-to-br from-red-950/30 to-black/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-red-500/30">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">✍️</span>
                    Share Your Hype!
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-gray-300 text-xs sm:text-sm font-semibold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name..."
                        className="w-full bg-black/50 border-2 border-red-500/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-xs sm:text-sm font-semibold mb-2">
                        Your Rating
                      </label>
                      <div className="flex gap-1 sm:gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="text-3xl sm:text-4xl transition-transform hover:scale-125"
                          >
                            <span
                              className={
                                star <= (hoverRating || userRating)
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }
                            >
                              ⭐
                            </span>
                          </button>
                        ))}
                      </div>
                      {userRating > 0 && (
                        <p className="text-red-400 text-xs sm:text-sm mt-2 font-semibold">
                          {userRating === 5
                            ? "🔥 Maximum Hype!"
                            : userRating === 4
                              ? "🎉 Super Excited!"
                              : userRating === 3
                                ? "👍 Looking Good!"
                                : userRating === 2
                                  ? "🤔 Somewhat Interested"
                                  : "😐 Not Sure Yet"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-xs sm:text-sm font-semibold mb-2">
                        Your Review
                      </label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="What are you most excited about? Share your thoughts..."
                        rows={4}
                        className="w-full bg-black/50 border-2 border-red-500/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition resize-none"
                      />
                    </div>

                    <button
                      onClick={submitReview}
                      className="w-full group relative bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-red-500/50 border-2 border-red-400/50 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                      <span className="relative flex items-center justify-center gap-2 text-base sm:text-lg">
                        <span>🚀</span>
                        Submit Your Hype!
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Side - Reviews List */}
                <div className="bg-gradient-to-br from-red-950/30 to-black/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-red-500/30">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">💬</span>
                    Fan Reviews ({reviews.length})
                  </h3>

                  <div className="space-y-3 sm:space-y-4 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-black/40 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-[1.02] group"
                      >
                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-red-500/30 group-hover:border-red-500 transition flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 gap-2">
                              <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-red-400 transition truncate">
                                {review.name}
                              </h4>
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`text-xs sm:text-sm ${star <= review.rating ? "text-yellow-400" : "text-gray-600"}`}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {review.review}
                        </p>
                      </div>
                    ))}

                    {reviews.length === 0 && (
                      <div className="text-center py-8 sm:py-12">
                        <span className="text-5xl sm:text-6xl mb-3 sm:mb-4 block">
                          🎬
                        </span>
                        <p className="text-gray-400 text-base sm:text-lg">
                          Be the first to share your hype!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOM STYLES ================= */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 30px rgba(239, 68, 68, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(239, 68, 68, 1));
          }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-modalSlideUp {
          animation: modalSlideUp 0.3s ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #b91c1c);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #991b1b);
        }
      `}</style>
    </>
  );
}

/* ======================================================
   DETAIL CARD COMPONENT
====================================================== */
function DetailCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-gradient-to-br from-red-950/20 to-black rounded-2xl p-6 border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 group">
      <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-gray-400 text-sm uppercase tracking-wider mb-2 group-hover:text-red-400 transition font-semibold">
        {label}
      </p>
      <p className="text-lg font-bold group-hover:text-white transition">
        {value}
      </p>
    </div>
  );
}

const menuItems = [
  { id: "home", name: "Home" },
  { id: "story", name: "Story" },
  { id: "cast", name: "Cast" },
  { id: "gallery", name: "Gallery" },
  { id: "videos", name: "Videos" },
  { id: "trailer", name: "Trailer" },
];

const movieDetails = [
  { label: "Genre", value: "Action • Drama", icon: "🎭" },
  { label: "Director", value: "Srikanth Odela", icon: "🎬" },
  { label: "Language", value: "Telugu", icon: "🗣️" },
  { label: "Release Date", value: "21 August 2026", icon: "📅" },
  { label: "Runtime", value: "TBA", icon: "⏱️" },
  { label: "Production", value: "SLV Cinemas", icon: "🎥" },
];

const cast = [
  { name: "Nani", role: "Jadal", img: "/nani.jpg", position: "object-center" },
  {
    name: "Kayadu Lohar",
    role: "Lead Actress",
    img: "/kayadu.jpg",
    position: "object-center",
  },
  {
    name: "Mohan Babu",
    role: "Shikanja Malik",
    img: "/mohanbabu.jpg",
    position: "object-top",
  },
  {
    name: "Raghav Juyal",
    role: "Antagonist",
    img: "/raghav.jpg",
    position: "object-center",
  },
  {
    name: "Sampoornesh Babu",
    role: "Biryani",
    img: "/sampoornesh.jpg",
    position: "object-center",
  },
];

const galleryImages = [
  { id: 1, src: "/img1.jpg", alt: "THE PARADISE Gallery Image 1" },
  { id: 2, src: "/img2.jpg", alt: "THE PARADISE Gallery Image 2" },
  { id: 4, src: "/img4.jpg", alt: "THE PARADISE Gallery Image 4" },
  { id: 12, src: "/img12.jpg", alt: "THE PARADISE Gallery Image 12" },
  { id: 3, src: "/img3.jpg", alt: "THE PARADISE Gallery Image 3" },
  { id: 5, src: "/img5.jpg", alt: "THE PARADISE Gallery Image 5" },
  { id: 6, src: "/img6.jpg", alt: "THE PARADISE Gallery Image 6" },
  { id: 7, src: "/img7.jpg", alt: "THE PARADISE Gallery Image 7" },
  { id: 8, src: "/img8.jpg", alt: "THE PARADISE Gallery Image 8" },
  { id: 9, src: "/img9.jpg", alt: "THE PARADISE Gallery Image 9" },
  { id: 10, src: "/img10.jpg", alt: "THE PARADISE Gallery Image 10" },
  { id: 11, src: "/img11.jpg", alt: "THE PARADISE Gallery Image 11" },
];

const videoCategories = [
  { id: "glimpses", name: "Glimpses", icon: "👁️" },
  { id: "songs", name: "Songs", icon: "🎵" },
  { id: "teasers", name: "Teasers", icon: "🎬" },
  { id: "trailers", name: "Trailers", icon: "🎥" },
  { id: "osts", name: "OSTs", icon: "🎼" },
  { id: "interviews", name: "Interviews", icon: "🎤" },
];

const videoData: Record<string, Array<{ title: string; url: string }>> = {
  glimpses: [
    {
      title: "Raw Statement - Telugu",
      url: "https://www.youtube.com/embed/NkZFnpDhdCk",
    },
    {
      title: "Raw Statement - Hindi",
      url: "https://www.youtube.com/embed/namFQ8wFdIA?si=pC6WdOGb2lLQaYMQ",
    },
    {
      title: "Raw Statement - Tamil",
      url: "https://www.youtube.com/embed/r2Yf6LLewuc?si=auF9nGxsSvFG1m2H",
    },
    {
      title: "Raw Statement - Malayalam",
      url: "https://www.youtube.com/embed/4rXvKsrbSAQ?si=jCNIuHmD3Gl0J5pJ",
    },
    {
      title: "Raw Statement - Kannada",
      url: "https://www.youtube.com/embed/ETIky7mX2pw?si=cPGcTWHg2ociP8jo",
    },
    {
      title: "Raw Statement - English",
      url: "https://www.youtube.com/embed/6B2T6prycwk?si=WjSuC7qvgtKxPcXk",
    },
    {
      title: "Raw Statement - Spanish",
      url: "https://www.youtube.com/embed/bb-pfn9P9x4?si=w3bQpVFIm9W17Dhj",
    },
    {
      title: "Raw Statement - Bengali",
      url: "https://www.youtube.com/embed/W-odwBGjeog?si=am9cYV4ffPly0QLh",
    },
    {
      title: "Spark of THE PARADISE",
      url: "https://www.youtube.com/embed/Wgy3Lear20s?si=qoFfPfWtgv1hBWGO",
    },
    {
      title: "Onboard of Raghav Juyal",
      url: "https://www.youtube.com/embed/YPyPmoAXrDg?si=wVioA-lhbr28Z-M6",
    },
    {
      title: "Director Srikanth Odela's Statement",
      url: "https://www.youtube.com/embed/VUIHLOUZSdM?si=djmHD3meOZzaFqCo",
    },
  ],
  songs: [
    {
      title: "THE PARADISE Theme Song",
      url: "https://www.youtube.com/embed/kdARaqbilgo?si=SpAulGQn-poFad8b",
    },
  ],
  teasers: [
    {
      title: "Official Teaser",
      url: "https://www.youtube.com/embed/NkZFnpDhdCk",
    },
  ],
  trailers: [
    {
      title: "Official Trailer",
      url: "https://www.youtube.com/embed/NkZFnpDhdCk",
    },
  ],
  osts: [
    {
      title: "THE PARADISE OST",
      url: "https://www.youtube.com/embed/kdARaqbilgo?si=SpAulGQn-poFad8b",
    },
  ],
  interviews: [],
};

const eventsData = [
  {
    icon: "🎵",
    title: "1st Song Release - #AayaSher",
    date: "Feb 24, 2026",
    description:
      "Official release of the first song from THE PARADISE soundtrack.",
    tag: "ENTERTAINMENT",
  },
  {
    icon: "🎤",
    title: "Anirudh Concert",
    date: "March 15, 2026",
    description:
      "Experience the music of THE PARADISE live with Anirudh performing his compositions.",
    tag: "MUSIC EVENT",
  },
  {
    icon: "🎬",
    title: "World Premiere",
    date: "August 20, 2026",
    description:
      "Join us for the exclusive world premiere of THE PARADISE featuring the cast and crew.",
    tag: "UPCOMING",
  },
  {
    icon: "🎭",
    title: "Worldwide Theatrical Release",
    date: "August 21, 2026",
    description:
      "THE PARADISE releases in theaters worldwide. Book your tickets now!",
    tag: "MAJOR EVENT",
  },
  {
    icon: "🎤",
    title: "Pre-Release Event",
    date: "August 15, 2026",
    description:
      "Meet the cast and crew at the official pre-release event in Hyderabad.",
    tag: "UPCOMING",
  },
  {
    icon: "🎥",
    title: "Behind The Scenes Screening",
    date: "August 7, 2026",
    description: "Get an exclusive look at the making of THE PARADISE.",
    tag: "SPECIAL",
  },
  {
    icon: "🏆",
    title: "Special Screening for Critics",
    date: "August 17, 2026",
    description:
      "Critics and media get first look at THE PARADISE before public release.",
    tag: "EXCLUSIVE",
  },
];

const eventsVideos = [
  {
    title: "Spark of THE PARADISE",
    url: "https://www.youtube.com/embed/Wgy3Lear20s",
    description: "First glimpse announcement video",
  },
  {
    title: "Raw Statement - Telugu",
    url: "https://www.youtube.com/embed/NkZFnpDhdCk",
    description: "Official raw statement release",
  },
  {
    title: "Director's Vision",
    url: "https://www.youtube.com/embed/VUIHLOUZSdM",
    description: "Srikanth Odela shares his vision",
  },
  {
    title: "Raghav Juyal Joins THE PARADISE",
    url: "https://www.youtube.com/embed/YPyPmoAXrDg",
    description: "Announcement of antagonist role",
  },
  {
    title: "THE PARADISE Theme Song",
    url: "https://www.youtube.com/embed/kdARaqbilgo",
    description: "Official theme music video",
  },
  {
    title: "Raw Statement - Hindi",
    url: "https://www.youtube.com/embed/namFQ8wFdIA",
    description: "Hindi version release",
  },
];

const initialReviews = [
  {
    id: 1,
    name: "BhuviSuri",
    rating: 5,
    review:
      "After watching the raw statement, I'm completely blown away! Nani's transformation looks incredible. This is going to be a game-changer for Telugu cinema! 🔥",
    date: "Feb 10, 2026",
    avatar:
      "https://ui-avatars.com/api/?name=Bhuvi+Suri&background=dc2626&color=fff&bold=true",
  },
];
