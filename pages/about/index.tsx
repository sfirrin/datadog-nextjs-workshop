import { datadogRum } from "@datadog/browser-rum";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    datadogRum.init({
      applicationId: "4213a195-ef0b-4251-ae47-061c5258d38e",
      clientToken: "pubf7d2286c57cb873b902f0fdea0f26dae",
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
      allowedTracingUrls: [{ match: /.*/, propagatorTypes: ["tracecontext"] }],
    });

    datadogRum.startSessionReplayRecording();

    console.log("Initialized RUM", { datadogRum });
  }, []);

  return (
    <div>
      <div>Hello Stephen!</div>
      <button
        onClick={() => {
          const generateError = (undefined as any).title;
        }}
      >
        Hello
      </button>
    </div>
  );
};

export default AboutPage;
