import { LargestPrimePage } from "@/lib/LargestPrimePage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { datadogRum } from "@datadog/browser-rum";

const ClientFetchingPrimePage = () => {
  const router = useRouter();

  let maxString = router.query.maximum;

  const max = Number.parseInt(maxString as string);

  const [data, setData] = useState<null | number>(null);

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
      allowedTracingUrls: [
        { match: () => true, propagatorTypes: ["tracecontext"] },
      ],
    });

    datadogRum.startSessionReplayRecording();

    console.log("initialized rum", { datadogRum });
    if (Number.isNaN(max)) {
      return;
    }
    fetch(`/api/get-largest-prime?maximum=${max}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, [max]);

  return (
    <LargestPrimePage
      maximum={max}
      largestPrime={data}
      contentStrategy="client-fetching"
    />
  );
};

export default ClientFetchingPrimePage;
