import { SEOHead } from "./SEOHead";

interface CalculatorSEOProps {
  name: string;
  description: string;
  path: string;
  category: "Finance" | "Health" | "Math" | "Tools";
  keywords?: string[];
}

export const CalculatorSEO = ({
  name,
  description,
  path,
  category,
  keywords = [],
}: CalculatorSEOProps) => {
  const baseUrl = "https://calchub.com";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${name} - CalcHub`,
    "description": description,
    "url": `${baseUrl}${path}`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CalcHub",
      "url": baseUrl
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": `${baseUrl}${path}`
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${category} Calculators`,
        "item": `${baseUrl}/${category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": `${baseUrl}${path}`
      }
    ]
  };

  const combinedStructuredData = [structuredData, breadcrumbData];

  const defaultKeywords = [
    name.toLowerCase(),
    `${name.toLowerCase()} online`,
    `free ${name.toLowerCase()}`,
    `${category.toLowerCase()} calculator`,
    "online calculator",
    "free calculator"
  ];

  return (
    <SEOHead
      title={name}
      description={description}
      canonicalPath={path}
      keywords={[...defaultKeywords, ...keywords]}
      structuredData={combinedStructuredData}
    />
  );
};
