# 🚧 WPADC Archive Site 🚧

🟡 Slow for the Dev Zone - Devs At Work 👷🏽🟡
<br>
<br>
<strong>Project Status</strong>: 🟢 On Track
<br>
<strong>Dev Link</strong>:
<br>
<strong>Project Log</strong>:

- 9/16/24: WP Backend built locally
- 9/19/24: Frontend connected to backend and queries are successful; Docs in progress; Backend and frontend ready to be pushed to WPEngine

## 🛠️ Local Setup - Faust.js & Local (by Flywheel)

Clone project repo:

```bash
git clone git@github.com:weareoutright/wpadc-archive.git wpadc
cd wpadc
```

Original code template originates from:

```bash
npx create-next-app \
    -e https://github.com/wpengine/faustjs/tree/canary \
    --example-path examples/next/faustwp-getting-started \
    --use-npm
```

(For Faust Setup, see docs: https://faustjs.org/tutorial/get-started-with-faust)

1. Be sure to have Local set up on your machine.
   Download here: https://localwp.com/

2. In your Local advanced settings, change Router Mode to "Site Domain" (instead of the default, localhost).

3. Navigate back to the site in your Local app and take note of Site domain. Copy and paste this domain into your `.env.local` file for:

```
NEXT_PULIC_WORDPRESS_URL={Site domain from Local}
```

4. Once you have all your .env variables in your `.env.local`, run:

```
npm run dev
```

<br>

### 🧐 Troubleshooting:

#### 🪲 GraphQL Error

```
error - Unable to find a GraphQL endpoint at https://wpadc-archive-dev.local/index.php?graphql
error - WPGraphQL may not be active, or your WordPress site is unavailable.
```

- Be sure your Wordpress instance in Local is started and running
- Be sure WPGraphQL is installed and activated in your Wordpress instance
- Be sure your Local advanced settings for Router Mode is set to "Site domain"
- Check your `.env.local` variables; Ensure they are correct

#### 🪲 Validation Failed

```
error - Validation Failed: Your Faust front-end site URL value is misconfigured. It should NOT match the `NEXT_PUBLIC_WORDPRESS_URL.
```

- Frontend url needed for the Faust.js plugin is the url from which your frontend site is being hosted. For local development, this means it will probably be a `localhost:{PORT}` address
- If your repo is already hosted on WPEngine Headless Wordpress, your frontend url will be the domain WPEngine Headless generates for you

<br>

# 📚 Docs & Helpful Articles

- Local (WPEngine Desktop App) - https://localwp.com/help-docs/
- Faust.js (more helpful for setup compared to WPEngine Headless docs) - https://faustjs.org/tutorial/get-started-with-faust
- WPEngine Headless Wordpress - https://developers.wpengine.com/docs/atlas/overview/

<br>

# 🫂 Support

If you got aaaalllll the way down here and your console/terminal is still screaming at you, you are on the verge of throwing your computer in a dumpster, or perhaps questioning your career choices, reach out to Dakota 😅

<br>

Happy Coding!
