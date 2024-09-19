# 🚧 WPADC Archive Site 🚧

⚠️ Slow for the Dev Zone - Devs At Work 👷🏽⚠️

## Local Setup - Faust.js & Local (by Flywheel)

Clone repo:

```bash
git clone git@github.com:weareoutright/wpadc-archive.git wpadc
cd wpadc
```

1. Be sure to have Local set up on your machine.
   Download here: https://localwp.com/

2. In your Local advanced settings, change Router Mode to "Site Domain" (instead of the default, localhost).

3. Navigate back to the site in your Local app and take note of Site domain. Copy and paste this domain into your `.env.local` file for

```bash
NEXT_PULIC_WORDPRESS_URL={Site domain from Local}
```

4. For Faust Setup, follow the docs: https://faustjs.org/tutorial/get-started-with-faust

Once you have all your .env variables in your `.env.local`, run

```
npm run dev
```

### Troubleshooting:

#### GraphQL Error

```
error - Unable to find a GraphQL endpoint at https://wpadc-archive-dev.local/index.php?graphql
error - WPGraphQL may not be active, or your WordPress site is unavailable.
```

- Be sure WPGraphQL is installed and activated in your Wordpress instance
- Be sure your Local advanced settings for Router Mode is set to "Site domain"
- Check your `.env.local` variables; Ensure they are correct

# Support

For setup support, reach out to Dakota.
