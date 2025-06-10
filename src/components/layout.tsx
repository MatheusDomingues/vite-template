import { Header } from "./header";

export function Layout({
  children,
  hasBackButton,
}: {
  children: React.ReactNode;
  hasBackButton?: boolean;
}) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header hasBackButton={hasBackButton} />
      <div className="flex h-[calc(100vh-80px)]">
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
