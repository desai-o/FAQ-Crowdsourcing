import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

/* ── Reusable SVG icon component matching sidebar style ── */
const Icon = ({ d, size = 18, extra = null }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d={d} />
    {extra}
  </svg>
);

/* ── Icon path definitions (matching sidebar aesthetic) ── */
const ICONS = {
  pencil:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
  pencilTip:   "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  pin:         "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
  pinDot:      "M12 10m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  users:       "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
  userCircle:  "M9 7 a4 4 0 1 0 8 0 a4 4 0 1 0-8 0",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
  mailChevron: "M22 6l-10 7L2 6",
  file:        "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
  fileCorner:  "M14 2v6h6",
  eye:         "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
  eyeDot:      "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  thumbUp:     "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
  msgPlus:     "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2z",
  send:        "M22 2L11 13",
  sendLines:   "M22 2L15 22 11 13 2 9l20-7z",
  comment:     "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2z",
  grid:        null,
  chart:       "M18 20V10M12 20V4M6 20v-6",
  medal:       "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
  settings:    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  chevronRight:"M9 18l6-6-6-6",
  bookmark:    "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  clock:       "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  clockHands:  "M12 6v6l4 2",
  trophy:      "M8 21h8M12 17v4M17 4H7l1 7a4 4 0 0 0 8 0l1-7z",
  trophyCup:   "M5 4h14M5 4a2 2 0 0 0 0 4h14a2 2 0 0 0 0-4",
  star:        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  rocket:      "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
  rocketBody:  "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10",
  flame:       "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  target:      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
  targetMid:   "M12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z",
  targetDot:   "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
};

/* ── Grid icon (special: uses rects not path) ── */
const GridIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

/* ── Medal icon (circle + ribbon) ── */
const MedalIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="14" r="6"/><path d="M8 6l-2-4h12l-2 4"/>
    <path d="M9.5 6l2.5 4 2.5-4"/>
  </svg>
);

/* ── Rocket icon (compound) ── */
const RocketIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 2S7 5 7 12l5 5c7 0 10-5 10-5S19 2 12 2z"/>
    <circle cx="13" cy="11" r="1" fill={color} stroke="none"/>
  </svg>
);

/* ── Target icon (compound) ── */
const TargetIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

/* ── Clock icon (compound) ── */
const ClockIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

/* ── Eye icon (compound) ── */
const EyeIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

/* ── Pencil icon (compound) ── */
const PencilIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

/* ── Users icon (matches sidebar exactly) ── */
const UsersIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

/* ── Mail icon ── */
const MailIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

/* ── MapPin icon ── */
const MapPinIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ── Trophy icon (compound) ── */
const TrophyIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 2h16"/>
    <rect x="6" y="2" width="12" height="13" rx="2"/>
    <path d="M15 22H9"/>
    <path d="M10 15v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4"/>
  </svg>
);

/* ── Star icon ── */
const StarIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Flame icon ── */
const FlameIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

/* ── Shield icon ── */
const ShieldIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

/* ── Bookmark icon (matches sidebar) ── */
const BookmarkIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

/* ── File icon (matches sidebar) ── */
const FileIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

/* ── Send icon ── */
const SendIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

/* ── MessageCircle icon ── */
const MessageCircleIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2z"/>
  </svg>
);

/* ── ThumbsUp icon ── */
const ThumbsUpIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);

/* ── BarChart icon ── */
const BarChartIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

/* ── Settings icon (matches sidebar style) ── */
const SettingsIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

/* ── ChevronRight ── */
const ChevronRightIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

/* ── MessagePlus icon ── */
const MessagePlusIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="12" y1="8" x2="12" y2="14"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
  </svg>
);

