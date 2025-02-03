import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Qantas coding challenge</title>
      <body>{children}</body>
    </html>
  );
}
