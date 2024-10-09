interface ClubsLayoutProps {
  children: React.ReactNode;
}

export default function ClubsLayout({ children }: ClubsLayoutProps) {
  return (
    <>
      <h1>Clubs Layout</h1>
      {children}
    </>
  );
}
