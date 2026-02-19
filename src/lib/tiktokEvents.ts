import { supabase } from "@/integrations/supabase/client";

interface TikTokUserData {
  email?: string;
  phone?: string;
  ip?: string;
  userAgent?: string;
  ttclid?: string;
}

interface TikTokEventProperties {
  value?: number;
  currency?: string;
  content_type?: string;
  contents?: Array<{
    content_id: string;
    content_name: string;
    content_category?: string;
    quantity: number;
    price: number;
  }>;
}

// Get ttclid from URL if present
function getTtclid(): string | undefined {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("ttclid") || undefined;
  } catch {
    return undefined;
  }
}

// Fire server-side event via edge function
async function fireServerEvent(
  event: string,
  userData: TikTokUserData = {},
  properties?: TikTokEventProperties
): Promise<void> {
  try {
    const enrichedUser: TikTokUserData = {
      ...userData,
      userAgent: navigator.userAgent,
      ttclid: userData.ttclid || getTtclid(),
    };

    await supabase.functions.invoke("tiktok-events", {
      body: { event, userData: enrichedUser, properties },
    });
  } catch (err) {
    console.error("[TikTok Events] Server-side error:", err);
  }
}

// Fire client-side pixel event (browser pixel)
function firePixelEvent(event: string, params?: Record<string, unknown>): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ttq = (window as any).ttq;
    if (ttq) {
      if (params) {
        ttq.track(event, params);
      } else {
        ttq.track(event);
      }
    }
  } catch (err) {
    console.error("[TikTok Pixel] Client-side error:", err);
  }
}

// ===== Public event functions =====

export async function trackViewContent(userData?: TikTokUserData): Promise<void> {
  // Client-side pixel
  firePixelEvent("ViewContent", {
    content_type: "product",
    content_name: "Tapetes Bandeja 3D Premium",
  });

  // Server-side
  await fireServerEvent(
    "ViewContent",
    userData || {},
    {
      content_type: "product",
      contents: [
        {
          content_id: "tapetes-bandeja-3d",
          content_name: "Tapetes Bandeja 3D Premium",
          content_category: "Acessórios Automotivos",
          quantity: 1,
          price: 173.93,
        },
      ],
      currency: "BRL",
    }
  );
}

export async function trackInitiateCheckout(
  userData: TikTokUserData,
  price: number,
  kitLabel: string
): Promise<void> {
  // Client-side pixel
  firePixelEvent("InitiateCheckout", {
    value: price,
    currency: "BRL",
    content_type: "product",
  });

  // Server-side
  await fireServerEvent(
    "InitiateCheckout",
    userData,
    {
      value: price,
      currency: "BRL",
      content_type: "product",
      contents: [
        {
          content_id: "tapetes-bandeja-3d",
          content_name: kitLabel,
          content_category: "Acessórios Automotivos",
          quantity: 1,
          price,
        },
      ],
    }
  );
}

export async function trackPurchase(
  userData: TikTokUserData,
  price: number,
  kitLabel: string
): Promise<void> {
  // Client-side pixel
  firePixelEvent("CompletePayment", {
    value: price,
    currency: "BRL",
    content_type: "product",
  });

  // Server-side
  await fireServerEvent(
    "CompletePayment",
    userData,
    {
      value: price,
      currency: "BRL",
      content_type: "product",
      contents: [
        {
          content_id: "tapetes-bandeja-3d",
          content_name: kitLabel,
          content_category: "Acessórios Automotivos",
          quantity: 1,
          price,
        },
      ],
    }
  );
}