/* ══════════════════════════════════════
   PROFILE COMPONENT
══════════════════════════════════════ */
function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");

  const stats = [
    { label: "FAQs Created",      value: "128",   Icon: () => <MessagePlusIcon size={18} color="#2563eb" /> },
    { label: "FAQs Edited",       value: "215",   Icon: () => <PencilIcon size={18} color="#2563eb" /> },
    { label: "Answers Submitted", value: "342",   Icon: () => <SendIcon size={18} color="#2563eb" /> },
    { label: "Comments Added",    value: "186",   Icon: () => <MessageCircleIcon size={18} color="#2563eb" /> },
    { label: "Total Views",       value: "24.6K", Icon: () => <EyeIcon size={18} color="#2563eb" /> },
    { label: "Helpful Votes",     value: "1.2K",  Icon: () => <ThumbsUpIcon size={18} color="#2563eb" /> },
  ];

  const tabs = [
    { label: "Overview",         Icon: GridIcon        },
    { label: "My Content",       Icon: FileIcon        },
    { label: "Analytics",        Icon: BarChartIcon    },
    { label: "Badges",           Icon: MedalIcon       },
    { label: "Account Settings", Icon: SettingsIcon    },
  ];

  const recentContent = [
    { title: "How to Reset Password",           status: "Published", views: "1.2K", votes: 45  },
    { title: "Two Factor Authentication Setup", status: "Published", views: "980",  votes: 38  },
    { title: "Integrating API with Python",     status: "Draft",     views: null,   votes: null },
    { title: "Rate Limiting Best Practices",    status: "Published", views: "760",  votes: 25  },
    { title: "Webhook Verification Guide",      status: "Draft",     views: null,   votes: null },
  ];

  const badges = [
    { label: "Top Contributor", Icon: TrophyIcon,  color: "#7C3AED", bg: "#EDE9FE", ring: "#C4B5FD" },
    { label: "Expert",          Icon: StarIcon,    color: "#1D4ED8", bg: "#DBEAFE", ring: "#93C5FD" },
    { label: "AI/ML Guru",      Icon: RocketIcon,  color: "#047857", bg: "#D1FAE5", ring: "#6EE7B7" },
    { label: "Hot Question",    Icon: FlameIcon,   color: "#B45309", bg: "#FEF3C7", ring: "#FCD34D" },
    { label: "Sharp Shooter",   Icon: TargetIcon,  color: "#B91C1C", bg: "#FEE2E2", ring: "#FCA5A5" },
  ];

  const recentActivity = [
    { text: 'Answered "Best roadmap for AI/ML in 2026?"',         time: "2 days ago",   color: "#2563EB" },
    { text: 'Asked "When should I use recursion vs iteration?"',  time: "1 week ago",   color: "#D97706" },
    { text: 'Earned the "Sharpshooter" badge',                    time: "Feb 15, 2025", color: "#059669" },
  ];

  const quickLinks = [
    { label: "My FAQs",         count: 128, Icon: () => <MessagePlusIcon size={15} color="#64748b" /> },
    { label: "Draft FAQs",      count: 18,  Icon: () => <PencilIcon size={15} color="#64748b" /> },
    { label: "Published FAQs",  count: 110, Icon: () => <SendIcon size={15} color="#64748b" /> },
    { label: "Bookmarked FAQs", count: 56,  Icon: () => <BookmarkIcon size={15} color="#64748b" /> },
    { label: "Recently Viewed", count: 20,  Icon: () => <ClockIcon size={15} color="#64748b" /> },
  ];

  const analyticsData = [
    { label: "Profile Views",          value: "1.8K", change: "+18%",
      points: "0,22 16,18 32,20 48,12 64,14 80,6" },
    { label: "FAQ Views",              value: "9.6K", change: "+24%",
      points: "0,20 16,14 32,16 48,8 64,10 80,3"  },
    { label: "Search Appearances",     value: "3.2K", change: "+12%",
      points: "0,18 16,16 32,12 48,14 64,8 80,10" },
    { label: "Answer Acceptance Rate", value: "87%",  change: "+8%",
      points: "0,20 16,16 32,18 48,10 64,12 80,6"  },
  ];

  return (
    <>
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <main className="content">

          {/* ── Profile Header ── */}
          <section className="profile-header-card">
            <div className="profile-header-left">

              {/* Blank avatar */}
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-blank">
                  <UsersIcon size={40} color="#94a3b8" />
                </div>
                <button className="avatar-edit-btn" aria-label="Edit photo">
                  <PencilIcon size={11} color="#64748b" />
                </button>
              </div>

              <div className="profile-user-info">
                <div className="profile-name-row">
                  <h2 className="profile-name">John Doe</h2>
                  <span className="profile-pro-badge">Pro</span>
                </div>
                <p className="profile-handle">@johndoe</p>
                <p className="profile-title">Product Designer at CrowdFAQ</p>
                <div className="profile-meta">
                  <span className="profile-meta-item">
                    <MapPinIcon size={13} color="#9ca3af" /> San Francisco, USA
                  </span>
                  <span className="profile-meta-item">
                    <UsersIcon size={13} color="#9ca3af" /> Design Team
                  </span>
                </div>
                <p className="profile-bio">
                  I love building user-friendly products and sharing knowledge with the community.
                </p>
                <a href="mailto:john@crowdfaq.com" className="profile-email-link">
                  <MailIcon size={13} color="#2563eb" />
                  john@crowdfaq.com
                </a>
              </div>
            </div>

            {/* Right: edit + details */}
            <div className="profile-header-right">
              <button className="edit-profile-btn">
                <PencilIcon size={13} color="#374151" /> Edit Profile
              </button>
              <div className="profile-details-grid">
                {[
                  ["Username",     "@johndoe"],
                  ["Email",        "john@crowdfaq.com"],
                  ["Role",         "Product Designer"],
                  ["Organization", "CrowdFAQ Inc."],
                  ["Member since", "Mar 10, 2024"],
                ].map(([label, value]) => (
                  <div className="profile-detail-row" key={label}>
                    <span className="detail-label">{label}</span>
                    <span className="detail-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Stats ── */}
          <section className="profile-stats-row">
            {stats.map((s) => (
              <div key={s.label} className="profile-stat-card">
                <div className="stat-icon-wrap">
                  <s.Icon />
                </div>
                <div className="stat-text">
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ── Tabs ── */}
          <section className="profile-tabs-container">
            {tabs.map((t) => (
              <button
                key={t.label}
                className={`profile-tab-btn ${activeTab === t.label ? "active" : ""}`}
                onClick={() => setActiveTab(t.label)}
              >
                <t.Icon size={15} />
                {t.label}
              </button>
            ))}
          </section>

          {/* ── Overview ── */}
          {activeTab === "Overview" && (
            <div className="overview-layout">
              <div className="overview-top-row">

                {/* Recent Content */}
                <div className="recent-content-card profile-card">
                  <div className="card-header-row">
                    <h3>Recent Content</h3>
                    <button className="view-all-btn">View all</button>
                  </div>
                  <table className="content-table">
                    <tbody>
                      {recentContent.map((item) => (
                        <tr key={item.title} className="content-table-row">
                          <td className="content-table-icon">
                            <FileIcon size={14} color="#cbd5e1" />
                          </td>
                          <td className="content-table-title">
                            {item.title}
                            <span className={`content-status ${item.status === "Published" ? "status-published" : "status-draft"}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="content-table-stat">
                            {item.views
                              ? <span className="stat-with-icon"><EyeIcon size={12} color="#94a3b8" /> {item.views}</span>
                              : <span className="stat-empty">—</span>}
                          </td>
                          <td className="content-table-stat">
                            {item.votes !== null
                              ? <span className="stat-with-icon"><ThumbsUpIcon size={12} color="#94a3b8" /> {item.votes}</span>
                              : <span className="stat-empty">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Right column */}
                <div className="overview-right-column">

                  {/* Top FAQ */}
                  <div className="top-faq-card profile-card">
                    <div className="card-header-row">
                      <h3>Top FAQ <span className="card-subhead">(by views)</span></h3>
                      <button className="view-all-btn">View all</button>
                    </div>
                    <div className="top-faq-item">
                      <div className="top-faq-icon-wrap">
                        <TrophyIcon size={22} color="#D97706" />
                      </div>
                      <div className="top-faq-text">
                        <p className="top-faq-title">API Authentication Guide</p>
                        <p className="top-faq-sub">Your most viewed FAQ</p>
                      </div>
                      <div className="top-faq-views">
                        <span className="top-faq-num">2.5K</span>
                        <span className="top-faq-label">Views</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="badges-card profile-card">
                    <div className="card-header-row">
                      <h3>Badges</h3>
                      <button className="view-all-btn">View all</button>
                    </div>
                    <div className="badges-icon-row">
                      {badges.map((b) => (
                        <div key={b.label} className="badge-icon-item">
                          <div className="badge-circle" style={{ background: b.bg, borderColor: b.ring }}>
                            <div className="badge-inner-ring" style={{ borderColor: b.color + "30" }}>
                              <b.Icon size={20} color={b.color} />
                            </div>
                          </div>
                          <span className="badge-icon-label" style={{ color: b.color }}>{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className="overview-bottom-row">

                {/* Analytics */}
                <div className="analytics-card profile-card">
                  <div className="card-header-row">
                    <h3>Analytics Overview</h3>
                    <select className="analytics-period-select">
                      <option>Last 30 days</option>
                      <option>Last 7 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <div className="analytics-grid">
                    {analyticsData.map((a) => (
                      <div key={a.label} className="analytics-box">
                        <span className="analytics-label">{a.label}</span>
                        <strong className="analytics-value">{a.value}</strong>
                        <span className="analytics-change positive">{a.change}</span>
                        <svg className="sparkline" viewBox="0 0 80 28" fill="none">
                          <polyline points={a.points}
                            stroke="#2563EB" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="activity-card profile-card">
                  <div className="card-header-row">
                    <h3>Recent Activity</h3>
                    <button className="view-all-btn">View all</button>
                  </div>
                  <ul className="activity-list">
                    {recentActivity.map((a, i) => (
                      <li key={i} className="activity-item">
                        <span className="activity-dot" style={{ background: a.color }} />
                        <div className="activity-text">
                          <p>{a.text}</p>
                          <span className="activity-time">{a.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="quick-links-card profile-card">
                  <h3 className="quick-links-heading">Quick Links</h3>
                  <div className="quick-links">
                    {quickLinks.map((link) => (
                      <button key={link.label} className="quick-link-row">
                        <span className="quick-link-icon"><link.Icon /></span>
                        <span className="quick-link-label">{link.label}</span>
                        <span className="quick-link-count">{link.count}</span>
                        <span className="quick-link-arrow">
                          <ChevronRightIcon size={15} color="#cbd5e1" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab !== "Overview" && (
            <div className="profile-card">
              <h2>{activeTab}</h2>
              <p>Content for {activeTab} will be implemented here.</p>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default Profile;