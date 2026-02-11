"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  X,
  Plus,
  Calendar,
  Clock,
  Flag,
  Tag,
  Hash,
  Phone,
  Eye,
  XCircle,
  Globe,
  Star,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";

/* --------------------------------- Types --------------------------------- */
interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubtaskItem = { id: string; name: string };
type ChecklistItem = { id: string; name: string; done: boolean };

type AttachmentItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
};

type CustomFieldKey =
  | "dropdown"
  | "date"
  | "email"
  | "tags"
  | "money"
  | "number"
  | "phone"
  | "rating"
  | "website";

type CustomFieldDef = {
  key: CustomFieldKey;
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
};

/* ------------------------------ Constants/Data ---------------------------- */
const ALL_CUSTOM_FIELDS: CustomFieldDef[] = [
  {
    key: "dropdown",
    label: "Dropdown",
    icon: (
      <Image
        src="/assets/arrow-circle-up.svg"
        alt="BD"
        width={16}
        height={16}
        className="rotate-180"
      />
    ),
    value: "Option 1",
  },
  {
    key: "date",
    label: "Date",
    icon: (
      <Image src="/assets/calendar-blue.svg" alt="BD" width={16} height={16} />
    ),
    value: "Choose",
  },
  {
    key: "email",
    label: "Email",
    icon: <Image src="/assets/sms.svg" alt="BD" width={16} height={16} />,
    value: "Type Here",
  },
  {
    key: "tags",
    label: "Tags",
    icon: <Image src="/assets/tag-blue.svg" alt="BD" width={16} height={16} />,
    value: "Choose",
  },
  {
    key: "money",
    label: "Money",
    icon: (
      <Image
        src="/assets/dollar-circle-blue.svg"
        alt="BD"
        width={16}
        height={16}
      />
    ),
    value: "$",
  },
  {
    key: "number",
    label: "Number",
    icon: <Hash size={14} />,
    value: "Type Here",
  },
  {
    key: "phone",
    label: "Phone",
    icon: <Phone size={14} />,
    value: "+99047347544656",
  },
  {
    key: "rating",
    label: "Rating",
    icon: <Star size={14} />,
    value: (
      <div className="flex items-center gap-0.5">
        <Star size={12} className="fill-[#F97316] text-[#F97316]" />
        <Star size={12} className="fill-[#F97316] text-[#F97316]" />
        <Star size={12} className="text-[#CBD5E1]" />
      </div>
    ),
  },
  {
    key: "website",
    label: "Website",
    icon: <Globe size={14} />,
    value: "Type Here",
  },
];

/* -------------------------------- Helpers -------------------------------- */
const uid = () => crypto.randomUUID();

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const getExtension = (name: string) => {
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toUpperCase() : "";
};

