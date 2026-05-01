"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ArtStatus = "available" | "sold" | "on_loan" | "not_for_sale";

interface Artist {
  id: number;
  full_name: string;
  photo_url?: string;
  nationality?: string;
}

interface Art {
  id: number;
  artist_id: number;
  artist_name: string;
  artist_photo?: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  image_url: string;
  description: string;
  enquire: string;
  exhibited: string;
  publication: string;
  provenance: string;
  price: number | null;
  status: ArtStatus;
}

// FormData here is our app type — distinct from the browser's built-in FormData
type ArtFormData = Omit<Art, "id" | "artist_name" | "artist_photo">;
type ViewMode = "list" | "detail" | "form";

const EMPTY_FORM: ArtFormData = {
  artist_id: 0,
  title: "",
  year: "",
  medium: "",
  dimensions: "",
  image_url: "",
  description: "",
  enquire: "",
  exhibited: "",
  publication: "",
  provenance: "",
  price: null,
  status: "available",
};

const STATUS_META: Record<ArtStatus, { label: string; bg: string; color: string; dot: string }> = {
  available:    { label: "Available",     bg: "#EAF3DE", color: "#3B6D11", dot: "#6DBF3A" },
  sold:         { label: "Sold",          bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
  on_loan:      { label: "On Loan",       bg: "#E6F1FB", color: "#185FA5", dot: "#4A90D9" },
  not_for_sale: { label: "Not for Sale",  bg: "#F1EFE8", color: "#5F5E5A", dot: "#9E9C95" },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
// ─── API ───────────────────────────────────────────────────────────────────────
//
// create / update send a multipart/form-data request so multer can handle
// the optional image file upload (field name: "image").  All other fields are
// appended as plain strings.  If no new file is chosen the existing image_url
// string is preserved server-side (backend should keep the old value when the
// "image" file field is absent).

function buildMultipart(data: ArtFormData, imageFile: File | null): globalThis.FormData {
  const fd = new globalThis.FormData();

  // Scalar fields
  fd.append("artist_id",   String(data.artist_id));
  fd.append("title",       data.title);
  fd.append("year",        data.year);
  fd.append("medium",      data.medium);
  fd.append("dimensions",  data.dimensions);
  fd.append("description", data.description);
  fd.append("enquire",     data.enquire);
  fd.append("exhibited",   data.exhibited);
  fd.append("publication", data.publication);
  fd.append("provenance",  data.provenance);
  fd.append("status",      data.status);
  fd.append("price",       data.price !== null ? String(data.price) : "");

  // Real file — multer expects field name "image"
  if (imageFile) {
    fd.append("image", imageFile);
  } else if (data.image_url) {
    // No new file but an existing URL: let the server know to keep it
    fd.append("image_url", data.image_url);
  }

  return fd;
}

const api = {
  arts: {
    list: (): Promise<Art[]> =>
      fetch(`${API_BASE}/arts`).then(r => r.json()),
    byId: (id: number): Promise<Art> =>
      fetch(`${API_BASE}/arts/${id}`).then(r => r.json()),

    // POST multipart/form-data — DO NOT set Content-Type header; the browser
    // sets it automatically with the correct boundary for FormData.
    create: (data: ArtFormData, imageFile: File | null): Promise<Art> =>
      fetch(`${API_BASE}/arts`, {
        method: "POST",
        body: buildMultipart(data, imageFile),
      }).then(r => { if (!r.ok) throw new Error(); return r.json(); }),

    // PUT multipart/form-data
    update: (id: number, data: ArtFormData, imageFile: File | null): Promise<Art> =>
      fetch(`${API_BASE}/arts/${id}`, {
        method: "PUT",
        body: buildMultipart(data, imageFile),
      }).then(r => { if (!r.ok) throw new Error(); return r.json(); }),

    delete: (id: number): Promise<void> =>
      fetch(`${API_BASE}/arts/${id}`, { method: "DELETE" })
        .then(r => { if (!r.ok) throw new Error(); }),
  },
  artists: {
    list: (): Promise<Artist[]> =>
      fetch(`${API_BASE}/artists`).then(r => r.json()),
  },
};

// ─── Image Uploader ────────────────────────────────────────────────────────────
//
// Keeps a real File object in state and exposes a local object-URL preview.
// The File is what gets appended to FormData and sent to multer.

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB — match multer limit

interface ImageUploaderProps {
  /** Existing URL (from server) shown when no new file is staged yet */
  existingUrl?: string;
  /** Called with the chosen File (or null when cleared) */
  onFileChange: (file: File | null) => void;
  /** Currently staged File (controlled) */
  stagedFile: File | null;
}

function ImageUploader({ existingUrl, onFileChange, stagedFile }: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Revoke previous object-URL on unmount / file change to avoid memory leaks
  const previewUrl = useRef<string | null>(null);
  useEffect(() => {
    if (stagedFile) {
      previewUrl.current = URL.createObjectURL(stagedFile);
    }
    return () => {
      if (previewUrl.current) {
        URL.revokeObjectURL(previewUrl.current);
        previewUrl.current = null;
      }
    };
  }, [stagedFile]);

  const handleFile = useCallback((file: File) => {
    setSizeError(false);
    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_FILE_BYTES) { setSizeError(true); return; }
    onFileChange(file);
  }, [onFileChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    onFileChange(null);
    setSizeError(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  // What to preview: a freshly picked file takes precedence over the existing URL
  const displayUrl = stagedFile ? URL.createObjectURL(stagedFile) : existingUrl;
  const hasPreview = !!displayUrl;

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 12, color: "#5F5E5A", fontWeight: 500, display: "block", marginBottom: 8 }}>
        Artwork Image
      </label>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        style={{ display: "none" }}
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {sizeError && (
        <div style={{ marginBottom: 8, fontSize: 12, color: "#A32D2D", background: "#FCEBEB", padding: "6px 10px", borderRadius: 6 }}>
          File exceeds the 10 MB limit. Please choose a smaller image.
        </div>
      )}

      {!hasPreview ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `1.5px dashed ${dragging ? "#185FA5" : "rgba(0,0,0,0.18)"}`,
            borderRadius: 10, padding: "36px 20px", textAlign: "center",
            cursor: "pointer", background: dragging ? "#EFF6FF" : "#FAFAF8",
            transition: "border-color 0.15s, background 0.15s",
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: dragging ? "#DBEAFE" : "#F0EDE6",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px", transition: "background 0.15s",
          }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={dragging ? "#185FA5" : "#888780"} strokeWidth={1.5}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: dragging ? "#185FA5" : "#1a1a1a", marginBottom: 4 }}>
            {dragging ? "Drop image here" : "Click to browse or drag & drop"}
          </div>
          <div style={{ fontSize: 11, color: "#888780" }}>
            JPG, PNG, WEBP, GIF, SVG — up to 10 MB
          </div>
        </div>
      ) : (
        <div style={{ border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 10, overflow: "hidden", background: "#F8F7F4" }}>
          <div style={{ background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center", height: 180, overflow: "hidden" }}>
            <img src={displayUrl} alt="Preview" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", display: "block" }} />
          </div>
          <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#888780" strokeWidth={1.5} style={{ flexShrink: 0 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span style={{ fontSize: 12, color: "#5F5E5A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {stagedFile ? stagedFile.name : "Existing image"}
              </span>
              {stagedFile && (
                <span style={{ fontSize: 10, color: "#888780", flexShrink: 0 }}>
                  ({(stagedFile.size / 1024).toFixed(0)} KB)
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 12 }}>
              <button type="button" onClick={() => fileRef.current?.click()} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 500, borderRadius: 6, border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent", color: "#5F5E5A", cursor: "pointer", fontFamily: "inherit" }}>
                Replace
              </button>
              <button type="button" onClick={handleClear} style={{ padding: "5px 12px", fontSize: 11, fontWeight: 500, borderRadius: 6, border: "none", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer", fontFamily: "inherit" }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Primitives ────────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ArtStatus }) {
  const s = STATUS_META[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {s.label}
    </span>
  );
}

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, padding: "12px 18px", borderRadius: 10, background: type === "success" ? "#EAF3DE" : "#FCEBEB", color: type === "success" ? "#27500A" : "#791F1F", border: `0.5px solid ${type === "success" ? "#97C459" : "#F09595"}`, fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      {type === "success"
        ? <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="2,8 6,12 14,4" /></svg>
        : <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}><path d="M2 2l12 12M14 2L2 14" /></svg>}
      {msg}
    </div>
  );
}

function ConfirmDelete({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", maxWidth: 380, width: "90%", border: "0.5px solid rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>Delete artwork</div>
        <div style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.6, marginBottom: 24 }}>Delete <strong>"{title}"</strong>? This cannot be undone.</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 18px", fontSize: 13, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent", color: "#5F5E5A", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600, borderRadius: 8, border: "none", background: "#E24B4A", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function BackBtn({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#5F5E5A", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 20, fontFamily: "inherit" }}>
      <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 3L4 8l6 5" /></svg>
      {label}
    </button>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder = "", textarea = false, required = false, options }: {
  label: string; name: keyof ArtFormData; value: string | number | null;
  onChange: (name: keyof ArtFormData, val: string | number | null) => void;
  type?: string; placeholder?: string; textarea?: boolean; required?: boolean;
  options?: { value: string; label: string }[];
}) {
  const base: React.CSSProperties = { width: "100%", padding: "8px 10px", fontSize: 13, border: "0.5px solid rgba(0,0,0,0.18)", borderRadius: 8, background: "#fff", color: "#1a1a1a", fontFamily: "inherit", outline: "none", resize: "vertical" };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: "#5F5E5A", marginBottom: 5, display: "block", fontWeight: 500 }}>
        {label}{required && <span style={{ color: "#E24B4A" }}> *</span>}
      </label>
      {options ? (
        <select value={value ?? ""} onChange={e => onChange(name, e.target.value)} style={base}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea rows={3} placeholder={placeholder} value={value ?? ""} onChange={e => onChange(name, e.target.value)} style={base} />
      ) : (
        <input type={type} placeholder={placeholder} value={value ?? ""} onChange={e => {
          const v = e.target.value;
          if (type === "number") onChange(name, v === "" ? null : Number(v));
          else onChange(name, v);
        }} style={base} />
      )}
    </div>
  );
}

