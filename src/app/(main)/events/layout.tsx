interface EventLayoutProps {
  children: React.ReactNode;
}

export default function EventLayout({ children }: EventLayoutProps) {
  return (
    <>
      <h1>Event Layout</h1>
      {children}
    </>
  );
}
