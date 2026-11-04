export type BlogTab = "article-1" | "article-2" | "article-3";

export const SLUG_TO_TAB: Record<string, BlogTab> = {
  "find-the-best-social-media-platform": "article-1",
  "guide": "article-1",
  "best-platforms": "article-1",
  "article-1": "article-1",
  "how-goals-help-you-choose-the-best-platform": "article-2",
  "goals": "article-2",
  "goals-strategy": "article-2",
  "article-2": "article-2",
  "social-media-platform-with-limited-time": "article-3",
  "limited-time": "article-3",
  "time": "article-3",
  "article-3": "article-3",
};

export const TAB_TO_SLUG: Record<BlogTab, string> = {
  "article-1": "find-the-best-social-media-platform",
  "article-2": "how-goals-help-you-choose-the-best-platform",
  "article-3": "social-media-platform-with-limited-time",
};

export const ARTICLES_METADATA: Record<
  BlogTab,
  {
    title: string;
    description: string;
    canonicalSlug: string;
  }
> = {
  "article-1": {
    title: "Find the Best Social Media Platform for Your Business | Pace Marketing Lab",
    description:
      "A student-developed decision framework evaluating Instagram, TikTok, LinkedIn, Facebook, YouTube, and Pinterest with a 6-factor matrix and worked examples.",
    canonicalSlug: "find-the-best-social-media-platform",
  },
  "article-2": {
    title: "How Your Goals Help You Choose the Best Social Media Platform | Pace Marketing Lab",
    description:
      "Connect your primary business goals—awareness, website traffic, inquiries, sales, and community—to practical audience actions and observable tracking measures.",
    canonicalSlug: "how-goals-help-you-choose-the-best-platform",
  },
  "article-3": {
    title: "Choosing the Best Social Media Platform for Business With Limited Time | Pace Marketing Lab",
    description:
      "Choose a workload your team can actually manage. A step-by-step 3-hour weekly routine for planning, creating, publishing, responding, and reviewing results.",
    canonicalSlug: "social-media-platform-with-limited-time",
  },
};
