"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { CornerDownLeft, Plus, Search, Tag, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { TagDef } from "../utils/tags";
import { PRESET_COLORS, norm } from "../utils/tags";

const DEFAULT_NEUTRAL = "#6B7280";

function TagEditContent(props: {
  tag: TagDef;
  onCommit: (next: { label: string; color: string }) => void;
  onRemoveFromEntry: () => void;
  onDeleteTag: () => void;
  myColors: string[];
  addMyColor: (hex: string) => void;
  requestClose: () => void;
}) {
  const {
    tag,
    onCommit,
    onRemoveFromEntry,
    onDeleteTag,
    myColors,
    addMyColor,
    requestClose,
  } = props;

  const [draftLabel, setDraftLabel] = React.useState(tag.label);
  const [draftColor, setDraftColor] = React.useState(
    tag.color || DEFAULT_NEUTRAL,
  );

  const nameRef = useRef<HTMLInputElement | null>(null);
  const colorPickerRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setDraftLabel(tag.label);
    setDraftColor(tag.color || DEFAULT_NEUTRAL);
  }, [tag.id, tag.label, tag.color]);

  React.useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, []);

  const commitNow = (patch?: Partial<{ label: string; color: string }>) => {
    const nextLabel = (patch?.label ?? draftLabel).trim() || tag.label;
    const nextColor = patch?.color ?? draftColor ?? DEFAULT_NEUTRAL;
    onCommit({ label: nextLabel, color: nextColor });
  };

  return (
    <div className="p-3">
      <Input
        ref={nameRef}
        value={draftLabel}
        onChange={(e) => setDraftLabel(e.target.value)}
        className={[
          "h-10 rounded-xl",
          "bg-[#FFFFFF] border border-[#EBEBEB]",
          "text-sm text-[#191F38] placeholder:text-[#697588]",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
        ].join(" ")}
        placeholder="Tag name"
        onBlur={() => commitNow({ label: draftLabel })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commitNow({ label: draftLabel });
            requestClose();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setDraftLabel(tag.label);
            setDraftColor(tag.color || DEFAULT_NEUTRAL);
            requestClose();
          }
        }}
      />

      <div className="mt-3">
        <div className="text-[11px] text-[#697588] px-1 pb-2">Colors</div>

        <div className="grid grid-cols-6 gap-2">
          <button
            type="button"
            className={[
              "h-7 w-7 rounded-full border",
              draftColor === DEFAULT_NEUTRAL
                ? "border-[#4157FE]"
                : "border-[#EBEBEB]",
            ].join(" ")}
            style={{ backgroundColor: DEFAULT_NEUTRAL }}
            onClick={() => {
              setDraftColor(DEFAULT_NEUTRAL);
              commitNow({ color: DEFAULT_NEUTRAL });
            }}
          />

          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={[
                "h-7 w-7 rounded-full border",
                draftColor === c ? "border-[#4157FE]" : "border-[#EBEBEB]",
              ].join(" ")}
              style={{ backgroundColor: c }}
              onClick={() => {
                setDraftColor(c);
                commitNow({ color: c });
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[11px] text-[#697588] px-1 pb-2">My colors</div>

        <div className="flex items-center gap-2 flex-wrap">
          {myColors.map((c) => (
            <button
              key={c}
              type="button"
              className={[
                "h-7 w-7 rounded-full border",
                draftColor === c ? "border-[#4157FE]" : "border-[#EBEBEB]",
              ].join(" ")}
              style={{ backgroundColor: c }}
              onClick={() => {
                setDraftColor(c);
                commitNow({ color: c });
              }}
            />
          ))}

          <button
            type="button"
            className="h-7 w-7 rounded-full bg-[#FFFFFF] border border-[#EBEBEB] flex items-center justify-center hover:border-[#4157FE]"
            onClick={() => colorPickerRef.current?.click()}
            title="Add custom color"
          >
            <Plus size={14} className="text-[#697588]" />
          </button>

          <input
            ref={colorPickerRef}
            type="color"
            className="hidden"
            onChange={(e) => {
              const hex = e.target.value;
              addMyColor(hex);
              setDraftColor(hex);
              commitNow({ color: hex });
            }}
          />
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-[#EBEBEB]" />

      <div className="pt-3 flex items-center justify-between">
        <button
          type="button"
          className="text-[11px] text-[#697588] hover:text-[#191F38]"
          onClick={() => {
            onRemoveFromEntry();
            requestClose();
          }}
        >
          Remove from entry
        </button>

        <button
          type="button"
          className="flex items-center gap-2 text-[11px] text-red-500 hover:text-red-600"
          onClick={() => {
            onDeleteTag();
            requestClose();
          }}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export function AddEntryTagSection(props: {
  tagDefs: TagDef[];
  selectedIds: string[];
  addOpen: boolean;
  setAddOpen: (v: boolean) => void;
  tagQuery: string;
  setTagQuery: (v: string) => void;
  editId: string | null;
  setEditId: (v: string | null) => void;
  myColors: string[];
  addMyColor: (hex: string) => void;
  selectTag: (id: string) => void;
  removeSelected: (id: string) => void;
  createAndSelect: (label: string) => void;
  updateTag: (id: string, patch: Partial<TagDef>) => void;
  deleteTag: (id: string) => void;
  compact?: boolean;
  showIcon?: boolean;
}) {
  const {
    tagDefs,
    selectedIds,
    addOpen,
    setAddOpen,
    tagQuery,
    setTagQuery,
    editId,
    setEditId,
    myColors,
    addMyColor,
    selectTag,
    removeSelected,
    createAndSelect,
    updateTag,
    deleteTag,
    compact = false,
    showIcon = true,
  } = props;

  const addInputRef = useRef<HTMLInputElement | null>(null);

  const tagById = useMemo(() => {
    const m = new Map<string, TagDef>();
    for (const t of tagDefs) m.set(t.id, t);
    return m;
  }, [tagDefs]);

  const selectedTags = useMemo(() => {
    return selectedIds.map((id) => tagById.get(id)).filter(Boolean) as TagDef[];
  }, [selectedIds, tagById]);

  const filtered = useMemo(() => {
    const q = norm(tagQuery);
    if (!q) return tagDefs;
    return tagDefs.filter((t) => norm(t.label).includes(q));
  }, [tagDefs, tagQuery]);

  const exactMatch = useMemo(() => {
    const q = norm(tagQuery);
    if (!q) return null;
    return tagDefs.find((t) => norm(t.label) === q) ?? null;
  }, [tagDefs, tagQuery]);

  const canCreate = useMemo(() => {
    const q = tagQuery.trim();
    if (!q) return false;
    if (exactMatch) return false;
    return true;
  }, [tagQuery, exactMatch]);

  const isSelected = (id: string) => selectedIds.includes(id);

  useEffect(() => {
    if (!addOpen) return;
    const t = setTimeout(() => addInputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [addOpen]);

  const triggerClass = compact
    ? [
        "min-h-[26px] w-full",
        "flex items-center gap-2",
        "bg-transparent",
        "border border-transparent",
        "rounded-md",
        "cursor-pointer",
      ].join(" ")
    : [
        "h-8 w-full rounded-lg px-2",
        "bg-[#FFFFFF] hover:bg-[#F6F7FB]",
        "border border-[#EBEBEB] hover:border-[#4157FE]",
        "flex items-center gap-2 overflow-hidden text-left",
        "transition cursor-pointer",
      ].join(" ");

  return (
    <div className={compact ? "p-0" : "px-5 py-3"}>
      <div
        className={
          compact ? "flex items-center gap-2" : "flex items-center gap-3"
        }
      >
        {showIcon && <Tag size={16} className="text-[#697588]" />}

        <Popover
          open={addOpen}
          onOpenChange={(v) => {
            if (editId) return;
            setAddOpen(v);
            if (!v) setTagQuery("");
          }}
          modal={false}
        >
          <PopoverTrigger asChild>
            <div
              role="button"
              tabIndex={0}
              className={triggerClass}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                setEditId(null);
                setAddOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") setAddOpen(true);
              }}
            >
              {selectedTags.length === 0 ? (
                <span className="text-xs text-[#697588]">Add tags</span>
              ) : (
                <div className="flex items-center gap-2 overflow-hidden">
                  {selectedTags.map((t) => {
                    const isEditing = editId === t.id;

                    return (
                      <Popover
                        key={t.id}
                        open={isEditing}
                        onOpenChange={(v) => setEditId(v ? t.id : null)}
                        modal={false}
                      >
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="py-0.5 rounded-sm px-2 text-[11px] font-medium shrink-0"
                            style={{
                              backgroundColor: t.color || DEFAULT_NEUTRAL,
                              color: "#fff",
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAddOpen(false);
                              setEditId(t.id);
                            }}
                          >
                            {t.label}
                          </button>
                        </PopoverTrigger>

                        <PopoverContent
                          align="start"
                          side="top"
                          sideOffset={10}
                          collisionPadding={12}
                          className={[
                            "z-[600] p-0 w-[320px]",
                            "rounded-lg border border-[#EBEBEB]",
                            "bg-[#FFFFFF] text-[#191F38] shadow-xl overflow-hidden",
                          ].join(" ")}
                          onOpenAutoFocus={(e) => e.preventDefault()}
                          onPointerDownOutside={() => {}}
                          onEscapeKeyDown={(e) => {
                            e.preventDefault();
                            setEditId(null);
                          }}
                        >
                          <TagEditContent
                            tag={t}
                            onCommit={(next) =>
                              updateTag(t.id, {
                                label: next.label,
                                color: next.color,
                              })
                            }
                            onRemoveFromEntry={() => removeSelected(t.id)}
                            onDeleteTag={() => deleteTag(t.id)}
                            myColors={myColors}
                            addMyColor={addMyColor}
                            requestClose={() => setEditId(null)}
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                </div>
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="top"
            sideOffset={12}
            collisionPadding={12}
            className={[
              "z-[550] p-0",
              "w-[280px] max-w-[calc(100vw-24px)]",
              "rounded-lg border border-[#EBEBEB]",
              "bg-[#FFFFFF] text-[#191F38] shadow-xl overflow-hidden",
            ].join(" ")}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              addInputRef.current?.focus();
            }}
          >
            <div className="p-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#EBEBEB] bg-[#FFFFFF] px-3 h-10">
                <Search size={16} className="text-[#697588]" />
                <input
                  ref={addInputRef}
                  value={tagQuery}
                  onChange={(e) => setTagQuery(e.target.value)}
                  placeholder="Search or add tags..."
                  className="flex-1 bg-transparent outline-none text-xs text-[#191F38] placeholder:text-[#697588]"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setAddOpen(false);
                      setTagQuery("");
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const q = tagQuery.trim();
                      if (!q) return;

                      if (exactMatch) {
                        selectTag(exactMatch.id);
                        setTagQuery("");
                        return;
                      }

                      if (canCreate) {
                        createAndSelect(q);
                        setTagQuery("");
                      }
                    }
                  }}
                />
              </div>

              <div className="mt-3 text-[11px] text-[#697588] px-1 pb-2">
                {tagQuery.trim() ? "Results" : "Suggestions"}
              </div>

              <div className="space-y-1">
                {canCreate && (
                  <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2 hover:bg-[#F6F7FB] transition text-left"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      createAndSelect(tagQuery.trim());
                      setTagQuery("");
                      addInputRef.current?.focus();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#697588]">Create</span>
                      <span
                        className="py-1 px-2 rounded-md text-[11px] font-medium flex justify-center items-center"
                        style={{ backgroundColor: "#4C2FB8", color: "#fff" }}
                      >
                        {tagQuery.trim()}
                      </span>
                    </div>
                    <CornerDownLeft size={16} className="text-[#697588]" />
                  </button>
                )}

                {filtered.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="w-full flex items-center justify-between rounded-md px-3 py-2 hover:bg-[#F6F7FB] transition text-left"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (!isSelected(t.id)) selectTag(t.id);
                      setTagQuery("");
                      addInputRef.current?.focus();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full border border-[#EBEBEB]"
                        style={{ backgroundColor: t.color || DEFAULT_NEUTRAL }}
                      />
                      <span className="text-xs text-[#191F38]">{t.label}</span>
                    </div>

                    <span className="text-[11px] text-[#697588]">
                      {isSelected(t.id) ? "Added" : "Add"}
                    </span>
                  </button>
                ))}

                {tagDefs.length === 0 && !tagQuery.trim() && (
                  <div className="px-3 py-6 text-center text-xs text-[#697588]">
                    No tags created
                  </div>
                )}

                {tagDefs.length > 0 && filtered.length === 0 && !canCreate && (
                  <div className="px-3 py-6 text-center text-xs text-[#697588]">
                    Nothing found
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
