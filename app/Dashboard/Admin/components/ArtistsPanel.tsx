"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Artist {
  id: number;
  full_name: string;
  photo_url: string;
  bio: string;
  cv: string;
  exhibitions: string;
  nationality: string;
  birth_year: number | null;
  death_year: number | null;
  email: string;
  website: string;
}

type ArtistFormData = Omit<Artist, "id">;
type ViewMode = "list" | "profile" | "form";
type ToastType = "success" | "error";

const EMPTY_FORM: ArtistFormData = {
  full_name: "",
  photo_url: "",
  bio: "",
  cv: "",
  exhibitions: "",
  nationality: "",
  birth_year: null,
  death_year: null,
  email: "",
  website: "",
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://kalakaya.art/api";

// ─── Build multipart FormData ──────────────────────────────────────────────────
// KEY FIX: photo_url and cv are handled separately from file uploads.
// Null numbers are never stringified as "null".

function buildFormData(
  form: ArtistFormData,
  photoFile: File | null,
  cvFile: File | null
): globalThis.FormData {
  const fd = new globalThis.FormData();

  // Text-only scalar fields (never files, never nullable numbers)
  const textFields: (keyof ArtistFormData)[] = [
    "full_name", "bio", "exhibitions", "nationality", "email", "website",
  ];
  textFields.forEach((key) => {
    const val = form[key];
    fd.append(key, val !== null && val !== undefined ? String(val) : "");
  });

  // Nullable number fields — only send if actually set
  if (form.birth_year !== null && form.birth_year !== undefined) {
    fd.append("birth_year", String(form.birth_year));
  }
  if (form.death_year !== null && form.death_year !== undefined) {
    fd.append("death_year", String(form.death_year));
  }

  // Photo: real File takes priority; otherwise send existing URL so server keeps it
  if (photoFile) {
    fd.append("photo", photoFile);
  } else if (form.photo_url) {
    fd.append("photo_url", form.photo_url);
  }

  // CV PDF: real File takes priority; otherwise send existing URL so server keeps it
  if (cvFile) {
    fd.append("cv_file", cvFile);
  } else if (form.cv) {
    fd.append("cv", form.cv);
  }

  return fd;
}

// ─── API Layer ─────────────────────────────────────────────────────────────────

const api = {
  list: (): Promise<Artist[]> =>
    fetch(`${API_BASE}/artists`).then((r) => {
      if (!r.ok) throw new Error("Failed to fetch artists");
      return r.json();
    }),

  byId: (id: number): Promise<Artist> =>
    fetch(`${API_BASE}/artists/${id}`).then((r) => {
      if (!r.ok) throw new Error("Artist not found");
      return r.json();
    }),

  create: (fd: globalThis.FormData): Promise<Artist> =>
    fetch(`${API_BASE}/artists`, { method: "POST", body: fd }).then((r) => {
      if (!r.ok) throw new Error("Failed to create artist");
      return r.json();
    }),

  update: (id: number, fd: globalThis.FormData): Promise<Artist> =>
    fetch(`${API_BASE}/artists/${id}`, { method: "PUT", body: fd }).then((r) => {
      if (!r.ok) throw new Error("Failed to update artist");
      return r.json();
    }),

  delete: (id: number): Promise<void> =>
    fetch(`${API_BASE}/artists/${id}`, { method: "DELETE" }).then((r) => {
      if (!r.ok) throw new Error("Failed to delete artist");
    }),
};

// ─── Photo Upload ──────────────────────────────────────────────────────────────

interface PhotoUploadProps {
  existingUrl: string;
  stagedFile: File | null;
  onFileChange: (file: File | null) => void;
}

function PhotoUpload({ existingUrl, stagedFile, onFileChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const objectUrl = useRef<string | null>(null);

  // Clean up object URL on unmount/change
  useEffect(() => {
    return () => {
      if (objectUrl.current) {
        URL.revokeObjectURL(objectUrl.current);
        objectUrl.current = null;
      }
    };
  }, [stagedFile]);

  const handleFile = useCallback(
    (file: File) => {
      setSizeError(false);
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) {
        setSizeError(true);
        return;
      }
      onFileChange(file);
    },
    [onFileChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // Preview: staged file → object URL; otherwise existing URL
  let previewSrc: string | null = null;
  if (stagedFile) {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(stagedFile);
    previewSrc = objectUrl.current;
  } else if (existingUrl) {
    previewSrc = existingUrl;
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.fieldLabel}>Artist Photo</label>

      {sizeError && (
        <p style={{ fontSize: 12, color: "#c0392b", marginBottom: 8 }}>
          File exceeds 5 MB. Please choose a smaller image.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {previewSrc ? (
        <div style={styles.previewBox}>
          <img
            src={previewSrc}
            alt="Preview"
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }}
            onError={() => {
              if (!stagedFile) onFileChange(null);
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 13, color: "#2c2c2c", fontWeight: 500 }}>
              {stagedFile ? stagedFile.name : "Existing photo"}
            </div>
            {stagedFile && (
              <div style={{ fontSize: 11, color: "#888" }}>
                {(stagedFile.size / 1024).toFixed(0)} KB
              </div>
            )}
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                style={styles.smallBtn}
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => {
                  onFileChange(null);
                  setSizeError(false);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                style={{ ...styles.smallBtn, color: "#c0392b", borderColor: "#f5c6cb", background: "#fff5f5" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            ...styles.dropZone,
            borderColor: dragOver ? "#2563eb" : "rgba(0,0,0,0.15)",
            background: dragOver ? "#eff6ff" : "#fafaf9",
          }}
        >
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={dragOver ? "#2563eb" : "#888"} strokeWidth={1.5} style={{ marginBottom: 8 }}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          <div style={{ fontSize: 13, color: dragOver ? "#2563eb" : "#555" }}>
            <span style={{ fontWeight: 600 }}>Click to upload</span> or drag & drop
          </div>
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>JPG, PNG, WEBP — max 5 MB</div>
        </div>
      )}
    </div>
  );
}

// ─── CV PDF Upload ─────────────────────────────────────────────────────────────

interface CVUploadProps {
  existingUrl: string;
  stagedFile: File | null;
  onFileChange: (file: File | null) => void;
}

function CVUpload({ existingUrl, stagedFile, onFileChange }: CVUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      setSizeError(false);
      if (file.type !== "application/pdf") return;
      if (file.size > 10 * 1024 * 1024) {
        setSizeError(true);
        return;
      }
      onFileChange(file);
    },
    [onFileChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const displayName = stagedFile
    ? stagedFile.name
    : existingUrl
    ? decodeURIComponent(existingUrl.split("/").pop() ?? "Existing CV")
    : null;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.fieldLabel}>CV (PDF)</label>

      {sizeError && (
        <p style={{ fontSize: 12, color: "#c0392b", marginBottom: 8 }}>
          File exceeds 10 MB. Please choose a smaller PDF.
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {displayName ? (
        <div style={{ ...styles.previewBox, alignItems: "center" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 8, background: "#fff0f0",
            border: "1px solid #fecaca", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#e24b4a" strokeWidth={1.5}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#2c2c2c", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {displayName}
            </div>
            {stagedFile && (
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                {(stagedFile.size / 1024).toFixed(0)} KB
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button type="button" onClick={() => inputRef.current?.click()} style={styles.smallBtn}>
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                onFileChange(null);
                setSizeError(false);
                if (inputRef.current) inputRef.current.value = "";
              }}
              style={{ ...styles.smallBtn, color: "#c0392b", borderColor: "#f5c6cb", background: "#fff5f5" }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            ...styles.dropZone,
            borderColor: dragOver ? "#2563eb" : "rgba(0,0,0,0.15)",
            background: dragOver ? "#eff6ff" : "#fafaf9",
          }}
        >
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={dragOver ? "#2563eb" : "#888"} strokeWidth={1.5} style={{ marginBottom: 8 }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <div style={{ fontSize: 13, color: dragOver ? "#2563eb" : "#555" }}>
            <span style={{ fontWeight: 600 }}>Click to upload</span> or drag & drop
          </div>
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>PDF only — max 10 MB</div>
        </div>
      )}
    </div>
  );
}

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const styles = {
  fieldLabel: {
    fontSize: 12,
    color: "#5a5a5a",
    marginBottom: 6,
    display: "block" as const,
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    fontSize: 13,
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: 8,
    background: "#fff",
    color: "#1a1a1a",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  },
  dropZone: {
    border: "1.5px dashed",
    borderRadius: 10,
    padding: "24px 16px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  previewBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#fafaf9",
  },
  smallBtn: {
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 6,
    cursor: "pointer",
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    color: "#444",
    fontFamily: "inherit",
    fontWeight: 500,
  } as React.CSSProperties,
};

// ─── Field ─────────────────────────────────────────────────────────────────────

function Field({
  label, name, value, onChange, type = "text",
  placeholder = "", textarea = false, required = false,
}: {
  label: string;
  name: keyof ArtistFormData;
  value: string | number | null;
  onChange: (name: keyof ArtistFormData, value: string | number | null) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={styles.fieldLabel}>
        {label}
        {required && <span style={{ color: "#e24b4a", marginLeft: 2 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(name, e.target.value)}
          style={{ ...styles.input, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            if (type === "number") {
              onChange(name, v === "" ? null : Number(v));
            } else {
              onChange(name, v);
            }
          }}
          style={styles.input}
        />
      )}
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }: { msg: string; type: ToastType; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      padding: "13px 18px", borderRadius: 10,
      background: type === "success" ? "#f0fdf4" : "#fff5f5",
      color: type === "success" ? "#166534" : "#991b1b",
      border: `1px solid ${type === "success" ? "#bbf7d0" : "#fecaca"}`,
      fontSize: 13, fontWeight: 500,
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      fontFamily: "inherit",
    }}>
      {type === "success" ? (
        <svg width={15} height={15} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <polyline points="2,8 6,12 14,4" />
        </svg>
      ) : (
        <svg width={15} height={15} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2}>
          <path d="M2 2l12 12M14 2L2 14" />
        </svg>
      )}
      {msg}
    </div>
  );
}

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────────

function ConfirmDelete({ name, onConfirm, onCancel }: {
  name: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "#fff", borderRadius: 14, padding: "28px 32px",
        maxWidth: 380, width: "90%",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
          Delete artist
        </div>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 24 }}>
          Delete <strong style={{ color: "#1a1a1a" }}>{name}</strong>? This cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "9px 20px", fontSize: 13, borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.15)", background: "#fff",
              color: "#555", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "9px 20px", fontSize: 13, fontWeight: 600, borderRadius: 8,
              border: "none", background: "#e24b4a", color: "#fff",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Back Button ───────────────────────────────────────────────────────────────

function BackBtn({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 13, color: "#666", background: "none",
        border: "none", cursor: "pointer", padding: 0,
        marginBottom: 24, fontFamily: "inherit",
        transition: "color 0.15s",
      }}
    >
      <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M10 3L4 8l6 5" />
      </svg>
      {label}
    </button>
  );
}

