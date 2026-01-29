import profileData from "@/data/profileDetails.json";
import Image from "next/image";

export default function SocialTab() {
  const { socials } = profileData;

  return (
    <div className="bg-[#FDFDFD]  rounded-md border border-[#EBEBEB] px-4 py-4">
      <div className="flex items-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-md bg-[#F2F9FE] flex items-center justify-center border border-[#4157FE33]">
          <Image
            src="/assets/user-square.svg"
            alt="cover"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col justify-center pt-1">
          <h3 className="text-sm font-semibold text-[#191F38] leading-5 -tracking-tight">
            Social Profiles
          </h3>
          <p className="text-xs leading-5 -tracking-tight text-[#697588]">
            {socials.personal.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials.contact.map((social, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8.5 h-8.5 rounded-md bg-[#F2F9FE] border border-[#EBEBEB] flex items-center justify-center shrink-0">
              <Image
                src={`/assets/${social.icon}`}
                alt=""
                width={16}
                height={16}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold leading-5 -tracking-tight text-[#191F38]">
                {social.platform}
              </span>
              <span className="text-[11px] text-[#697588] leading-3.5 -tracking-tight">
                {social.handle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
