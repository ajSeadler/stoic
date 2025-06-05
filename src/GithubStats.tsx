import React, { useEffect, useState } from "react";
import { GitBranchPlusIcon, Users, UserPlus } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  blog: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

const GITHUB_USERNAME = "ajSeadler";

const GithubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const userRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const userData: GitHubUser = await userRes.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!repoRes.ok) throw new Error("Failed to fetch repos");
        const repoData: GitHubRepo[] = await repoRes.json();

        setUser(userData);
        setRepos(repoData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section
        className="flex items-center justify-center min-h-[300px] text-[rgb(var(--copy-muted))] font-medium"
        style={{ fontSize: "var(--user-font-size)" }}
      >
        Loading...
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="text-center text-[rgb(var(--error))] p-6 font-semibold"
        style={{ fontSize: "var(--user-font-size)" }}
      >
        Error: {error}
      </section>
    );
  }

  if (!user) return null;

  const languageCount: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language)
      languageCount[r.language] = (languageCount[r.language] || 0) + 1;
  });
  const topLanguages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const timeSince = (dateString: string) => {
    const now = new Date();
    const updated = new Date(dateString);
    const diff = Math.floor((now.getTime() - updated.getTime()) / 1000);

    const units = [
      { label: "year", secs: 31536000 },
      { label: "month", secs: 2592000 },
      { label: "day", secs: 86400 },
      { label: "hour", secs: 3600 },
      { label: "minute", secs: 60 },
      { label: "second", secs: 1 },
    ];
    for (const { label, secs } of units) {
      const amount = Math.floor(diff / secs);
      if (amount >= 1) return `${amount} ${label}${amount > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };

  return (
    <main
      className="max-w-5xl mx-auto px-6 py-10 font-sans text-[rgb(var(--copy))]"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      {/* Profile Header */}
      <header className="flex items-center gap-6 border-b border-[rgb(var(--border))] pb-8 mb-8">
        <img
          src={user.avatar_url}
          alt={`${user.name ?? user.login} avatar`}
          className="w-28 h-28 rounded-full shadow-md"
          loading="lazy"
        />
        <div>
          <h1
            className="font-semibold leading-tight"
            style={{
              fontSize: "calc(var(--user-font-size) * 1.875)",
              lineHeight: "1.2em",
            }}
          >
            {user.name ?? user.login}
          </h1>
          {user.bio && (
            <p
              className="mt-1 max-w-lg text-[rgb(var(--copy-muted))] leading-relaxed select-text"
              style={{
                fontSize: "var(--user-font-size)",
                lineHeight: "1.5em",
              }}
            >
              {user.bio}
            </p>
          )}
          <div
            className="mt-3 flex flex-wrap gap-4 text-[rgb(var(--copy-muted))]"
            style={{
              fontSize: "calc(var(--user-font-size) * 0.875)",
              lineHeight: "1.25em",
            }}
          >
            {user.location && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21C12 21 18 14.5 18 10a6 6 0 10-12 0c0 4.5 6 11 6 11z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {user.location}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-words"
              >
                {user.blog}
              </a>
            )}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--cta))] font-medium hover:underline"
              style={{ fontSize: "calc(var(--user-font-size) * 0.875)" }}
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="flex justify-between bg-[rgb(var(--bg-card))] rounded-lg shadow-sm border border-[rgb(var(--border))] px-6 py-5 mb-10">
        <Stat
          Icon={GitBranchPlusIcon}
          label="Repositories"
          value={user.public_repos}
          fontSizeVar="var(--user-font-size)"
        />
        <Stat
          Icon={Users}
          label="Followers"
          value={user.followers}
          fontSizeVar="var(--user-font-size)"
        />
        <Stat
          Icon={UserPlus}
          label="Following"
          value={user.following}
          fontSizeVar="var(--user-font-size)"
        />
        <Stat
          Icon={GitBranchPlusIcon}
          label="Public Gists"
          value={user.public_gists}
          fontSizeVar="var(--user-font-size)"
        />
      </section>

      {/* Languages */}
      {topLanguages.length > 0 && (
        <section className="mb-10">
          <h2
            className="font-semibold mb-4"
            style={{ fontSize: "calc(var(--user-font-size) * 1.125)" }}
          >
            Top Languages
          </h2>
          <ul
            className="flex flex-wrap gap-3"
            style={{ fontSize: "calc(var(--user-font-size) * 0.875)" }}
          >
            {topLanguages.map((lang) => (
              <li
                key={lang}
                className="px-3 py-1 rounded-full bg-[rgb(var(--cta-bg))] text-[rgb(var(--cta))] font-medium"
              >
                {lang}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Repositories */}
      <section>
        <h2
          className="font-semibold mb-6"
          style={{ fontSize: "calc(var(--user-font-size) * 1.125)" }}
        >
          Featured Repositories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} timeSince={timeSince} />
          ))}
        </div>
      </section>
    </main>
  );
};

const Stat = ({
  Icon,
  label,
  value,
  fontSizeVar,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  fontSizeVar: string;
}) => (
  <div className="flex flex-col items-center text-center flex-1">
    <Icon className="w-6 h-6 mb-1 text-[rgb(var(--cta))]" aria-hidden="true" />
    <span
      className="font-semibold text-[rgb(var(--copy))]"
      style={{ fontSize: `calc(${fontSizeVar} * 1.125)` }}
    >
      {value}
    </span>
    <span
      className="uppercase text-[rgb(var(--copy-muted))] tracking-wide"
      style={{ fontSize: `calc(${fontSizeVar} * 0.75)` }}
    >
      {label}
    </span>
  </div>
);

const RepoCard = ({
  repo,
  timeSince,
  className = "",
}: {
  repo: GitHubRepo;
  timeSince: (d: string) => string;
  className?: string;
}) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex flex-col h-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-1 ${className}`}
    style={{ fontSize: "var(--user-font-size)" }}
  >
    <h3
      className="font-semibold text-[rgb(var(--cta))] truncate mb-2 leading-snug"
      title={repo.name}
      style={{
        fontSize: "calc(var(--user-font-size) * 1.125)",
        lineHeight: "1.25em",
      }}
    >
      {repo.name}
    </h3>

    {repo.description && (
      <p
        className="text-[rgb(var(--copy))] mb-5 line-clamp-3 leading-relaxed select-text"
        style={{ fontSize: "var(--user-font-size)", lineHeight: "1.5em" }}
      >
        {repo.description}
      </p>
    )}

    <div
      className="mt-auto flex flex-wrap items-center justify-between text-[rgb(var(--copy-secondary))] font-medium"
      style={{ fontSize: "calc(var(--user-font-size) * 0.875)" }}
    >
      <div className="flex flex-wrap items-center gap-5">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-4 h-4 text-[rgb(var(--cta))]"
            role="img"
            aria-label="Stars"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.286 3.96c.3.922-.755 1.688-1.54 1.118l-3.37-2.455a1 1 0 00-1.175 0l-3.37 2.455c-.784.57-1.838-.196-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.07 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
          </svg>
          {repo.stargazers_count}
        </span>

        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-4 h-4 text-[rgb(var(--cta))]"
            role="img"
            aria-label="Forks"
          >
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8l-5-5H5z" />
          </svg>
          {repo.forks_count}
        </span>

        {repo.language && (
          <span className="px-3 py-0.5 border border-[rgb(var(--cta))] bg-opacity-20 rounded-full font-semibold select-none">
            {repo.language}
          </span>
        )}
      </div>

      <time
        className="text-[rgb(var(--copy-secondary))] select-none pt-2"
        dateTime={repo.updated_at}
        title={`Last updated on ${new Date(
          repo.updated_at
        ).toLocaleDateString()}`}
      >
        Updated {timeSince(repo.updated_at)}
      </time>
    </div>
  </a>
);

export default GithubStats;