// ─── Artist Profile ────────────────────────────────────────────────────────────

function ArtistProfile({ artist, onEdit, onBack, onDelete }: {
  artist: Artist; onEdit: () => void; onBack: () => void; onDelete: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  const years = artist.birth_year
    ? `${artist.birth_year}${artist.death_year ? ` – ${artist.death_year}` : " – present"}`
    : null;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <BackBtn onClick={onBack} label="Back to artists" />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onEdit}
            style={{
              padding: "8px 18px", fontSize: 13, fontWeight: 500, borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.15)", background: "#fff",
              color: "#1a1a1a", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: "8px 18px", fontSize: 13, fontWeight: 500, borderRadius: 8,
              border: "none", background: "#fff0f0", color: "#c0392b",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{
        background: "#fff", border: "1px solid rgba(0,0,0,0.09)",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        {/* Header band */}
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <div style={{
            width: 160, flexShrink: 0, background: "#e8e5de",
            minHeight: 200, display: "flex", alignItems: "center",
            justifyContent: "center", overflow: "hidden",
          }}>
            {artist.photo_url && !imgErr ? (
              <img
                src={artist.photo_url}
                alt={artist.full_name}
                onError={() => setImgErr(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={1}>
                <circle cx="12" cy="8" r="5" />
                <path d="M3 21c0-5 4-9 9-9s9 4 9 9" />
              </svg>
            )}
          </div>

          <div style={{ flex: 1, padding: "24px 28px" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.5px", marginBottom: 4 }}>
              {artist.full_name}
            </div>
            {years && (
              <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>{years}</div>
            )}
            {artist.nationality && (
              <span style={{
                display: "inline-block", padding: "3px 10px", borderRadius: 20,
                fontSize: 11, fontWeight: 600, background: "#f1efe8", color: "#5a5a5a",
                marginBottom: 16,
              }}>
                {artist.nationality}
              </span>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
              {artist.email && (
                <a href={`mailto:${artist.email}`} style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>
                  {artist.email}
                </a>
              )}
              {artist.website && (
                <a href={artist.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>
                  {artist.website}
                </a>
              )}
              {artist.cv && (
                <a
                  href={artist.cv} target="_blank" rel="noreferrer"
                  style={{ fontSize: 13, color: "#2563eb", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                  Download CV
                </a>
              )}
              {artist.exhibitions && (
                <a href={artist.exhibitions} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>
                  Exhibitions →
                </a>
              )}
            </div>
          </div>
        </div>

        {artist.bio && (
          <div style={{
            padding: "22px 28px",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            fontSize: 14, color: "#3a3a3a", lineHeight: 1.85,
          }}>
            {artist.bio}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Artist Form ───────────────────────────────────────────────────────────────

function ArtistForm({ initial, isEdit, onSubmit, onCancel, loading }: {
  initial: ArtistFormData;
  isEdit: boolean;
  onSubmit: (fd: globalThis.FormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<ArtistFormData>(initial);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Re-sync form state when switching between create/edit targets
  useEffect(() => {
    setForm(initial);
    setPhotoFile(null);
    setCvFile(null);
  }, [initial]);

  const set = (name: keyof ArtistFormData, value: string | number | null) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = buildFormData(form, photoFile, cvFile);
    onSubmit(fd);
  };

  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <BackBtn onClick={onCancel} label="Cancel" />

      <div style={{
        background: "#fff", border: "1px solid rgba(0,0,0,0.09)",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.07)",
          background: "#f8f7f4",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            {isEdit ? "Edit artist" : "Add new artist"}
          </div>
          <div style={{ fontSize: 12, color: "#aaa" }}>* required</div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>

            {/* Full Name — full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Full Name" name="full_name" value={form.full_name} onChange={set} required placeholder="e.g. Vincent van Gogh" />
            </div>

            {/* Photo Upload — full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <PhotoUpload
                existingUrl={form.photo_url}
                stagedFile={photoFile}
                onFileChange={(file) => {
                  setPhotoFile(file);
                  // If cleared, wipe the stored URL too so server knows to remove it
                  if (!file) set("photo_url", "");
                }}
              />
            </div>

            {/* CV Upload — full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <CVUpload
                existingUrl={form.cv}
                stagedFile={cvFile}
                onFileChange={(file) => {
                  setCvFile(file);
                  if (!file) set("cv", "");
                }}
              />
            </div>

            <Field label="Nationality" name="nationality" value={form.nationality} onChange={set} placeholder="e.g. Dutch" />
            <Field label="Email" name="email" value={form.email} onChange={set} type="email" placeholder="artist@example.com" />
            <Field label="Birth Year" name="birth_year" value={form.birth_year} onChange={set} type="number" placeholder="e.g. 1853" />
            <Field label="Death Year" name="death_year" value={form.death_year} onChange={set} type="number" placeholder="Leave blank if living" />

            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Website" name="website" value={form.website} onChange={set} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Exhibitions URL" name="exhibitions" value={form.exhibitions} onChange={set} placeholder="Link to exhibitions page…" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Bio" name="bio" value={form.bio} onChange={set} textarea placeholder="Artist biography…" />
            </div>
          </div>

          <div style={{
            display: "flex", gap: 10, justifyContent: "flex-end",
            paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.07)", marginTop: 8,
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "9px 20px", fontSize: 13, borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.15)", background: "#fff",
                color: "#555", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !form.full_name.trim()}
              style={{
                padding: "9px 24px", fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: "none",
                background: loading || !form.full_name.trim() ? "#93c5fd" : "#2563eb",
                color: "#fff",
                cursor: loading || !form.full_name.trim() ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
            >
              {loading ? "Saving…" : isEdit ? "Save changes" : "Create artist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Artist Row ────────────────────────────────────────────────────────────────

function ArtistRow({ artist, onView, onEdit, onDelete }: {
  artist: Artist; onView: () => void; onEdit: () => void; onDelete: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const years = artist.birth_year
    ? `${artist.birth_year}${artist.death_year ? ` – ${artist.death_year}` : ""}`
    : "—";

  return (
    <tr
      onClick={onView}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        background: hover ? "#fafaf8" : "#fff",
        transition: "background 0.1s",
      }}
    >
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10, overflow: "hidden",
            background: "#e8e5de", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {artist.photo_url && !imgErr ? (
              <img
                src={artist.photo_url}
                alt={artist.full_name}
                onError={() => setImgErr(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={1.5}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            )}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{artist.full_name}</div>
            {artist.email && (
              <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>{artist.email}</div>
            )}
          </div>
        </div>
      </td>
      <td style={tdStyle}>
        <span style={{ fontSize: 13, color: "#666" }}>{artist.nationality || "—"}</span>
      </td>
      <td style={tdStyle}>
        <span style={{ fontSize: 13, color: "#666" }}>{years}</span>
      </td>
      <td style={tdStyle}>
        <div style={{ display: "flex", gap: 5 }}>
          {artist.cv && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "#eff6ff", color: "#2563eb" }}>CV</span>
          )}
          {artist.exhibitions && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, background: "#f0fdf4", color: "#16a34a" }}>EXH</span>
          )}
        </div>
      </td>
      <td style={tdStyle}>
        <div style={{ display: "flex", gap: 5 }} onClick={(e) => e.stopPropagation()}>
          <ActionBtn title="View" onClick={onView}>
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="8" cy="8" r="3" />
              <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
            </svg>
          </ActionBtn>
          <ActionBtn title="Edit" onClick={onEdit}>
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M11 2l3 3-8 8H3v-3l8-8z" />
            </svg>
          </ActionBtn>
          <ActionBtn title="Delete" onClick={onDelete} danger>
            <svg width={13} height={13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <polyline points="2,4 14,4" />
              <path d="M5 4V2h6v2M6 7v5M10 7v5" />
              <path d="M3 4l1 10h8l1-10" />
            </svg>
          </ActionBtn>
        </div>
      </td>
    </tr>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  verticalAlign: "middle",
};

function ActionBtn({ title, onClick, children, danger }: {
  title: string; onClick: () => void; children: React.ReactNode; danger?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 30, height: 30, borderRadius: 7, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid",
        borderColor: hover ? (danger ? "#fecaca" : "#bfdbfe") : "rgba(0,0,0,0.1)",
        background: hover ? (danger ? "#fff5f5" : "#eff6ff") : "transparent",
        color: hover ? (danger ? "#c0392b" : "#2563eb") : "#888",
        transition: "all 0.12s",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<Artist | null>(null);
  const [editForm, setEditForm] = useState<ArtistFormData>(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Artist | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  const showToast = useCallback(
    (msg: string, type: ToastType = "success") => setToast({ msg, type }),
    []
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.list();
      setArtists(data);
    } catch {
      showToast("Failed to load artists", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { load(); }, [load]);

  const handleView = async (id: number) => {
    try {
      const artist = await api.byId(id);
      setSelected(artist);
      setView("profile");
    } catch {
      showToast("Could not load artist", "error");
    }
  };

  const handleNew = () => {
    setEditForm({ ...EMPTY_FORM });
    setSelected(null);
    setView("form");
  };

  const handleEdit = (artist: Artist) => {
    const { id, ...rest } = artist;
    setEditForm(rest);
    setSelected(artist);
    setView("form");
  };

  const handleSubmit = async (fd: globalThis.FormData) => {
    setSaving(true);
    try {
      if (selected) {
        const updated = await api.update(selected.id, fd);
        setArtists((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        showToast(`"${updated.full_name}" updated`);
        setSelected(updated);
        setView("profile");
      } else {
        const created = await api.create(fd);
        setArtists((prev) => [created, ...prev]);
        showToast(`"${created.full_name}" created`);
        setView("list");
      }
    } catch {
      showToast("Save failed — check your connection", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(deleteTarget.id);
      setArtists((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      showToast(`"${deleteTarget.full_name}" deleted`);
      if (view === "profile") setView("list");
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const filtered = artists.filter((a) =>
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (a.nationality ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (a.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Geist', system-ui, sans-serif",
      minHeight: "100vh",
      background: "#f8f7f4",
      padding: 24,
    }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {deleteTarget && (
        <ConfirmDelete
          name={deleteTarget.full_name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── LIST ── */}
      {view === "list" && (
        <>
          <div style={{
            display: "flex", alignItems: "flex-start",
            justifyContent: "space-between", marginBottom: 20,
          }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: "-0.5px" }}>
                Artists
              </h1>
              <div style={{ fontSize: 13, color: "#999", marginTop: 3 }}>
                {artists.length} artist{artists.length !== 1 ? "s" : ""} in database
              </div>
            </div>
            <button
              onClick={handleNew}
              style={{
                padding: "9px 20px", fontSize: 13, fontWeight: 600,
                borderRadius: 8, border: "none", background: "#2563eb",
                color: "#fff", cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
              }}
            >
              <svg width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M8 2v12M2 8h12" />
              </svg>
              Add artist
            </button>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 16, maxWidth: 340 }}>
            <svg
              width={14} height={14} viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth={1.8}
              style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="6.5" cy="6.5" r="4.5" />
              <path d="M10 10l3.5 3.5" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artists…"
              style={{
                width: "100%", padding: "9px 10px 9px 32px", fontSize: 13,
                border: "1px solid rgba(0,0,0,0.13)", borderRadius: 8,
                background: "#fff", color: "#1a1a1a", fontFamily: "inherit", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Table */}
          <div style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.09)",
            borderRadius: 14, overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            {loading ? (
              <div style={{ padding: 56, textAlign: "center", color: "#bbb", fontSize: 14 }}>
                Loading artists…
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: 64, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🎨</div>
                <div style={{ fontSize: 14, color: "#aaa" }}>
                  {search ? "No artists match your search" : "No artists yet — add your first one"}
                </div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f7f4" }}>
                    {["Artist", "Nationality", "Years", "Links", "Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "10px 16px", textAlign: "left", fontSize: 11,
                        fontWeight: 700, letterSpacing: "0.06em", color: "#aaa",
                        borderBottom: "1px solid rgba(0,0,0,0.07)",
                        textTransform: "uppercase",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((artist) => (
                    <ArtistRow
                      key={artist.id}
                      artist={artist}
                      onView={() => handleView(artist.id)}
                      onEdit={() => handleEdit(artist)}
                      onDelete={() => setDeleteTarget(artist)}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* ── PROFILE ── */}
      {view === "profile" && selected && (
        <ArtistProfile
          artist={selected}
          onEdit={() => handleEdit(selected)}
          onBack={() => setView("list")}
          onDelete={() => setDeleteTarget(selected)}
        />
      )}

      {/* ── FORM ── */}
      {view === "form" && (
        <ArtistForm
          initial={editForm}
          isEdit={!!selected}
          onSubmit={handleSubmit}
          onCancel={() => setView(selected ? "profile" : "list")}
          loading={saving}
        />
      )}
    </div>
  );
}
