"use client";

import React, { useState } from "react";
import { AddEntryTagSection } from "../floating/AddEntryTagSection";
import type { TimeEntryRow } from "../types";
import type { TagDef } from "../utils/tags";
import { norm, pickColor, uid } from "../utils/tags";

export function EntryTagCell(props: {
  dateKey: string;
  entry: TimeEntryRow;
  tagDefs: TagDef[];
  setTagDefs: React.Dispatch<React.SetStateAction<TagDef[]>>;
  patchTimeEntry: (
    date: string,
    entryId: string | number,
    updater: (e: TimeEntryRow) => TimeEntryRow,
  ) => void;
  myColors: string[];
  addMyColor: (hex: string) => void;
}) {
  const {
    dateKey,
    entry,
    tagDefs,
    setTagDefs,
    patchTimeEntry,
    myColors,
    addMyColor,
  } = props;

  const [addOpen, setAddOpen] = useState(false);
  const [tagQuery, setTagQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const selectedIds = entry.tagIds ?? [];

  const labelsFromIds = (defs: TagDef[], ids: string[]) =>
    ids
      .map((id) => defs.find((t) => t.id === id)?.label)
      .filter(Boolean) as string[];

  const syncEntryTagStrings = (defs: TagDef[], ids: string[]) => {
    const labels = labelsFromIds(defs, ids);
    patchTimeEntry(dateKey, entry.id, (e) => ({
      ...e,
      tagIds: ids,
      tag: labels.join(", "),
    }));
  };

  const selectTag = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    syncEntryTagStrings(tagDefs, next);
  };

  const removeSelected = (id: string) => {
    const next = selectedIds.filter((x) => x !== id);
    syncEntryTagStrings(tagDefs, next);
  };

  const createAndSelect = (label: string, color?: string) => {
    const name = String(label ?? "").trim();
    if (!name) return;

    const existing = tagDefs.find((t) => norm(t.label) === norm(name));
    if (existing) {
      const next = selectedIds.includes(existing.id)
        ? selectedIds
        : [...selectedIds, existing.id];
      syncEntryTagStrings(tagDefs, next);
      setAddOpen(false);
      setTagQuery("");
      return;
    }

    const newId = uid("tag");
    const newDef: TagDef = {
      id: newId,
      label: name,
      color: color ?? pickColor(tagDefs.length),
    };

    const nextDefs = [...tagDefs, newDef];
    setTagDefs(nextDefs);

    const nextIds = [...selectedIds, newId];
    syncEntryTagStrings(nextDefs, nextIds);

    setAddOpen(false);
    setTagQuery("");
  };

  const updateTag = (id: string, patch: Partial<TagDef>) => {
    const nextDefs = tagDefs.map((t) => (t.id === id ? { ...t, ...patch } : t));
    setTagDefs(nextDefs);
    syncEntryTagStrings(nextDefs, selectedIds);
  };

  const deleteTag = (id: string) => {
    const nextDefs = tagDefs.filter((t) => t.id !== id);
    setTagDefs(nextDefs);

    const nextIds = selectedIds.filter((x) => x !== id);
    syncEntryTagStrings(nextDefs, nextIds);
  };

  return (
    <AddEntryTagSection
      tagDefs={tagDefs}
      selectedIds={selectedIds}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
      tagQuery={tagQuery}
      setTagQuery={setTagQuery}
      editId={editId}
      setEditId={setEditId}
      myColors={myColors}
      addMyColor={addMyColor}
      selectTag={selectTag}
      removeSelected={removeSelected}
      createAndSelect={(label) => createAndSelect(label)}
      updateTag={updateTag}
      deleteTag={deleteTag}
      compact
      showIcon={false}
    />
  );
}
