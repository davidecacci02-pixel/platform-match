import React from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Check,
  GraduationCap,
  Sliders,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Target,
} from "lucide-react";

export function ArticleThreeTime() {
  return (
    <article className="space-y-12">
      {/* Article Header */}
      <header className="space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800">
          <Clock className="w-3.5 h-3.5 text-[#002D72]" />
          <span className="text-[#002D72] font-black uppercase tracking-wider">
            Article 3 • Capacity &amp; Productivity
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Sustainable Workflows</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] font-sans">
          Choosing the Best Social Media Platform for Business With Limited Time
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
          Choosing the best social media platform for business also means choosing a workload your team can manage. If you have only a few hours each week, consider how much time you can spend creating content, publishing, responding, and reviewing results.
        </p>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-4 h-4 text-[#FFB81C]" />
            </div>
            <span className="font-bold text-slate-900">
              By the Platform Match student project team
            </span>
            <span className="text-slate-400">•</span>
            <span>Pace Digital Marketing Lab</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>5 min read</span>
            <span className="text-slate-400">•</span>
            <span>3-Hour Weekly Workflow</span>
          </div>
        </div>
      </header>

      {/* Intro Highlight */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic border-l-4 border-[#002D72] pl-4">
          &ldquo;Start with a manageable channel priority before expanding your activity.&rdquo;
        </p>
      </div>

      {/* Section 1: Work out your actual weekly capacity */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Work out your actual weekly capacity
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Look at the time available alongside your other responsibilities. Include the less visible tasks, such as checking links, answering questions, and reviewing what happened after publication.
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-black text-slate-900">
            For a team with three hours available each week, this example provides a starting point:
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#002D72] text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    Weekly time
                  </th>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    What to do
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-[#002D72] flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>Plan</span>
                  </td>
                  <td className="px-5 py-4 text-[#002D72] font-black">
                    30 minutes
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Choose a useful topic and the audience action you want
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>Create</span>
                  </td>
                  <td className="px-5 py-4 text-[#002D72] font-black">
                    60 minutes
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Produce content that fits your strongest format
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>Prepare to publish</span>
                  </td>
                  <td className="px-5 py-4 text-[#002D72] font-black">
                    30 minutes
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Write captions, check details, and prepare posts
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <span>Respond</span>
                  </td>
                  <td className="px-5 py-4 text-[#002D72] font-black">
                    45 minutes
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Spread time across the week for comments and messages
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 flex items-center justify-center text-xs font-bold">
                      5
                    </span>
                    <span>Review</span>
                  </td>
                  <td className="px-5 py-4 text-[#002D72] font-black">
                    15 minutes
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Record the outcome and choose one adjustment
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 font-black border-t border-slate-200">
                <tr>
                  <td className="px-5 py-3.5 text-slate-900 uppercase tracking-wider text-xs">
                    Total
                  </td>
                  <td className="px-5 py-3.5 text-[#002D72] text-sm">
                    180 minutes
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 text-xs uppercase tracking-wider">
                    Three hours across the week
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <p className="text-sm text-slate-600 italic">
          This is a sample schedule to adapt. The amount of content you can produce will depend on its complexity and your team&apos;s skills.
        </p>
      </section>

      {/* Section 2: Build around one useful topic */}
      <section className="space-y-4 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Build around one useful topic
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Choose a topic that answers a customer question or helps people understand your offer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-black text-[#002D72] uppercase tracking-wider block">
              Example 1: Retail &amp; Food (Bakery)
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A bakery could photograph one product and use the material for a product introduction and a short explanation of how it is made.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-black text-[#002D72] uppercase tracking-wider block">
              Example 2: B2B &amp; Professional Services
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A service business could turn one customer question into a written answer and a simple checklist.
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          The aim is to make useful material within your time budget, rather than commit to more posts than you can finish.
        </p>
      </section>

      {/* Section 3: Consider the extra work before adding a platform */}
      <section className="space-y-4 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Consider the extra work before adding a platform
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Some material may be suitable for another channel after adaptation. Before expanding, account for the additional editing, captions, publishing, and responses.
        </p>

        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold leading-relaxed">
            If the extra channel pushes you beyond your available time, simplify the plan or keep your focus on the initial priority.
          </p>
        </div>
      </section>

      {/* Section 4: Review both the outcome and the workload */}
      <section className="space-y-4 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Review both the outcome and the workload
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          Ask two simple questions at the end of each weekly cycle:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-black text-[#002D72] uppercase tracking-wider block">
              Question 1 (Effectiveness)
            </span>
            <p className="text-sm font-bold text-slate-900">
              &ldquo;Did the content encourage the action we wanted?&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-black text-[#002D72] uppercase tracking-wider block">
              Question 2 (Sustainability)
            </span>
            <p className="text-sm font-bold text-slate-900">
              &ldquo;Could we maintain the plan within our available time?&rdquo;
            </p>
          </div>
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          Track an outcome connected to your goal, such as relevant inquiries or visits to a useful website page. If production repeatedly takes too long, reduce the workload or simplify the format.
        </p>
      </section>

      {/* Section 5: Include your capacity in your platform decision */}
      <section className="space-y-6 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Include your capacity in your platform decision
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Platform Match considers available time alongside audience, goals, industry, content strengths, and brand voice. In the quiz, a three-hour weekly budget falls within the <strong className="text-slate-900 font-bold">&ldquo;2 to 5 hours per week&rdquo;</strong> option.
        </p>

        {/* CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#002D72] text-white shadow-xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FFB81C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Decision Tool</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Take the free Platform Match quiz
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              Compare six platforms using your business&apos;s goals and genuine available capacity.
            </p>
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] font-black text-sm rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#001C48]" />
            <span>Start Free Quiz</span>
            <ArrowRight className="w-4 h-4 text-[#001C48]" />
          </Link>
        </div>

        <p className="text-xs text-slate-500 font-medium italic pt-2">
          By the Platform Match student project team • MAR649 Pace Digital Marketing Lab, Pace University.
        </p>
      </section>
    </article>
  );
}
