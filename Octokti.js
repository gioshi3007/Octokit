import { App, Octokit } from "octokit"

const app = new App({
    appId: process.env.GITHUB_APP_ID,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
    .......................
    -----END RSA PRIVATE KEY-----`,
        oauth: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  });

async getConnected(user, installId: string) {
        try {

            const octokit = await app.getInstallationOctokit(Number(installId));

            const reposResponse = await octokit.request(`GET /user/installations/${installId}/repositories`, {
                installation_id: installId,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            })

            return reposResponse.data

        } catch (error) {
            const handledError = CustomErrorHandler.handle(error)
            throw handledError
        }
    }