// ─── Detail View ───────────────────────────────────────────────────────────────

function ArtDetail({ art, onEdit, onBack, onDelete }: { art: Art; onEdit: () => void; onBack: () => void; onDelete: () => void }) {
  const [imgError, setImgError] = useState(false);
  const Section = ({ title, content }: { title: string; content: string }) =>
    content ? (
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#888780", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.75 }}>{content}</div>
      </div>
    ) : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <BackBtn onClick={onBack} label="Back to artworks" />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onEdit} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent", color: "#1a1a1a", cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
          <button onClick={onDelete} style={{ padding: "8px 18px", fontSize: 13, fontWeight: 500, borderRadius: 8, border: "none", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 0, background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 14, overflow: "hidden", minHeight: 480 }}>
        <div style={{ background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480, overflow: "hidden" }}>
          {art.image_url && !imgError ? (
            <img src={art.image_url} alt={art.title} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", maxHeight: 600 }} />
          ) : (
            <div style={{ textAlign: "center", color: "#B4B2A9" }}>
              <svg width={48} height={48} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1}><rect x="4" y="8" width="40" height="32" rx="2" /><circle cx="16" cy="20" r="4" /><path d="M4 34l12-9 8 8 6-6 14 12" /></svg>
              <div style={{ fontSize: 12, marginTop: 8 }}>No image</div>
            </div>
          )}
        </div>
        <div style={{ borderLeft: "0.5px solid rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 24px 20px", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
            <div style={{ textAlign: "right", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{art.artist_name}</div>
              <div style={{ fontSize: 13, fontStyle: "italic", color: "#1a1a1a", marginTop: 2 }}>{art.title}</div>
              {art.year && <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 2 }}>{art.year}</div>}
              {art.medium && <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 2 }}>{art.medium}</div>}
              {art.dimensions && <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 2 }}>{art.dimensions}</div>}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}><StatusPill status={art.status} /></div>
            {art.price && <div style={{ textAlign: "right", marginTop: 8, fontSize: 14, fontWeight: 600, color: "#185FA5" }}>${Number(art.price).toLocaleString()}</div>}
          </div>
          <div style={{ padding: "20px 24px", flex: 1, overflowY: "auto" }}>
            {art.description && <div style={{ marginBottom: 20, fontSize: 13, color: "#3a3a3a", lineHeight: 1.7, paddingBottom: 20, borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>{art.description}</div>}
            <Section title="Enquire" content={art.enquire} />
            <Section title="Exhibited" content={art.exhibited} />
            <Section title="Publication" content={art.publication} />
            <Section title="Provenance" content={art.provenance} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Art Form ──────────────────────────────────────────────────────────────────

function ArtForm({ initial, artists, onSubmit, onCancel, loading, defaultArtistId }: {
  initial: ArtFormData;
  artists: Artist[];
  onSubmit: (data: ArtFormData, imageFile: File | null) => void;
  onCancel: () => void;
  loading: boolean;
  defaultArtistId?: number;
}) {
  const [form, setForm] = useState<ArtFormData>({
    ...initial,
    artist_id: defaultArtistId ?? initial.artist_id,
  });

  // The real File object — null means "no new file chosen"
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isEdit = initial.artist_id !== 0 && initial.title !== "";
  const set = (name: keyof ArtFormData, val: string | number | null) =>
    setForm(prev => ({ ...prev, [name]: val }));

  const selectedArtist = artists.find(a => a.id === Number(form.artist_id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, imageFile);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <BackBtn onClick={onCancel} label="Cancel" />
      <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "0.5px solid rgba(0,0,0,0.08)", background: "#F8F7F4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{isEdit ? "Edit artwork" : "Add new artwork"}</div>
          <div style={{ fontSize: 12, color: "#888780" }}>* required</div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          {/* Artist selector */}
          <div style={{ marginBottom: 20, padding: 16, background: "#F8F7F4", borderRadius: 10, border: "0.5px solid rgba(0,0,0,0.08)" }}>
            <label style={{ fontSize: 12, color: "#5F5E5A", fontWeight: 500, display: "block", marginBottom: 8 }}>
              Artist <span style={{ color: "#E24B4A" }}>*</span>
            </label>
            <select value={form.artist_id} onChange={e => set("artist_id", Number(e.target.value))} required style={{ width: "100%", padding: "9px 12px", fontSize: 13, border: "0.5px solid rgba(0,0,0,0.18)", borderRadius: 8, background: "#fff", color: "#1a1a1a", fontFamily: "inherit", outline: "none" }}>
              <option value={0}>Select an artist…</option>
              {artists.map(a => <option key={a.id} value={a.id}>{a.full_name}{a.nationality ? ` (${a.nationality})` : ""}</option>)}
            </select>
            {selectedArtist && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, overflow: "hidden", background: "#D3D1C7", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selectedArtist.photo_url
                    ? <img src={selectedArtist.photo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#888780" strokeWidth={1.5}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{selectedArtist.full_name}</div>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Title" name="title" value={form.title} onChange={set} required placeholder="e.g. Irises" />
            </div>
            <Field label="Year" name="year" value={form.year} onChange={set} placeholder="e.g. 1889" />
            <Field label="Status" name="status" value={form.status} onChange={set}
              options={Object.entries(STATUS_META).map(([v, m]) => ({ value: v, label: m.label }))} />
            <Field label="Medium" name="medium" value={form.medium} onChange={set} placeholder="e.g. Oil on Canvas" />
            <Field label="Dimensions" name="dimensions" value={form.dimensions} onChange={set} placeholder="e.g. 94.9 × 144.9 × 11.4 cm" />

            {/* Real-file uploader — passes File object up, not base64 */}
            <div style={{ gridColumn: "1 / -1" }}>
              <ImageUploader
                existingUrl={form.image_url}
                stagedFile={imageFile}
                onFileChange={file => {
                  setImageFile(file);
                  // If cleared, also wipe the stored URL so the preview disappears
                  if (!file) set("image_url", "");
                }}
              />
            </div>

            <Field label="Price (USD)" name="price" value={form.price} onChange={set} type="number" placeholder="e.g. 85000" />
            <div />
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Description" name="description" value={form.description} onChange={set} textarea placeholder="Brief description of the artwork…" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Enquire" name="enquire" value={form.enquire} onChange={set} textarea placeholder="Contact or enquiry information…" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Exhibited" name="exhibited" value={form.exhibited} onChange={set} textarea placeholder="e.g. On loan to the Denver Art Museum (September 1992–2010)" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Publication" name="publication" value={form.publication} onChange={set} textarea placeholder="References to publications, catalogues…" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Provenance" name="provenance" value={form.provenance} onChange={set} textarea placeholder="Ownership history…" />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 16, borderTop: "0.5px solid rgba(0,0,0,0.08)", marginTop: 8 }}>
            <button type="button" onClick={onCancel} style={{ padding: "9px 20px", fontSize: 13, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent", color: "#5F5E5A", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button type="submit" disabled={loading || !form.title.trim() || !form.artist_id}
              style={{ padding: "9px 24px", fontSize: 13, fontWeight: 500, borderRadius: 8, border: "none", background: loading ? "#B5D4F4" : "#185FA5", color: "#fff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              {loading ? "Saving…" : isEdit ? "Save changes" : "Add artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Art Card ──────────────────────────────────────────────────────────────────

function ArtCard({ art, onView, onEdit, onDelete }: { art: Art; onView: () => void; onEdit: (e: React.MouseEvent) => void; onDelete: (e: React.MouseEvent) => void }) {
  const [imgErr, setImgErr] = useState(false);
  const [hover, setHover] = useState(false);
  const s = STATUS_META[art.status];
  return (
    <div onClick={onView} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: "#fff", border: `0.5px solid ${hover ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.1)"}`, borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s, transform 0.15s, box-shadow 0.15s", transform: hover ? "translateY(-2px)" : "none", boxShadow: hover ? "0 6px 24px rgba(0,0,0,0.07)" : "none" }}>
      <div style={{ height: 200, background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {art.image_url && !imgErr
          ? <img src={art.image_url} alt={art.title} onError={() => setImgErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hover ? "scale(1.03)" : "scale(1)" }} />
          : <svg width={40} height={40} viewBox="0 0 48 48" fill="none" stroke="#B4B2A9" strokeWidth={1}><rect x="4" y="8" width="40" height="32" rx="2" /><circle cx="16" cy="20" r="4" /><path d="M4 34l12-9 8 8 6-6 14 12" /></svg>}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 600, background: s.bg, color: s.color, padding: "3px 9px", borderRadius: 20 }}>{s.label}</span>
        </div>
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{art.title}</div>
        <div style={{ fontSize: 12, color: "#185FA5", marginBottom: 4, fontWeight: 500 }}>{art.artist_name}</div>
        <div style={{ fontSize: 11, color: "#888780" }}>{[art.year, art.medium].filter(Boolean).join(" · ")}</div>
        {art.price && <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", marginTop: 6 }}>${Number(art.price).toLocaleString()}</div>}
        <div style={{ display: "flex", gap: 6, marginTop: 10 }} onClick={e => e.stopPropagation()}>
          <button onClick={onEdit} style={{ flex: 1, padding: "6px 0", fontSize: 12, borderRadius: 6, border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent", color: "#5F5E5A", cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
          <button onClick={onDelete} style={{ padding: "6px 10px", fontSize: 12, borderRadius: 6, border: "none", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer", fontFamily: "inherit" }}>
            <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="2,4 14,4" /><path d="M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ArtPage() {
  const [arts, setArts] = useState<Art[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<Art | null>(null);
  const [editForm, setEditForm] = useState<ArtFormData>(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [filterArtist, setFilterArtist] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<ArtStatus | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<Art | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => setToast({ msg, type });

  const load = async () => {
    setLoading(true);
    try {
      const [artsData, artistsData] = await Promise.all([api.arts.list(), api.artists.list()]);
      setArts(artsData);
      setArtists(artistsData);
    } catch {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleView = async (id: number) => {
    try {
      const art = await api.arts.byId(id);
      setSelected(art);
      setView("detail");
    } catch {
      showToast("Could not load artwork", "error");
    }
  };

  const handleNew = () => {
    setEditForm({ ...EMPTY_FORM, artist_id: filterArtist !== "all" ? filterArtist : 0 });
    setSelected(null);
    setView("form");
  };

  const handleEdit = (art: Art) => {
    const { id, artist_name, artist_photo, ...rest } = art;
    setEditForm(rest);
    setSelected(art);
    setView("form");
  };

  // Now receives both the field data AND the optional File
  const handleSubmit = async (data: ArtFormData, imageFile: File | null) => {
    setSaving(true);
    try {
      if (selected) {
        const updated = await api.arts.update(selected.id, data, imageFile);
        setArts(prev => prev.map(a => a.id === updated.id ? updated : a));
        showToast(`"${updated.title}" updated`);
        setSelected(updated);
        setView("detail");
      } else {
        const created = await api.arts.create(data, imageFile);
        setArts(prev => [created, ...prev]);
        showToast(`"${created.title}" added`);
        setView("list");
      }
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.arts.delete(deleteTarget.id);
      setArts(prev => prev.filter(a => a.id !== deleteTarget.id));
      showToast(`"${deleteTarget.title}" deleted`);
      if (view === "detail") setView("list");
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = arts.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.artist_name.toLowerCase().includes(search.toLowerCase());
    const matchArtist = filterArtist === "all" || a.artist_id === filterArtist;
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchArtist && matchStatus;
  });

  const statuses = Object.keys(STATUS_META) as ArtStatus[];
  const selectStyle: React.CSSProperties = { padding: "8px 10px", fontSize: 12, border: "0.5px solid rgba(0,0,0,0.15)", borderRadius: 8, background: "#fff", color: "#1a1a1a", fontFamily: "inherit", outline: "none", cursor: "pointer" };

  return (
    <div style={{ fontFamily: "'DM Sans','Geist',system-ui,sans-serif", minHeight: "100vh", background: "#F8F7F4", padding: 24 }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {deleteTarget && <ConfirmDelete title={deleteTarget.title} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />}

      {view === "list" && (
        <>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Artworks</h1>
              <div style={{ fontSize: 13, color: "#888780", marginTop: 3 }}>{arts.length} artwork{arts.length !== 1 ? "s" : ""} across {artists.length} artist{artists.length !== 1 ? "s" : ""}</div>
            </div>
            <button onClick={handleNew} style={{ padding: "9px 20px", fontSize: 13, fontWeight: 500, borderRadius: 8, border: "none", background: "#185FA5", color: "#fff", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M8 2v12M2 8h12" /></svg>
              Add artwork
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 10, marginBottom: 20 }}>
            {statuses.map(s => {
              const count = arts.filter(a => a.status === s).length;
              const m = STATUS_META[s];
              return (
                <div key={s} style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, color: "#888780", marginBottom: 4, fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{count}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 200px" }}>
              <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="#888780" strokeWidth={1.8} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search artworks or artists…" style={{ width: "100%", padding: "8px 10px 8px 30px", fontSize: 13, border: "0.5px solid rgba(0,0,0,0.15)", borderRadius: 8, background: "#fff", color: "#1a1a1a", fontFamily: "inherit", outline: "none" }} />
            </div>
            <select value={filterArtist} onChange={e => setFilterArtist(e.target.value === "all" ? "all" : Number(e.target.value))} style={selectStyle}>
              <option value="all">All artists</option>
              {artists.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ArtStatus | "all")} style={selectStyle}>
              <option value="all">All statuses</option>
              {statuses.map(s => <option key={s} value={s}>{STATUS_META[s].label}</option>)}
            </select>
          </div>

          {loading ? (
            <div style={{ padding: 48, textAlign: "center", color: "#888780", fontSize: 14 }}>Loading artworks…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 64, textAlign: "center", background: "#fff", borderRadius: 14, border: "0.5px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🖼️</div>
              <div style={{ fontSize: 14, color: "#888780" }}>{search || filterArtist !== "all" || filterStatus !== "all" ? "No artworks match your filters" : "No artworks yet — add your first one"}</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {filtered.map(art => (
                <ArtCard key={art.id} art={art}
                  onView={() => handleView(art.id)}
                  onEdit={e => { e.stopPropagation(); handleEdit(art); }}
                  onDelete={e => { e.stopPropagation(); setDeleteTarget(art); }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {view === "detail" && selected && (
        <ArtDetail art={selected} onEdit={() => handleEdit(selected)} onBack={() => setView("list")} onDelete={() => setDeleteTarget(selected)} />
      )}

      {view === "form" && (
        <ArtForm
          initial={editForm}
          artists={artists}
          onSubmit={handleSubmit}
          onCancel={() => setView(selected ? "detail" : "list")}
          loading={saving}
          defaultArtistId={filterArtist !== "all" ? filterArtist : undefined}
        />
      )}
    </div>
  );
}
