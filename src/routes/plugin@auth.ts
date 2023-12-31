import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";
import Spotify from "@auth/core/providers/spotify";
import type { Provider } from "@auth/core/providers";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db  from "../../drizzle/db"

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    adapter: DrizzleAdapter(db),
    pages: {
      error: "/sign-in/error"
    },
    providers: [
      Google({
        clientId: env.get("GOOGLE_ID")!,
        clientSecret: env.get("GOOGLE_SECRET")!,
      }),
      Discord({
        clientId: env.get("DISCORD_ID")!,
        clientSecret: env.get("DISCORD_SECRET")!,
      }),
      Spotify({
        clientId: env.get("SPOTIFY_ID")!,
        clientSecret: env.get("SPOTIFY_SECRET")!,
      }) ,
    ] as Provider[],
  }));
