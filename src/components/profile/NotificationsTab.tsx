import profileData from "@/data/profileDetails.json";
import Image from "next/image";
import { Switch } from "../ui/switch";

const Toggle = ({ active }: { active: boolean }) => (
  <div
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${active ? "bg-[#4157FE]" : "bg-gray-200"}`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-sm transform duration-300 ease-in-out ${active ? "translate-x-5" : "translate-x-0"}`}
    />
  </div>
);

export default function NotificationsTab() {
  const { notifications } = profileData;

  return (
    <div className="bg-[#FDFDFD] rounded-md border border-[#EBEBEB] px-4 py-4">
      <div className="flex items-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-md bg-[#F2F9FE] flex items-center justify-center border border-[#4157FE33]">
          <Image
            src="/assets/notification-blue.svg"
            alt="cover"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col justify-center pt-1">
          <h3 className="text-xs font-semibold leading-5 -tracking-tight text-[#191F38]">
            Notifications
          </h3>
          <p className="text-[11px] text-[#697588] leading-3.5 -tracking-tight">
            {notifications.personal.description}
          </p>
        </div>
      </div>

      <div className="overflow-hidden overflow-x-auto hide-scrollbar rounded-md border border-[#EBEBEB]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F9FE] border-b border-[#EBEBEB]">
              <th className="py-4 px-6 text-[11px] font-semibold text-[#191F38] leading-3.5 -tracking-tight">
                Notifications Type
              </th>
              <th className="py-4 px-6 text-[11px] font-semibold text-[#191F38] leading-3.5 -tracking-tight text-center w-32">
                In App
              </th>
              <th className="py-4 px-6 text-[11px] font-semibold text-[#191F38] leading-3.5 -tracking-tight text-center w-32">
                Telegram
              </th>
              <th className="py-4 px-6 text-[11px] font-semibold text-[#191F38] leading-3.5 -tracking-tight text-center w-32">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.contact.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="py-4 px-6 text-[12px] font-medium text-[#191F38]leading-5 -tracking-tight">
                  {item.type}
                </td>
                <td className="py-4 px-6 flex justify-center">
                  <Switch defaultChecked={true} />
                </td>
                <td className="py-4 px-6 text-center">
                  <Switch defaultChecked={true} />
                </td>
                <td className="py-4 px-6 text-center">
                  <Switch defaultChecked={true} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
