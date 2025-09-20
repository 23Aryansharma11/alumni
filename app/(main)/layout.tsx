export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // check if user has all the required info
  return <section>{children}</section>;
}
