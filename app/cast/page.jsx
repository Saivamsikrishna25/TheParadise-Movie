"use client";

/* ================= IMPORTS ================= */
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ======================================================
   CAST & CREW PAGE - WITH TAB NAVIGATION
====================================================== */
export default function CastPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("cast");
  const [selectedCrew, setSelectedCrew] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ======================================================
         HEADER WITH BACK BUTTON
      ====================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-black via-red-950/20 to-black backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-900/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all font-semibold group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            THE PARADISE
          </h1>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* ======================================================
         MAIN CONTENT
      ====================================================== */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Cast & Crew
            </h2>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            <p className="mt-4 text-gray-400">
              {activeTab === "cast" 
                ? "Click on any cast member to know more" 
                : "Click on any crew member to see their past works"}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("cast")}
              className={`relative px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 border-2 ${
                activeTab === "cast"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-500/50 border-red-400"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/20 hover:border-red-500/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">🎭</span>
                Cast
              </span>
            </button>

            <button
              onClick={() => setActiveTab("crew")}
              className={`relative px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 border-2 ${
                activeTab === "crew"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl shadow-red-500/50 border-red-400"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/20 hover:border-red-500/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">🎬</span>
                Crew
              </span>
            </button>
          </div>

          {/* CAST GRID */}
          {activeTab === "cast" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 animate-fadeIn">
              {cast.map((actor, index) => (
                <a
                  key={actor.name}
                  href={actor.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-b from-red-950/20 to-black rounded-2xl overflow-hidden text-center hover:scale-110 transition-all duration-300 group cursor-pointer border-2 border-red-500/20 hover:border-red-500 shadow-lg hover:shadow-2xl hover:shadow-red-500/30 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={actor.img}
                      alt={actor.name}
                      className={`w-full h-full object-cover ${actor.position} group-hover:scale-125 transition duration-700`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        View Wikipedia
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-b from-red-950/40 to-black">
                    <h3 className="font-bold text-lg group-hover:text-red-500 transition">
                      {actor.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{actor.role}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* CREW GRID */}
          {activeTab === "crew" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-fadeIn">
              {crew.map((member, index) => (
                <div
                  key={member.name}
                  onClick={() => setSelectedCrew(member)}
                  className="bg-gradient-to-br from-red-950/20 to-black rounded-2xl overflow-hidden border-2 border-red-500/20 hover:border-red-500 transition-all duration-300 hover:scale-105 group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-500/30 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Crew Member Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-red-900/20 to-black">
                    <img
                      src={member.img}
                      alt={member.name}
                      className={`w-full h-full object-cover ${member.imgPosition || 'object-center'} group-hover:scale-110 transition duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-600/40 to-red-800/40 rounded-full flex items-center justify-center border-2 border-red-500/50 text-2xl backdrop-blur-sm">
                          {member.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-0.5 group-hover:text-red-400 transition truncate">
                            {member.name}
                          </h3>
                          <p className="text-red-400 text-sm font-semibold">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-gradient-to-b from-red-950/30 to-black">
                    {member.description && (
                      <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                    )}
                    <div className="mt-3 flex items-center justify-center gap-2 text-red-400 text-sm font-semibold group-hover:text-red-300 transition">
                      <span>View Filmography</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ======================================================
         CREW MODAL - SHOWS PAST WORKS
      ====================================================== */}
      {selectedCrew && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCrew(null)}
        >
          <div 
            className="bg-gradient-to-br from-red-950/40 to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-red-500/30 shadow-2xl shadow-red-900/50 animate-modalSlideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="aspect-[3/1] relative overflow-hidden">
                <img
                  src={selectedCrew.img}
                  alt={selectedCrew.name}
                  className={`w-full h-full object-cover ${selectedCrew.imgPosition || 'object-center'} opacity-40 blur-sm scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
              </div>
              
              <button
                onClick={() => setSelectedCrew(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all backdrop-blur-sm border-2 border-red-400/50 hover:scale-110"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end gap-4 md:gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-600/40 to-red-800/40 rounded-full flex items-center justify-center border-4 border-red-500/50 text-4xl md:text-5xl backdrop-blur-sm flex-shrink-0">
                    {selectedCrew.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-2 truncate">
                      {selectedCrew.name}
                    </h2>
                    <p className="text-red-400 text-lg md:text-xl font-bold">{selectedCrew.role}</p>
                    {selectedCrew.description && (
                      <p className="text-gray-300 text-sm md:text-base mt-2">{selectedCrew.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body - Past Works */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-300px)]">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="text-3xl">{selectedCrew.icon}</span>
                Past Works
              </h3>

              <div className="space-y-3">
                {selectedCrew.pastWorks.map((work, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-red-950/30 to-black/50 rounded-xl p-4 border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-[1.02] group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition">
                          {work.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{work.year}</p>
                        {work.note && (
                          <p className="text-red-400 text-xs mt-2 font-semibold">{work.note}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center text-red-400 group-hover:bg-red-600/40 transition">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCrew.awards && selectedCrew.awards.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    Awards & Recognition
                  </h3>
                  <div className="space-y-2">
                    {selectedCrew.awards.map((award, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-yellow-900/20 to-black/50 rounded-lg p-3 border border-yellow-600/20 hover:border-yellow-600/50 transition-all"
                      >
                        <p className="text-yellow-400 text-sm font-semibold">{award}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOM STYLES ================= */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s ease-out forwards;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #dc2626, #991b1b);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ef4444, #dc2626);
        }
      `}</style>
    </div>
  );
}

/* ======================================================
   CAST DATA WITH WIKIPEDIA LINKS
====================================================== */
const cast = [
  { 
    name: "Nani", 
    role: "Jadal", 
    img: "/nani.jpg", 
    position: "object-center",
    wikipedia: "https://en.wikipedia.org/wiki/Nani_(actor)"
  },
  { 
    name: "Kayadu Lohar", 
    role: "Lead Actress", 
    img: "/kayadu.jpg", 
    position: "object-center",
    wikipedia: "https://en.wikipedia.org/wiki/Kayadu_Lohar"
  },
  { 
    name: "Mohan Babu", 
    role: "Shikanja Malik", 
    img: "/mohanbabu.jpg", 
    position: "object-top",
    wikipedia: "https://en.wikipedia.org/wiki/Mohan_Babu"
  },
  { 
    name: "Raghav Juyal", 
    role: "Antagonist", 
    img: "/raghav.jpg", 
    position: "object-center",
    wikipedia: "https://en.wikipedia.org/wiki/Raghav_Juyal"
  },
  { 
    name: "Sampoornesh Babu", 
    role: "Biryani", 
    img: "/sampoornesh.jpg", 
    position: "object-center",
    wikipedia: "https://en.wikipedia.org/wiki/Sampoornesh_Babu"
  },
  { 
    name: "Sonali Kulkarni", 
    role: "Jadal's Mother", 
    img: "/sonalikulkarni.jpg", 
    position: "object-center",
    wikipedia: "https://en.wikipedia.org/wiki/Sonali_Kulkarni"
  },
];

/* ======================================================
   CREW DATA WITH IMAGES AND PAST WORKS
   Updated with imgPosition property for face-focused cropping
====================================================== */
const crew = [
  {
    name: "Srikanth Odela",
    role: "Director",
    icon: "🎬",
    description: "Visionary director bringing THE PARADISE to life",
    img: "/SrikanthOdela.jpg",
    imgPosition: "object-center", // Keep as is
    pastWorks: [
      { title: "Dasara", year: "2023", note: "Directorial Debut - Blockbuster Hit" },
      { title: "Rangasthalam", year: "2018", note: "Assistant Director" },
      { title: "Nannaku Prematho", year: "2016", note: "Assistant Director" },
    ],
    awards: [
      "Filmfare Award for Best Director - Dasara (2023)",
      "SIIMA Award for Best Debut Director (2023)"
    ]
  },
  {
    name: "Sudhakar Cherukuri",
    role: "Producer",
    icon: "🎥",
    description: "Producer under SLV Cinemas banner",
    img: "/SudhakarCherukuri.jpg",
    imgPosition: "object-center", // Keep as is
    pastWorks: [
      { title: "Bhartha Mahasayulaku Wignyapthi", year: "2026", note: "Producer" },
      { title: "Dasara", year: "2023", note: "Producer - Blockbuster" },
      { title: "Padi Padi Leeche Manasu", year: "2018", note: "Producer" },
    ],
  },
  {
    name: "Anirudh Ravichander",
    role: "Music Director",
    icon: "🎵",
    description: "Composing the powerful soundtrack",
    img: "/img6.jpg",
    imgPosition: "object-center", // Keep as is
    pastWorks: [
      { title: "Jawan", year: "2023", note: "Hindi Blockbuster" },
      { title: "Jailer", year: "2023", note: "With Rajinikanth" },
      { title: "Vikram", year: "2022", note: "Blockbuster Album" },
      { title: "Jersey", year: "2019", note: "National Award Winner" },
      { title: "Nanis Gang Leader", year: "2019", note: "Hit Soundtrack" },
      { title: "3", year: "2012", note: "Debut - 'Why This Kolaveri Di'" },
    ],
    awards: [
      "Filmfare Award for Best Music Director (Multiple)",
      "SIIMA Awards (10 wins)",
      "Edison Awards (6 wins)"
    ]
  },
  {
    name: "Ch Sai",
    role: "Cinematographer",
    icon: "📹",
    description: "Director of Photography",
    img: "/ChSai.jpg",
    imgPosition: "object-[center_20%]", // Adjusted to focus on face - 20% from top
    pastWorks: [
      { title: "Amaran", year: "2022", note: "Cinematographer" },
    ],
  },
  {
    name: "Naveen Nooli",
    role: "Editor",
    icon: "✂️",
    description: "Crafting the narrative through editing",
    img: "/NaveenNooli.jpg",
    imgPosition: "object-[center_25%]", // Adjusted to focus on face - 25% from top
    pastWorks: [
      { title: "Pushpa 2: The Rule", year: "2024", note: "Upcoming Biggie" },
      { title: "Dasara", year: "2023", note: "National Award Winner" },
      { title: "Jersey", year: "2019", note: "National Award Winner" },
      { title: "Rangasthalam", year: "2018", note: "Blockbuster Hit" },
      { title: "Bharat Ane Nenu", year: "2018", note: "Political Drama" },
      { title: "Aravindha Sametha", year: "2018", note: "Action Drama" },
      { title: "Nannaku Prematho", year: "2016", note: "Nandi Award Winner" },
    ],
    awards: [
      "National Film Award for Best Editing - Jersey (2019)",
      "Nandi Award for Best Editor (2 wins)"
    ]
  },
  {
    name: "Avinash Kolla",
    role: "Production Designer",
    icon: "🎨",
    description: "Creating the visual world of THE PARADISE",
    img: "/AvinashKolla.jpg",
    imgPosition: "object-[center_30%]", // Adjusted to focus on face - 30% from top
    pastWorks: [
      { title: "Sita Ramam", year: "2022", note: "Period Design" },
      { title: "Jersey", year: "2019", note: "Realistic Sets" },
      { title: "Mahanati", year: "2018", note: "Award-Winning Design" },
      { title: "Baahubali 2", year: "2017", note: "Epic Production" },
      { title: "Rangasthalam", year: "2018", note: "Period Village Set" },
    ],
    awards: [
      "Filmfare Award for Best Production Design",
      "SIIMA Award for Best Art Direction"
    ]
  },
  {
    name: "Shivam C Kabilan",
    role: "Publicity Designer",
    icon: "🎨",
    description: "Designing striking and innovative publicity materials including posters and promotional visuals",
    img: "/Kabilan.jpg",
    imgPosition: "object-center", // Keep as is
    pastWorks: [
      { title: "Dasara", year: "2023", note: "Award-Winning Posters" },
      { title: "Kabali", year: "2016", note: "Stylized Mass Posters" },
      { title: "Kaala", year: "2018", note: "Bold Political Visual Design" },
      { title: "Master", year: "2021", note: "High-Impact Commercial Posters" },
      { title: "Vikram", year: "2022", note: "Dark Thematic Publicity Design" },
    ],
  },
  {
    name: "Vamsi Shekar",
    role: "Public Relations",
    icon: "📢",
    description: "Managing publicity and promotions",
    img: "/PRO.jpg",
    imgPosition: "object-[center_35%]", // Adjusted to focus on face - 35% from top
    pastWorks: [
      { title: "RRR", year: "2022", note: "Global Campaign" },
      { title: "Pushpa", year: "2021", note: "Pan-India Marketing" },
      { title: "Baahubali 2", year: "2017", note: "Massive Promotions" },
    ],
  }
];