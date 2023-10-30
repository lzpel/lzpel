import { Metadata } from "next";

const CustomMetadata = (title?: string, description?: string): Metadata => {
  const BaseTitle = "自己組織型海上都市";
  const Title = title ? `${title} - ${BaseTitle}` : BaseTitle;
  const Description = description ?? "Floating Offshore Self-constructing City";
  return {
    title: Title,
    authors: { name: "lzpel" },
    description: Description,
    openGraph: {
      title: Title,
      description: Description,
      //images: url("/profile.jpg", true),
      locale: "ja_JP",
      type: "website",
    },
  };
};
export default CustomMetadata;
