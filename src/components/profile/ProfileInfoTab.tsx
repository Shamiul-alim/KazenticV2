import profileData from "@/data/profileDetails.json";
import Image from "next/image";

const InfoCard = ({ label, value, icon, fullWidth = false }: any) => (
  <div
    className={`flex items-start gap-3 ${fullWidth ? "col-span-1 md:col-span-2 lg:col-span-3" : ""}`}
  >
    <div className="w-8.5 h-8.5 rounded-md bg-[#F2F9FE] border border-[#EBEBEB] flex items-center justify-center shrink-0">
      <Image src={`/assets/${icon}`} alt="" width={16} height={16} />
    </div>
    <div className="flex flex-col justify-center pt-1">
      <h4 className="text-xs font-semibold leading-5 -tracking-tight text-[#191F38]">
        {label}
      </h4>
      <p className="text-[11px] text-[#697588] leading-3.5 -tracking-tight">
        {value}
      </p>
    </div>
  </div>
);

export default function ProfileInfoTab() {
  const { profile } = profileData;

  return (
    <div className="bg-[#FDFDFD] rounded-md border border-[#EBEBEB] px-4 py-4">
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-md bg-[#F2F9FE] flex items-center justify-center border border-[#4157FE33]">
          <Image
            src="/assets/info-circle-blue.svg"
            alt="cover"
            width={24}
            height={24}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#191F38] leading-5 -tracking-tight">
            Personal Info
          </h3>
          <p className="text-xs leading-5 -tracking-tight text-[#697588]">
            {profile.personal.description}
          </p>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="mb-8 bg-[#FFFFFF]">
        <h4 className="text-xs font-semibold text-[#191F38] leading-6 -tracking-tight mb-4">
          Contact Info
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
          {profile.contact.map((item, i) => (
            <InfoCard key={i} {...item} />
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-8" />

      {/* Extra Info */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold text-[#191F38] leading-6 -tracking-tight mb-4">
          Extra
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
          <InfoCard {...profile.extra.education} />
          <InfoCard {...profile.extra.emergency} />
          <InfoCard {...profile.extra.marital} />

          {/* Skills Special Case */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-start gap-3">
            <div className="w-8.5 h-8.5 rounded-md bg-[#F2F9FE] border border-[#EBEBEB] flex items-center justify-center shrink-0">
              <Image
                src="/assets/chart-2.svg"
                alt="cover"
                width={16}
                height={16}
              />
            </div>
            <div>
              <h4 className="text-xs font-semibold leading-5 -tracking-tight text-[#191F38]">
                Skills
              </h4>
              <div className="flex gap-2 mt-1">
                {profile.extra.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="w-17.25 bg-[#F8FAFC] border border-[#EBEBEB] rounded-sm text-center text-[11px] text-[#697588] leading-5 -tracking-tight "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-8" />

      {/* Bank Info */}
      <div>
        <h4 className="text-xs font-semibold text-[#191F38] leading-6 -tracking-tight mb-4">
          Bank Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
          {profile.bank.map((item, i) => (
            <InfoCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
