import Sidebar from "@/components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import SideMenu from "@/components/sidemenu/SideMenu";
import ApplicationTopbar from "@/components/layout/ApplicationTopbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="bg-[#111953] relative hidden lg:flex shrink-0">
          <SideMenu />
        </div>

        <div className="flex-1 bg-[#111953] flex flex-col min-w-0 min-h-0">
          <ApplicationTopbar />
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
