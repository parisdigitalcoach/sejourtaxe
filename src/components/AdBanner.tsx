import { useEffect, useState } from "react";
import { pushAdUnit } from "../lib/integrations";

interface AdBannerProps {
  slotType: "top" | "bottom" | "faq";
}

export default function AdBanner({ slotType }: AdBannerProps) {
  const [adClientId, setAdClientId] = useState<string>("");
  const [adSlotId, setAdSlotId] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Read environment variables safely
    const metaEnv = (import.meta as any).env || {};
    const clientId = (metaEnv.VITE_GOOGLE_ADS_CLIENT || metaEnv.PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || "") as string;
    const slotTop = (metaEnv.VITE_GOOGLE_ADS_SLOT_TOP || metaEnv.PUBLIC_GOOGLE_ADS_SLOT_TOP || "") as string;
    const slotBottom = (metaEnv.VITE_GOOGLE_ADS_SLOT_BOTTOM || metaEnv.PUBLIC_GOOGLE_ADS_SLOT_BOTTOM || "") as string;

    setAdClientId(clientId);
    
    // Assign slot based on type
    if (slotType === "top") {
      setAdSlotId(slotTop);
    } else {
      // Bottom and FAQ slot use the bottom slot id
      setAdSlotId(slotBottom);
    }
    
    setIsLoaded(true);
  }, [slotType]);

  useEffect(() => {
    if (adClientId && adSlotId && isLoaded) {
      pushAdUnit();
    }
  }, [adClientId, adSlotId, isLoaded]);

  // If no environment variables are defined, render absolutely nothing
  if (!isLoaded || !adClientId || !adSlotId) {
    return null;
  }

  return (
    <div id={`ad-banner-${slotType}`} className="w-full my-6 mx-auto flex flex-col items-center justify-center print:hidden">
      <div className="w-full bg-[#f6f6f6] border border-black/10 p-2 text-center text-[10px] text-slate-400 font-mono tracking-wider">
        <span className="block mb-1 text-[9px] uppercase font-bold text-slate-500">Publicité ({slotType})</span>
        <div className="overflow-hidden flex items-center justify-center min-h-[90px] bg-white border border-dashed border-black/10">
          {/* Real Google AdSense Tag */}
          <ins
            className="adsbygoogle"
            style={{ display: "block", minWidth: "250px", height: "90px" }}
            data-ad-client={adClientId}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
