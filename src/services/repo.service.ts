import { appAxios } from "./axios";

export const repoService = {
  async getRepos({ queryKey }: { queryKey: [string, object] }) {
    try {
      const [, params] = queryKey;
      const url = `/search/repositories`;
      const data = await appAxios.get(url, { params });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },


};