/* -------------------------------- Component ------------------------------ */
export default function CreateTask({ isOpen, onClose }: CreateTaskProps) {
  /* ------------------------------ UI / Tabs ------------------------------ */
  const [activeTab, setActiveTab] = useState("subtask");

  /* ----------------------------- Custom Fields ---------------------------- */
  const [visibleFieldKeys, setVisibleFieldKeys] = useState<CustomFieldKey[]>([
    "dropdown",
    "date",
    "email",
  ]);
  const [addFieldOpen, setAddFieldOpen] = useState(false);

  const visibleFields = useMemo(() => {
    const map = new Map(ALL_CUSTOM_FIELDS.map((f) => [f.key, f]));
    return visibleFieldKeys
      .map((k) => map.get(k))
      .filter(Boolean) as CustomFieldDef[];
  }, [visibleFieldKeys]);

  const remainingFields = useMemo(() => {
    const set = new Set(visibleFieldKeys);
    return ALL_CUSTOM_FIELDS.filter((f) => !set.has(f.key));
  }, [visibleFieldKeys]);

  const addField = (key: CustomFieldKey) => {
    setVisibleFieldKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setAddFieldOpen(false);
  };

  const removeField = (key: CustomFieldKey) => {
    setVisibleFieldKeys((prev) => prev.filter((k) => k !== key));
  };

  /* ------------------------------- Subtasks ------------------------------- */
  const [subtasks, setSubtasks] = useState<SubtaskItem[]>([
    { id: uid(), name: "" },
    { id: uid(), name: "" },
  ]);

  const addSubtask = () =>
    setSubtasks((prev) => [...prev, { id: uid(), name: "" }]);

  const removeSubtask = (id: string) =>
    setSubtasks((prev) => prev.filter((s) => s.id !== id));

  const updateSubtask = (id: string, name: string) =>
    setSubtasks((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));

  /* ------------------------------ Checklists ------------------------------ */
  const [checklists, setChecklists] = useState<ChecklistItem[]>([
    { id: uid(), name: "", done: false },
    { id: uid(), name: "", done: false },
  ]);

  const addChecklist = () =>
    setChecklists((prev) => [...prev, { id: uid(), name: "", done: false }]);

  const removeChecklist = (id: string) =>
    setChecklists((prev) => prev.filter((c) => c.id !== id));

  const updateChecklist = (id: string, name: string) =>
    setChecklists((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );

  const toggleChecklistDone = (id: string) =>
    setChecklists((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    );

  const checklistDoneCount = useMemo(
    () => checklists.filter((c) => c.done).length,
    [checklists],
  );

  /* ------------------------------ Attachments ----------------------------- */
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<AttachmentItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files);
    const newItems: AttachmentItem[] = list.map((f) => ({
      id: uid(),
      name: f.name,
      size: f.size,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    setAttachments((prev) => [...newItems, ...prev]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  const downloadAttachment = (file: AttachmentItem) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.name;
    a.click();
  };

  const openPreview = (file: AttachmentItem) => {
    setPreviewFile(file);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewFile(null);
  };

  /* -------------------------------- Render -------------------------------- */
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[640px] p-0 bg-white border-[#EBEBEB] gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-4 py-3 flex flex-row items-center">
          <DialogTitle className="text-sm font-bold text-[#191F38]">
            Create Task
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Task Name & Description */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Task Name</Label>
              <Input placeholder="Task Name" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea placeholder="Add Description" />
            </div>
          </div>

          {/* Core Details Row */}
          <div className="space-y-3">
            <Label>Core Details</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge className="bg-[#DCFCE7] border border-[#05966980] text-[#22C55E] px-3 py-1 h-7 text-[10px] font-bold">
                ✓ ACTIVE
              </Badge>
              <Button variant="outline">
                <Calendar size={14} /> Due Date
              </Button>
              <Button variant="outline">
                <Clock size={14} /> Time Estimate
              </Button>
              <Button variant="outline">
                <div className="w-4.5 h-4.5 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[8px] font-bold">
                  AH
                </div>
                Alif Hassan
              </Button>
              <Button variant="outline">
                <Flag size={14} /> Priority
              </Button>
              <Button variant="outline">
                <Tag size={14} /> 2 tags
              </Button>
            </div>
          </div>

          <hr className="border-[#EBEBEB]" />

          {/* Tabs */}
          <Tabs
            defaultValue="subtask"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-transparent justify-start p-0 h-auto gap-2 mb-6 border-none">
              {["Subtask", "Checklists", "Attachments", "Custom Fields"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace(" ", "")}
                    className={`px-3 py-1.5 text-xs border rounded-md transition-all
                      data-[state=active]:bg-[#EEF2FF] data-[state=active]:text-[#4157FE] data-[state=active]:border-[#4157FE26]
                      data-[state=inactive]:border-[#EBEBEB] data-[state=inactive]:text-[#697588]`}
                  >
                    {tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>

            {/* ----------------------------- Subtasks ----------------------------- */}
            <TabsContent value="subtask" className="space-y-4 mt-0">
              <div className="space-y-3">
                <Label>Subtasks</Label>

                {subtasks.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 group">
                    <div className="flex-1 flex items-center h-9 px-3 bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg">
                      <Image
                        src="/assets/sub-task.svg"
                        alt=""
                        width={16}
                        height={16}
                      />

                      <Input
                        value={s.name}
                        onChange={(e) => updateSubtask(s.id, e.target.value)}
                        className="border-none flex items-center h-7 p-0 px-2"
                        placeholder="Task name"
                      />

                      <Button variant="transparent" size="md" type="button">
                        <Image
                          src="/assets/edit.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>

                      <Button
                        variant="transparent"
                        size="md"
                        type="button"
                        onClick={() => removeSubtask(s.id)}
                      >
                        <Image
                          src="/assets/close-circle-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="bg-[#F4F5F6]"
                  type="button"
                  onClick={addSubtask}
                >
                  <Plus size={14} /> Add More Subtask
                </Button>
              </div>
            </TabsContent>

            {/* ---------------------------- Checklists ---------------------------- */}
            <TabsContent value="checklists" className="space-y-4 mt-0">
              <div className="space-y-3 pt-2">
                <label className="text-xs font-medium text-[#191F38]">
                  Checklist{" "}
                  <span className="text-[#697588] font-normal">
                    ({checklistDoneCount}/{checklists.length})
                  </span>
                </label>

                {checklists.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <div className="flex-1 flex items-center h-10 px-3 bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg">
                      <button
                        type="button"
                        onClick={() => toggleChecklistDone(c.id)}
                        className={`w-3.5 h-3.25 rounded-full border ${
                          c.done
                            ? "bg-[#4157FE] border-[#4157FE]"
                            : "border-[#697588]"
                        }`}
                      />

                      <Input
                        value={c.name}
                        onChange={(e) => updateChecklist(c.id, e.target.value)}
                        className="border-none flex items-center h-7 p-0 px-2 text-xs"
                        placeholder="Checklist name"
                      />

                      <Button variant="transparent" size="md" type="button">
                        <Image
                          src="/assets/user-add-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>

                      <Button
                        variant="transparent"
                        size="md"
                        type="button"
                        onClick={() => removeChecklist(c.id)}
                      >
                        <Image
                          src="/assets/close-circle-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="bg-[#F4F5F6]"
                  type="button"
                  onClick={addChecklist}
                >
                  <Plus size={14} /> Add More List
                </Button>
              </div>
            </TabsContent>

            {/* --------------------------- Attachments --------------------------- */}
            <TabsContent value="attachments" className="space-y-4 mt-0">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.currentTarget.value = "";
                }}
              />

              <div
                className={`border-2 border-dashed border-[#EBEBEB] rounded-lg p-8 flex flex-col items-center justify-center bg-[#FDFDFD] transition-all ${
                  isDragging ? "border-[#4157FE] bg-[#F2F9FE]" : ""
                }`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.length)
                    addFiles(e.dataTransfer.files);
                }}
              >
                <p className="text-xs text-[#697588]">
                  Drop your files heres to{" "}
                  <span
                    className="text-[#4157FE] underline cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    upload
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {attachments.length === 0 ? (
                  <div className="col-span-2 text-[11px] text-[#697588]">
                    No attachments yet.
                  </div>
                ) : (
                  attachments.map((f) => (
                    <div
                      key={f.id}
                      className="group flex items-center justify-between p-2.5 border border-[#EBEBEB] rounded-lg bg-[#FFFFFF] hover:border-[#4157FE] hover:bg-[#F2F9FE] transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Image
                          src="/assets/document.svg"
                          alt="file"
                          width={34.61}
                          height={34.61}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-medium leading-5 tracking-tighter text-[#191F38] truncate">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-[#697588]">
                            {formatSize(f.size)} •{" "}
                            {getExtension(f.name) || "FILE"}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1 items-center text-gray-300 shrink-0">
                        <button
                          type="button"
                          onClick={() => downloadAttachment(f)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2"
                          aria-label="Download"
                        >
                          <Image
                            src="/assets/download.svg"
                            alt="download"
                            width={18}
                            height={18}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => openPreview(f)}
                          aria-label="Preview"
                          className="flex items-center"
                        >
                          <Eye
                            size={16}
                            className="cursor-pointer group-hover:text-indigo-500"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeAttachment(f.id)}
                          aria-label="Remove"
                          className="flex items-center"
                        >
                          <Image
                            src="/assets/cross-black.svg"
                            alt="remove"
                            width={18}
                            height={18}
                          />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Dialog
                open={previewOpen}
                onOpenChange={(o) => (o ? null : closePreview())}
              >
                <DialogContent className="max-w-[720px] max-h-[410] p-0 bg-white border-[#EBEBEB] gap-0 overflow-hidden">
                  <DialogHeader className="px-4 py-3 flex flex-row items-center justify-between border-b border-[#EBEBEB]">
                    <DialogTitle className="text-sm font-bold text-[#191F38]">
                      {previewFile?.name ?? "Preview"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-4">
                    {!previewFile ? null : previewFile.type.startsWith(
                        "image/",
                      ) ? (
                      <div className="w-full">
                        <img
                          src={previewFile.url}
                          alt={previewFile.name}
                          className="w-full max-h-[60vh] object-contain rounded-md border border-[#EBEBEB]"
                        />
                      </div>
                    ) : previewFile.type === "application/pdf" ? (
                      <iframe
                        title="PDF Preview"
                        src={previewFile.url}
                        className="w-full h-[60vh] rounded-md border border-[#EBEBEB]"
                      />
                    ) : (
                      <div className="text-xs text-[#697588]">
                        No preview available for this file type.
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* -------------------------- Custom Fields -------------------------- */}
            <TabsContent value="customfields" className="space-y-2 mt-0">
              {visibleFields.map((field) => (
                <div
                  key={field.key}
                  className="flex items-center w-full h-9 bg-white border border-[#EBEBEB] rounded-lg overflow-hidden"
                >
                  <div className="flex items-center px-3 min-w-[160px] gap-2.5">
                    <div className="text-[#4157FE]">{field.icon}</div>
                    <span className="text-xs font-medium text-[#4157FE] flex-1">
                      {field.label}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-[#697588] hover:bg-transparent"
                    >
                      <Image
                        src="/assets/edit.svg"
                        alt="BD"
                        width={16}
                        height={16}
                      />
                    </Button>
                  </div>

                  <div className="h-full w-[1px] bg-[#EBEBEB]" />

                  <div className="flex flex-1 items-center justify-between px-3">
                    <div className="text-xs text-[#697588] font-medium leading-5 tracking-tight">
                      {field.value}
                    </div>

                    <Image
                      src="/assets/close-circle-gray.svg"
                      alt="BD"
                      width={16}
                      height={16}
                      onClick={() => removeField(field.key)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Popover open={addFieldOpen} onOpenChange={setAddFieldOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-[#F4F5F6]">
                      <Plus size={14} /> Add More List
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-[320px] p-2 border border-[#EBEBEB]"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search fields..." />
                      <CommandEmpty>No fields found.</CommandEmpty>

                      <CommandGroup heading="Available fields">
                        {remainingFields.map((f) => (
                          <CommandItem
                            key={f.key}
                            value={f.label}
                            onSelect={() => addField(f.key)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-[#4157FE]">{f.icon}</span>
                            <span className="text-xs text-[#191F38] font-medium">
                              {f.label}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>

                      {remainingFields.length === 0 && (
                        <>
                          <Separator className="my-2" />
                          <div className="px-2 py-2 text-[11px] text-[#697588]">
                            All fields are already added.
                          </div>
                        </>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 mt-5 border-t border-[#EBEBEB] flex justify-end">
          <Button variant="success" size="lg">
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
