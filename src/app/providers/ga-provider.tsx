"use client";
import Script from 'next/script';

export default function GAProvider() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;
  return (
    <>
      <Script id="ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
      <Script id="utm-capture" strategy="afterInteractive">
        {`
          (function(){
            try {
              const params = new URLSearchParams(window.location.search);
              const utm = {};
              let has = false;
              ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{
                const v = params.get(k);
                if (v) { utm[k] = v; has = true; }
              });
              if (has) sessionStorage.setItem('utm_params', JSON.stringify(utm));
            } catch (e) {}
          })();
        `}
      </Script>
    </>
  );
}

