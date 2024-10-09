interface DiscountsLayoutProps {
  children: React.ReactNode;
}

export default function DiscountsLayout({ children }: DiscountsLayoutProps) {
  return (
    <>
      <h1>Discounts Layout</h1>
      {children}
    </>
  );
}
