interface MapLayoutProps {
  children: React.ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
  return (
    <>
      <h1>Map Layout</h1>
      {children}
    </>
  );
}
