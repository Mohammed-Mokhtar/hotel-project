import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full gap-12">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
