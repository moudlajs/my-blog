---
title: "The NPM Worm That Stole Secrets: Why Your CI/CD Needs OIDC"
pubDatetime: 2026-01-13
author: "Daniel Czetner"
description: "Recent CI/CD attacks like the 'Shai-Hulud 2.0' worm highlight a critical vulnerability in many DevOps pipelines. The culprit? Static, long-lived secrets. The solution? OpenID Connect (OIDC)."
tags:
  - security
  - ci-cd
  - oidc
  - devops
  - github-actions
---

In the world of software, we love automation. We build pipelines in GitHub Actions to test, build, and deploy our code seamlessly. But what if that same automation could be turned against us?

Recently, a sophisticated NPM worm dubbed "Shai-Hulud 2.0" did just that. It was designed to live inside CI/CD pipelines, hunting for the one thing that gives our automated workflows power: secrets. It searches for `ghp_` tokens, cloud credentials, and API keys. Once found, it can use them to steal code, modify your infrastructure, or install a permanent backdoor.

This isn't a theoretical threat; it's a real-world example of a vulnerability many of us have in our own projects. It forces us to ask a hard question: how secure are the secrets in our CI/CD pipelines?

### The Old Way: A Password Waiting to Be Stolen

For years, the standard practice was simple. If your GitHub Action needed to talk to a cloud provider like Azure or AWS, you would:

1.  Create a Service Principal (a non-human identity) in your cloud account.
2.  Generate a long-lived secret (basically, a password) for it.
3.  Copy that secret and paste it into your GitHub repository's "Secrets" settings.
4.  In your workflow, you'd log in using that secret.

This works, but it creates a permanent, high-value target for an attacker. If a malicious dependency ever gets into your build process—like Shai-Hulud 2.0—it can scan the environment, find that secret, and your entire cloud infrastructure is compromised.

### The New Way: Passwordless Trust with OIDC

There is a better way, and it's called **OpenID Connect (OIDC)**. In the context of CI/CD, it's often referred to as **Workload Identity Federation**.

Instead of storing a permanent secret, OIDC establishes a trust relationship between your CI/CD platform (GitHub) and your cloud provider (Azure, AWS, GCP, etc.).

Here's how it works at a high level:

1.  **Setup Trust:** You configure your cloud provider to trust authentication tokens that come from a specific GitHub repository, branch, or workflow. You aren't exchanging any secrets.
2.  **Workflow Runs:** When your GitHub Actions workflow starts, it requests a special, short-lived token from GitHub's own OIDC provider. This token contains information about your repository and workflow run.
3.  **Token Exchange:** Your workflow presents this temporary token to your cloud provider.
4.  **Verification and Access:** The cloud provider checks the token's signature, verifies it came from the trusted GitHub repository, and then grants a temporary, scoped-down access token in exchange.

The key is that **no permanent secret ever exists in your pipeline**. Even if an attacker compromises your runner, there is no secret to steal. The token they might find is only valid for a few minutes and is tightly scoped to that specific job. When the job is done, the access evaporates.

In Microsoft Entra ID, this trust is configured on your application's "Federated credentials". It looks something like this:

`[NOTE: Add screenshot from Entra ID showing the federated credential configuration for GitHub Actions here]`

### Hardening Your Pipelines: A Quick Cheat Sheet

While switching to OIDC is the most impactful change, the Shai-Hulud 2.0 worm teaches us a few other lessons.

1.  **Prioritize OIDC (Workload Identity):** This is the top priority. Stop using static cloud secrets in your GitHub Actions. All major cloud providers support it.
2.  **Use `npm ci --ignore-scripts`:** The worm often executes during the `preinstall` or `postinstall` phase of a package. This flag prevents any package from running arbitrary code during installation. Use `npm ci` for deterministic builds and add `--ignore-scripts` in your CI environment for security.
3.  **Lock Down Your `GITHUB_TOKEN`:** By default, the built-in `GITHUB_TOKEN` in a workflow can have broad permissions. Lock it down to only what it needs. For most workflows, you only need to read contents. If you use OIDC, you'll need to grant `id-token: write` permission.

```yaml
permissions:
  contents: read
  id-token: write # Required for OIDC
```

4.  **Use the OIDC Login Action in Your Workflow:** Once your permissions are set, you can use the official `azure/login` action. Notice you don't need to provide a `secret`. The action handles the OIDC token exchange automatically.

```yaml
- name: 'Az CLI login'
  uses: azure/login@v1
  with:
    client-id: ${{ secrets.AZURE_CLIENT_ID }}
    tenant-id: ${{ secrets.AZURE_TENANT_ID }}
    subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

You'll still need to store the Client ID, Tenant ID, and Subscription ID as GitHub secrets, but these are identifiers, not passwords. Without the corresponding temporary token from the OIDC handshake, they are not useful to an attacker.

The rise of attacks targeting the software supply chain shows that we can't afford to be complacent. Moving from static secrets to OIDC is one of the most significant security upgrades you can make to your DevOps process. It moves your pipeline from a state of permanent risk to one of temporary, just-in-time trust.
