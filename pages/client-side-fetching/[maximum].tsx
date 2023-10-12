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
      allowedTracingUrls: [{ match: /.*/, propagatorTypes: ["tracecontext"] }],
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
