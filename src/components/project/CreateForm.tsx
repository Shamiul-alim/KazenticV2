import { useForm, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { X, ChevronDown, Calendar, UserPlus } from "lucide-react";

interface FloatingFormProps {
  onClose: () => void;
}

const CreateForm: React.FC<FloatingFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: FieldValues) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-100">
      {/* Modal Container */}
      <div className="bg-[#FFFFFF] rounded-[16px] w-[95%] sm:w-[580px] max-h-[92vh] overflow-y-auto relative shadow-2xl hide-scrollbar flex flex-col">
        {/* Header */}
        <div className="p-3 pb-2 flex justify-between items-start">
          <div>
            <h2 className="text-sm font-semibold text-[#191F38] leading-5 tracking-tighter">
              Create Project
            </h2>
            <p className="text-[#697588] text-[11px] mt-1.5 font-medium leading-5 tracking-tighter">
              Start your next build.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-[#F2F9FE] text-[#4157FE] flex justify-center items-center hover:bg-blue-100 transition-colors"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 pt-1.5 space-y-5"
        >
          {/* Project Icon & Name */}
          <div className="space-y-2">
            <Label>Project Icon & name</Label>
            <div className="flex items-center border border-[#EBEBEB] rounded-lg p-1 px-2 bg-white focus-within:ring-1 ring-[#4157FE]/30 transition-all">
              <div className="w-8 h-8 bg-[#4157FE] rounded flex items-center justify-center text-white font-bold text-[0.75rem] shrink-0">
                P
              </div>
              <input
                {...register("projectName", { required: true })}
                placeholder="Project Name"
                className="w-full h-9 px-3 text-[0.875rem] outline-none placeholder:text-[#C1C1C1]"
              />
            </div>
          </div>

          {/* Row 1: Start Date & Identifier */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Start Date</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  {...register("startDate", {
                    required: "Please provide project start date",
                  })}
                  className={`h-11 border-[#EBEBEB] rounded-lg text-[0.875rem] pr-10 ${errors.startDate ? "border-red-500 bg-red-50/10" : ""}`}
                />
                <Calendar
                  className="absolute right-3 top-3 text-[#6F6F6F]"
                  size={18}
                />
              </div>
              {errors.startDate && (
                <p className="text-[#E11D48] text-[0.75rem] font-medium">
                  {String(errors.startDate.message)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Project Identifier</Label>
              <Input
                placeholder="Enter Project Identifier"
                className="h-11 border-[#EBEBEB] rounded-lg text-[0.875rem] placeholder:text-[#C1C1C1]"
              />
            </div>
          </div>

          {/* Row 2: Delivery Date & Github URL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expected Delivery Date</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="h-11 border-[#EBEBEB] rounded-lg text-[0.875rem] pr-10"
                />
                <Calendar
                  className="absolute right-3 top-3 text-[#6F6F6F]"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Github Repository URL</Label>
              <Input
                placeholder="https://github.com/username/re..."
                className="h-11 border-[#EBEBEB] rounded-lg text-[0.875rem] placeholder:text-[#C1C1C1]"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <Label>Project Type</Label>
            <div className="relative">
              <select className="w-full h-11 border border-[#EBEBEB] rounded-lg px-4 outline-none appearance-none text-[0.875rem] text-[#6F6F6F] bg-white cursor-pointer">
                <option value="">Select Project Type</option>
                <option value="web">Web Development</option>
                <option value="saas">SaaS Platform</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-[#6F6F6F]"
                size={18}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Descriptio</Label>
            <textarea
              rows={4}
              placeholder="Provide description of project"
              className="w-full border border-[#EBEBEB] rounded-lg p-3 text-[0.875rem] outline-none placeholder:text-[#C1C1C1] focus:ring-1 ring-[#4157FE]/20 resize-none min-h-[100px]"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-[#191F38] text-[0.875rem]">
                Make this project Private
              </p>
              <p className="text-[#6F6F6F] text-[0.75rem]">
                Only you and invited members will have access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[#EBEBEB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4157FE]"></div>
            </label>
          </div>

          {/* Footer: Share & Create */}
          <div className="pt-6 border-t border-[#EBEBEB] flex justify-between items-end">
            <div className="space-y-3">
              <p className="font-semibold text-[#191F38] text-[0.875rem]">
                Share with
              </p>
              <div className="flex items-center -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"
                  >
                    <div className="w-full h-full bg-slate-400" />{" "}
                    {/* Replace with your <Image /> */}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F2F9FE] flex items-center justify-center text-[#4157FE] text-[0.7rem] font-bold z-10">
                  +5
                </div>
                <button
                  type="button"
                  className="ml-4 w-8 h-8 rounded-full border border-dashed border-[#C1C1C1] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <UserPlus size={14} className="text-[#6F6F6F]" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#4157FE] text-white px-8 py-2.5 rounded-lg text-[0.875rem] font-semibold hover:bg-[#3446eb] transition-all shadow-lg shadow-[#4157FE]/20 active:scale-95"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
