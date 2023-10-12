import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { datadogRum } from "@datadog/browser-rum";
import { useEffect } from "react";

export default function Document() {
  useEffect(() => {
    datadogRum.init({
      applicationId: "7f7faa98-e0a9-4ede-a695-48d1eeb49af5",
      clientToken: "pub46e58b189429c7efd4f70fba7f20c02e",
      site: "datadoghq.com",
      service: "nextjs-dev",
      env: "<ENV_NAME>",
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    });

    datadogRum.startSessionReplayRecording();

    console.log("initialized rum", { datadogRum });
  }, []);

  console.log("TESTING LOG");

  return (
    <Html lang="en">
      <Head />
      <body>
        <Link href="/">
          <h1>Datadog Next.js Prime Finder!</h1>
        </Link>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
