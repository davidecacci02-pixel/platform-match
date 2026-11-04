"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Plus,
  Trash2,
  ExternalLink,
  Linkedin,
  Mail,
  GraduationCap,
  RefreshCw,
  Camera,
  ChevronRight,
  Sparkles,
  Pencil,
  Check,
  X,
  Upload,
} from "lucide-react";

export interface TeamMemberCard {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  image: string;
  bio: string;
  skills: string[];
  themeColor: "pace-blue" | "pace-gold" | "emerald" | "indigo" | "rose";
  links: {
    label: string;
    url: string;
    type?: "linkedin" | "email" | "portfolio" | "website";
  }[];
  isCustom?: boolean;
}

const DEFAULT_MEMBERS: TeamMemberCard[] = [
  {
    id: "davide-cacciuottolo",
    name: "Davide Cacciuottolo",
    role: "Lead Student Researcher & Strategy",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/davide-cacciuottolo.jpg",
    bio: "Leads quantitative research on multi-platform algorithmic fit, channel prioritization frameworks, and practical marketing roadmaps for small businesses.",
    skills: ["Platform Match Architect", "Digital Strategy", "Quantitative Research", "Growth Analytics"],
    themeColor: "pace-blue",
    links: [
      { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/davide-cacciuottolo", type: "linkedin" },
      { label: "Platform Match Quiz", url: "/quiz", type: "portfolio" },
      { label: "Email Researcher", url: "mailto:dcacciuottolo@pace.edu", type: "email" },
    ],
  },
  {
    id: "lily-lin",
    name: "Lily Lin",
    role: "Student Researcher & Audience Analytics",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/team-member-2.jpg",
    bio: "Specializes in audience demographic diagnostics, consumer segmentation models, and conversion funnel optimization for local business growth.",
    skills: ["Audience Research", "Consumer Insights", "Funnel Analytics", "Campaign Strategy"],
    themeColor: "pace-gold",
    links: [
      { label: "Pace Digital Marketing Lab", url: "/#services", type: "portfolio" },
      { label: "Consultation Request", url: "/#contact", type: "email" },
    ],
  },
  {
    id: "melina-kaelin",
    name: "Melina Kaelin",
    role: "Student Researcher & Content Creation",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/team-member-3.jpg",
    bio: "Focuses on short-form video hooks, visual storytelling architectures, and organic brand narrative development across modern social channels.",
    skills: ["Content Architecture", "Short-Form Video", "Brand Storytelling", "Visual Strategy"],
    themeColor: "emerald",
    links: [
      { label: "Pace Digital Marketing Lab", url: "/#services", type: "portfolio" },
      { label: "Consultation Request", url: "/#contact", type: "email" },
    ],
  },
  {
    id: "puntharee-manakul",
    name: "Puntharee Manakul",
    role: "Student Researcher & Digital Media",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/team-member-4.jpg",
    bio: "Analyzes cross-platform media engagement metrics, community growth dynamics, and visual communication frameworks for emerging brands.",
    skills: ["Digital Media Strategy", "Community Growth", "Engagement Metrics", "Visual Communication"],
    themeColor: "indigo",
    links: [
      { label: "Pace Digital Marketing Lab", url: "/#services", type: "portfolio" },
      { label: "Consultation Request", url: "/#contact", type: "email" },
    ],
  },
  {
    id: "solveig-ervik",
    name: "Solveig Ervik",
    role: "Student Researcher & Social Strategy",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/team-member-5.jpg",
    bio: "Researches organic channel distribution models, editorial calendar cadence, and sustainable social media execution for lean small business teams.",
    skills: ["Channel Distribution", "Editorial Strategy", "Posting Systems", "Capacity Planning"],
    themeColor: "rose",
    links: [
      { label: "Pace Digital Marketing Lab", url: "/#services", type: "portfolio" },
      { label: "Consultation Request", url: "/#contact", type: "email" },
    ],
  },
  {
    id: "bui-xuan-phat",
    name: "Bui Xuan Phat",
    role: "Student Researcher & Technical Specialist",
    affiliation: "Pace University • Lubin School of Business",
    image: "/images/team-member-6.jpg",
    bio: "Investigates search engine visibility, answer engine optimization (AEO), and technical performance models for small business digital properties.",
    skills: ["SEO & AEO Analysis", "Diagnostic Weighting", "Technical Research", "Data Models"],
    themeColor: "pace-blue",
    links: [
      { label: "Pace Digital Marketing Lab", url: "/#services", type: "portfolio" },
      { label: "Consultation Request", url: "/#contact", type: "email" },
    ],
  },
];

/**
 * Compresses an uploaded image file into a client-safe base64 data URL
 * so localStorage quotas are respected while keeping photos crisp.
 */
function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function TeamCardStudio() {
  const [members, setMembers] = useState<TeamMemberCard[]>(DEFAULT_MEMBERS);
  const [showCreator, setShowCreator] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  // Form State for creating or editing a card
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formAffiliation, setFormAffiliation] = useState("Pace University • Lubin School of Business");
  const [formBio, setFormBio] = useState("");
  const [formSkills, setFormSkills] = useState("Digital Marketing, Social Strategy, Pace Lubin");
  const [formImage, setFormImage] = useState<string>("/images/davide-cacciuottolo.jpg");
  const [formTheme, setFormTheme] = useState<TeamMemberCard["themeColor"]>("pace-blue");
  const [formLinkedin, setFormLinkedin] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCustomLink, setFormCustomLink] = useState("");
  const [formCustomLabel, setFormCustomLabel] = useState("Portfolio");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const directFileInputRef = useRef<HTMLInputElement>(null);
  const directTargetIdRef = useRef<string | null>(null);
  const studioRef = useRef<HTMLDivElement>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load persisted roster from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pace_dml_roster_v4");
      if (saved) {
        const parsed = JSON.parse(saved) as TeamMemberCard[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMembers(parsed);
          return;
        }
      }
    } catch {
      // localStorage unavailable or malformed
    }
  }, []);

  // Save current members to localStorage
  const saveToStorage = (updatedMembers: TeamMemberCard[]) => {
    try {
      localStorage.setItem("pace_dml_roster_v4", JSON.stringify(updatedMembers));
    } catch (err) {
      console.warn("Storage save error (image may be too large):", err);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormRole("");
    setFormAffiliation("Pace University • Lubin School of Business");
    setFormBio("");
    setFormSkills("Digital Marketing, Social Strategy, Pace Lubin");
    setFormImage("/images/davide-cacciuottolo.jpg");
    setFormTheme("pace-blue");
    setFormLinkedin("");
    setFormEmail("");
    setFormCustomLink("");
    setFormCustomLabel("Portfolio");
    setEditingMemberId(null);
  };

  // Start editing an existing member
  const handleStartEdit = (member: TeamMemberCard) => {
    setEditingMemberId(member.id);
    setFormName(member.name);
    setFormRole(member.role);
    setFormAffiliation(member.affiliation || "Pace University • Lubin School of Business");
    setFormBio(member.bio || "");
    setFormSkills(member.skills?.join(", ") || "");
    setFormImage(member.image || "/images/davide-cacciuottolo.jpg");
    setFormTheme(member.themeColor || "pace-blue");

    const linkedin = member.links?.find((l) => l.type === "linkedin");
    setFormLinkedin(linkedin ? linkedin.url : "");

    const email = member.links?.find((l) => l.type === "email");
    setFormEmail(email ? email.url.replace("mailto:", "") : "");

    const custom = member.links?.find((l) => l.type !== "linkedin" && l.type !== "email");
    if (custom) {
      setFormCustomLabel(custom.label);
      setFormCustomLink(custom.url);
    } else {
      setFormCustomLabel("Portfolio");
      setFormCustomLink("");
    }

    setShowCreator(true);
    setTimeout(() => {
      studioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Direct photo replacement for a specific card in the grid
  const handleTriggerDirectPhoto = (memberId: string) => {
    directTargetIdRef.current = memberId;
    directFileInputRef.current?.click();
  };

  const handleDirectFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const memberId = directTargetIdRef.current;
    if (!file || !memberId) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    try {
      const compressed = await compressImage(file);
      const updated = members.map((m) =>
        m.id === memberId ? { ...m, image: compressed, isCustom: true } : m
      );
      setMembers(updated);
      saveToStorage(updated);
      showNotification("Real profile photo updated successfully!");
    } catch {
      alert("Failed to process photo.");
    } finally {
      e.target.value = "";
    }
  };

  // Studio form image file upload
  const handleFormFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    try {
      const compressed = await compressImage(file);
      setFormImage(compressed);
    } catch {
      alert("Failed to process photo.");
    }
  };

  // Submit and create or update card
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) {
      alert("Please enter both Name and Role to save your card.");
      return;
    }

    const links: TeamMemberCard["links"] = [];
    if (formLinkedin.trim()) {
      links.push({
        label: "LinkedIn Profile",
        url: formLinkedin.startsWith("http") ? formLinkedin : `https://${formLinkedin}`,
        type: "linkedin",
      });
    }
    if (formEmail.trim()) {
      links.push({
        label: "Send Email",
        url: formEmail.startsWith("mailto:") ? formEmail : `mailto:${formEmail}`,
        type: "email",
      });
    }
    if (formCustomLink.trim()) {
      links.push({
        label: formCustomLabel.trim() || "Visit Portfolio",
        url: formCustomLink.startsWith("http") ? formCustomLink : `https://${formCustomLink}`,
        type: "website",
      });
    }
    if (links.length === 0) {
      links.push({
        label: "Pace Digital Marketing Lab",
        url: "/#services",
        type: "portfolio",
      });
    }

    if (editingMemberId) {
      // UPDATE EXISTING MEMBER
      const updated = members.map((m) => {
        if (m.id === editingMemberId) {
          return {
            ...m,
            name: formName.trim(),
            role: formRole.trim(),
            affiliation: formAffiliation.trim() || "Pace University • Lubin School of Business",
            image: formImage || m.image,
            bio: formBio.trim() || m.bio,
            skills: formSkills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
            themeColor: formTheme,
            links,
            isCustom: true,
          };
        }
        return m;
      });
      setMembers(updated);
      saveToStorage(updated);
      showNotification(`Updated profile for ${formName.trim()}!`);
    } else {
      // CREATE NEW MEMBER
      const newMember: TeamMemberCard = {
        id: `custom-${Date.now()}`,
        name: formName.trim(),
        role: formRole.trim(),
        affiliation: formAffiliation.trim() || "Pace University • Lubin School of Business",
        image: formImage || "/images/davide-cacciuottolo.jpg",
        bio: formBio.trim() || "Student strategist and researcher at Pace University Digital Marketing Lab.",
        skills: formSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        themeColor: formTheme,
        links,
        isCustom: true,
      };
      const updated = [...members, newMember];
      setMembers(updated);
      saveToStorage(updated);
      showNotification(`Added ${formName.trim()} to team roster!`);
    }

    resetForm();
    setShowCreator(false);
  };

  // Delete a card with confirmation
  const handleDeleteCard = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the team roster?`)) {
      const updated = members.filter((m) => m.id !== id);
      setMembers(updated);
      saveToStorage(updated);
      if (editingMemberId === id) {
        resetForm();
        setShowCreator(false);
      }
      showNotification(`${name} was removed from the team roster.`);
    }
  };

  // Reset to original default roster
  const handleResetTeam = () => {
    if (window.confirm("Reset roster to the original 6 default Pace researchers?")) {
      setMembers(DEFAULT_MEMBERS);
      localStorage.removeItem("pace_dml_roster_v4");
      resetForm();
      setShowCreator(false);
      showNotification("Team roster reset to default 6 researchers.");
    }
  };

  // Helper theme classes
  const getThemeClasses = (color: TeamMemberCard["themeColor"]) => {
    switch (color) {
      case "pace-gold":
        return {
          pillBg: "bg-[#FFB81C] text-[#001C48] hover:bg-[#E5A417]",
          badgeBg: "bg-[#FFB81C]/20 text-[#855B00] border-[#FFB81C]/40",
          accentBorder: "border-[#FFB81C]",
          dotColor: "bg-[#FFB81C]",
        };
      case "emerald":
        return {
          pillBg: "bg-emerald-600 text-white hover:bg-emerald-700",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          accentBorder: "border-emerald-500",
          dotColor: "bg-emerald-500",
        };
      case "indigo":
        return {
          pillBg: "bg-indigo-600 text-white hover:bg-indigo-700",
          badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          accentBorder: "border-indigo-500",
          dotColor: "bg-indigo-500",
        };
      case "rose":
        return {
          pillBg: "bg-rose-600 text-white hover:bg-rose-700",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
          accentBorder: "border-rose-500",
          dotColor: "bg-rose-500",
        };
      case "pace-blue":
      default:
        return {
          pillBg: "bg-[#002D72] text-white hover:bg-[#001C48]",
          badgeBg: "bg-[#002D72]/10 text-[#002D72] border-[#002D72]/20",
          accentBorder: "border-[#002D72]",
          dotColor: "bg-[#002D72]",
        };
    }
  };

  return (
    <div className="space-y-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002D72] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#FFB81C]/40 flex items-center gap-3 animate-fade-in text-xs font-bold">
          <Check className="w-4 h-4 text-[#FFB81C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden single file input for direct photo changes on any card */}
      <input
        ref={directFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleDirectFileChange}
        className="hidden"
      />

      {/* Top Controls: Tabs and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-full border border-slate-200 shadow-sm max-w-2xl mx-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setShowCreator(false);
              setEditingMemberId(null);
            }}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
              !showCreator
                ? "bg-[#002D72] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Lab Researchers ({members.length})
          </button>
          <button
            onClick={() => {
              resetForm();
              setEditingMemberId(null);
              setShowCreator(true);
              setTimeout(() => {
                studioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              showCreator && !editingMemberId
                ? "bg-[#FFB81C] text-[#001C48] shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Member</span>
          </button>
        </div>

        <button
          onClick={handleResetTeam}
          title="Restore default 6 Pace researchers"
          className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 px-4 py-1 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset to Default 6</span>
        </button>
      </div>

      {/* =====================================================================
          CARD CREATOR & EDITOR DRAWER / FORM (Manual Photo Upload & Customizer)
          ===================================================================== */}
      {showCreator && (
        <div
          ref={studioRef}
          className="bg-white rounded-[2.5rem] border-2 border-[#002D72]/20 shadow-2xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8 animate-fade-in relative overflow-hidden"
        >
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#002D72] via-[#FFB81C] to-[#001C48]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 text-[#855B00] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#002D72]" />
                <span>
                  {editingMemberId ? "Editing Profile Card" : "Add Team Member Card"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                {editingMemberId ? `Modify ${formName || "Member Profile"}` : "Create & Add Your Profile"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Upload your real photo from your computer, edit your title, bio, and configure your personalized Linktree-style profile links.
              </p>
            </div>

            <button
              onClick={() => {
                setShowCreator(false);
                setEditingMemberId(null);
              }}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors self-start sm:self-auto"
            >
              Close Editor
            </button>
          </div>

          <form onSubmit={handleSaveCard} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-5">
              {/* 1. Photo Upload Button */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Profile Photo (Upload from computer or enter URL) <span className="text-[#002D72]">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#002D72]/30 flex-shrink-0 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formImage}
                      alt="Photo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFormFileUpload}
                      className="hidden"
                      id="card-photo-input"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02]"
                    >
                      <Camera className="w-4 h-4 text-[#FFB81C]" />
                      <span>Choose Real Photo from Computer</span>
                    </button>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Or paste an image URL (/images/... or https://)"
                      className="w-full px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:border-[#002D72]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="card-name" className="block text-xs font-bold text-slate-700">
                    Full Name <span className="text-[#002D72]">*</span>
                  </label>
                  <input
                    id="card-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Davide Cacciuottolo"
                    className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="card-role" className="block text-xs font-bold text-slate-700">
                    Role / Title <span className="text-[#002D72]">*</span>
                  </label>
                  <input
                    id="card-role"
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Lead Student Researcher & Strategy"
                    className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* 3. Affiliation */}
              <div className="space-y-1.5">
                <label htmlFor="card-affiliation" className="block text-xs font-bold text-slate-700">
                  Affiliation
                </label>
                <input
                  id="card-affiliation"
                  type="text"
                  value={formAffiliation}
                  onChange={(e) => setFormAffiliation(e.target.value)}
                  placeholder="Pace University • Lubin School of Business"
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white transition-colors"
                />
              </div>

              {/* 4. Bio */}
              <div className="space-y-1.5">
                <label htmlFor="card-bio" className="block text-xs font-bold text-slate-700">
                  Short Bio / Research Focus
                </label>
                <textarea
                  id="card-bio"
                  rows={2}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Explain your contribution to the Pace Digital Marketing Lab..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white transition-colors"
                />
              </div>

              {/* 5. Skills */}
              <div className="space-y-1.5">
                <label htmlFor="card-skills" className="block text-xs font-bold text-slate-700">
                  Skills (comma-separated tags)
                </label>
                <input
                  id="card-skills"
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="Digital Strategy, Quantitative Research, SEO, Analytics"
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#002D72] focus:bg-white transition-colors"
                />
              </div>

              {/* 6. Theme Accent Color */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Card Theme Accent
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { id: "pace-blue", label: "Pace Blue", color: "#002D72" },
                    { id: "pace-gold", label: "Pace Gold", color: "#FFB81C" },
                    { id: "emerald", label: "Emerald", color: "#10B981" },
                    { id: "indigo", label: "Indigo", color: "#6366F1" },
                    { id: "rose", label: "Rose", color: "#F43F5E" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormTheme(t.id as TeamMemberCard["themeColor"])}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        formTheme === t.id
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 7. Links Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Profile Links
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={formLinkedin}
                      onChange={(e) => setFormLinkedin(e.target.value)}
                      placeholder="linkedin.com/in/username"
                      className="w-full px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#002D72]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@pace.edu"
                      className="w-full px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#002D72]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-sm font-extrabold shadow-lg shadow-[#002D72]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB81C]" />
                  <span>
                    {editingMemberId
                      ? `Save Changes to ${formName || "Profile"}`
                      : "Create & Add Team Member"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowCreator(false);
                  }}
                  className="py-4 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Card Preview */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#FAF9F6] rounded-[2rem] border border-slate-200">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4 block">
                Live Card Preview
              </span>

              <div className="w-full max-w-xs bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden p-6 space-y-5">
                <div className="text-center space-y-3">
                  <div className="relative w-24 h-24 rounded-full mx-auto overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-slate-900 leading-tight">
                      {formName.trim() || "Your Full Name"}
                    </h4>
                    <p className="text-xs font-bold text-[#002D72] mt-0.5">
                      {formRole.trim() || "Your Lab Role"}
                    </p>
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 mt-2 border border-slate-200">
                      <GraduationCap className="w-3 h-3 text-[#FFB81C]" />
                      <span>{formAffiliation}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs font-normal">
                    {formBio.trim() ||
                      "Marketing strategist and researcher at Pace University Digital Marketing Lab."}
                  </p>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {formSkills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200"
                        >
                          {sk}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Simulated Linktree Pill Links Stack */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div
                    className={`w-full py-3 px-4 rounded-full text-xs font-bold text-center shadow-sm flex items-center justify-between ${
                      getThemeClasses(formTheme).pillBg
                    }`}
                  >
                    <span className="w-4" />
                    <span>{formLinkedin.trim() ? "LinkedIn Profile" : "Connect on LinkedIn"}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </div>

                  <div className="w-full py-3 px-4 rounded-full text-xs font-bold text-center bg-slate-100 text-slate-800 transition-colors flex items-center justify-between">
                    <span className="w-4" />
                    <span>{formCustomLabel.trim() || "Portfolio & Research"}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </div>

                  <div className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-center bg-white border border-slate-200 text-slate-600 transition-colors flex items-center justify-between">
                    <span className="w-4" />
                    <span>Send Direct Email</span>
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
          TEAM ROSTER CARDS (Fully Editable, Deletable, Real Photos)
          ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {members.map((member) => {
          const theme = getThemeClasses(member.themeColor);

          return (
            <div
              key={member.id}
              className="bg-white rounded-[2.2rem] border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 relative"
            >
              {/* Card Controls Overlay (Top Bar on Image) */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
                {/* Left Action Buttons: Edit, Change Photo, Delete */}
                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    onClick={() => handleStartEdit(member)}
                    title="Edit profile & details"
                    className="h-8 px-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#002D72] border border-slate-200/90 flex items-center gap-1 shadow-sm transition-all hover:scale-105 text-[11px] font-bold"
                  >
                    <Pencil className="w-3 h-3 text-[#002D72]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleTriggerDirectPhoto(member.id)}
                    title="Upload real photo from computer"
                    className="h-8 px-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[#002D72] border border-slate-200/90 flex items-center gap-1 shadow-sm transition-all hover:scale-105 text-[11px] font-bold"
                  >
                    <Camera className="w-3 h-3 text-[#FFB81C]" />
                    <span className="hidden sm:inline">Photo</span>
                  </button>

                  <button
                    onClick={() => handleDeleteCard(member.id, member.name)}
                    title={`Delete ${member.name} from team`}
                    className="w-8 h-8 rounded-full bg-white/95 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200/90 flex items-center justify-center shadow-sm transition-all hover:scale-105"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right Badge: Pace Researcher status */}
                <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-[#002D72] shadow-sm border border-slate-200">
                  <span className={`w-2 h-2 rounded-full ${theme.dotColor}`} />
                  <span>{member.isCustom ? "Customized" : "Pace Researcher"}</span>
                </span>
              </div>

              <div>
                {/* Image Section with interactive camera upload hint */}
                <div
                  onClick={() => handleTriggerDirectPhoto(member.id)}
                  title="Click to change photo"
                  className="relative aspect-square w-full overflow-hidden bg-slate-100 cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover prompt to upload real photo */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 z-10">
                    <Camera className="w-6 h-6 text-[#FFB81C]" />
                    <span className="text-xs font-bold bg-black/60 px-3 py-1 rounded-full">
                      Click to upload real photo
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-[#002D72] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#002D72] mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      {member.affiliation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal min-h-[48px]">
                    {member.bio}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Linktree-Style Action Links */}
              <div className="p-6 pt-0 space-y-2">
                {member.links?.map((link, lIdx) => {
                  const isPrimary = lIdx === 0;

                  return (
                    <a
                      key={lIdx}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-full text-xs font-bold text-center transition-all flex items-center justify-between ${
                        isPrimary
                          ? `${theme.pillBg} shadow-sm hover:scale-[1.02]`
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      <span className="w-3.5" />
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
