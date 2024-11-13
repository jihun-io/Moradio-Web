export function generateMetadata({
  title = "Moradio",
  description = "모든 라디오를 한 곳에서, Moradio!",
  currentUrl = "https://moradio.jihun.io",
  metadataBase = "https://moradio.jihun.io"
} = {}) {
  return {
    metadataBase: new URL(metadataBase),
    title: title,
    description: description,
    icons: {
      icon: [
        { url: `${metadataBase}/metadata/favicon.ico` },
        {
          url: `${metadataBase}/metadata/favicon-16x16.png`,
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/favicon-32x32.png`,
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/favicon-96x96.png`,
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: `${metadataBase}/metadata/apple-icon-57x57.png`,
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-60x60.png`,
          sizes: "60x60",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-72x72.png`,
          sizes: "72x72",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-76x76.png`,
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-114x114.png`,
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-120x120.png`,
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-144x144.png`,
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-152x152.png`,
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: `${metadataBase}/metadata/apple-icon-180x180.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "icon",
          url: `${metadataBase}/metadata/android-icon-192x192.png`,
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    manifest: `${metadataBase}/metadata/manifest.json`,
    openGraph: {
      type: "website",
      url: currentUrl,
      title: title,
      description: description,
      images: [
        {
          url: `${metadataBase}/metadata/meta.png`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${metadataBase}/metadata/meta.png`],
    },
    other: {
      "msapplication-TileImage": `${metadataBase}/metadata/ms-icon-144x144.png`,
    },
  };
}
