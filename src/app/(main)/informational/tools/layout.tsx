interface ClassToolsLayoutProps {
  children: React.ReactNode;
}

export default function ClassToolsLayout({ children }: ClassToolsLayoutProps) {
  return (
    <>
      <h1>Class Tools Layout</h1>
      {children}
    </>
  );
}
