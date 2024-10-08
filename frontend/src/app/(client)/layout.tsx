import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-shopper",
  description: "Generated by E-shopper",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full font-inter">
          <div className="flex size-full flex-col">{children}</div>
        </main>
      </body>
    </html>
  );
}
