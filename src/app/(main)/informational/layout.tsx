interface InformationalLayoutProps {
  children: React.ReactNode;
}

export default function InfoLayout({ children }: InformationalLayoutProps) {
  return (
    <>
      <h1>Informational Layout</h1>
      {children}
    </>
  );
}
