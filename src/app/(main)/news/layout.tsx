interface NewsLayoutProps {
  children: React.ReactNode;
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return (
    <>
      <h1>News Layout</h1>
      {children}
    </>
  );
}
