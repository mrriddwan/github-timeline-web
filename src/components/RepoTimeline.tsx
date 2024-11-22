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
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          Trending Repos
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
        {repoQuery.isLoading && <p>Loading...</p>}
        {repoQuery.isError && <p>Error loading repositories.</p>}
        {repoQuery.data?.data?.items?.map((repo: RepoInterface) => (
          <div
            key={repo.name}
            className="w-full sm:max-w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-md p-4 flex items-start space-x-4"
          >
            <div className="max-w-full">
              <h2 className="text-lg font-semibold text-black text-left">
                {repo.name ?? "No name"}
              </h2>
              <p className="text-sm text-gray-600 mt-1 mb-2 text-ellipsis overflow-hidden max-h-20 text-left">
                {repo.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="ml-2">{repo.owner.login}</p>
                </span>
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default RepoTimeline;
