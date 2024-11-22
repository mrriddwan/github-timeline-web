import { useQuery } from "@tanstack/react-query";
import { Fragment, useMemo } from "react";
import { repoService } from "../services/repo.service";

interface RepoInterface {
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

function RepoTimeline() {
  const tenDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    return date.toISOString().slice(0, 10);
  }, []);

  const repoQuery = useQuery({
    queryKey: [
      "trendingRepos",
      {
        sort: "stars",
        order: "desc",
        per_page: 10,
        q: "=created:>=" + tenDaysAgo,
      },
    ],
    queryFn: repoService.getRepos,
    enabled: true,
  });

  return (
    <Fragment>
      <div className="bg-slate-200 p-4 justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-black">
          Trending Repos
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center overflow-y-auto max-h-screen px-3 py-3">
        {repoQuery.isLoading && <p>Loading...</p>}
        {repoQuery.isError && <p>Error loading repositories.</p>}
        {repoQuery.data?.data?.items?.map((repo: RepoInterface) => (
          <div
            key={repo.name}
            className="w-full max-w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex items-start space-x-4"
          >
            <div className="max-w-full">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-left">
                {repo.name ?? "No name"}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-1 mb-2 text-ellipsis overflow-hidden max-h-20 text-left">
                {repo.description}
              </p>
              <div className="flex items-center my-5 justify-between text-sm sm:text-base md:text-lg text-gray-500">
                <span className="flex items-center">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} avatar`}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
                  />
                  <p className="ml-2 text-xs sm:text-sm md:text-base">
                    {repo.owner.login}
                  </p>
                </span>
                <span className="text-xs sm:text-sm md:text-base">
                  ⭐ {repo.stargazers_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default RepoTimeline;
