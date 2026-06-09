import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { staffList } from "@/constants/mockData";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import {
  LuPlus as Plus,
  LuEllipsis as MoreHorizontal,
  LuPencil as Edit,
  LuTrash2 as Trash2,
  LuX as X,
  LuUser as User,
  LuShield as Shield,
  LuMail as Mail,
  LuPhone as Phone,
  LuLock as Lock,
  LuCopy as Copy,
  LuInfo as Info,
} from "react-icons/lu";

const ROLE_INFO = {
  admin: { label: "Admin", desc: "Full access to all sections and settings." },
  cashier: {
    label: "Cashier Staff",
    desc: "Can manage orders, payments, and customers.",
  },
  technician: {
    label: "Technician Staff",
    desc: "Access to service bookings and inventory.",
  },
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownRect, setDropdownRect] = useState(null);
  const dropdownButtonRefs = useRef({});

  // Add modal state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [copied, setCopied] = useState(false);

  // Edit modal state
  const [editingStaff, setEditingStaff] = useState(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);
  const [resetDone, setResetDone] = useState(false);

  const DEFAULT_PASSWORD = "Vertex@2024";
  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  const editInitials =
    `${editFirstName.charAt(0)}${editLastName.charAt(0)}`.toUpperCase() || "?";

  function closeModal() {
    setIsAddModalOpen(false);
    setFirstName("");
    setLastName("");
    setRole("");
    setIsActive(true);
    setCopied(false);
  }

  function openEditModal(staff) {
    const parts = staff.name.trim().split(" ");
    setEditFirstName(parts[0] ?? "");
    setEditLastName(parts.slice(1).join(" ") ?? "");
    setEditRole(
      staff.role.toLowerCase().includes("admin")
        ? "admin"
        : staff.role.toLowerCase().includes("cashier")
          ? "cashier"
          : "technician",
    );
    setEditIsActive(staff.status === "Active");
    setResetDone(false);
    setEditingStaff(staff);
    setOpenDropdown(null);
  }

  function closeEditModal() {
    setEditingStaff(null);
    setEditFirstName("");
    setEditLastName("");
    setEditRole("");
    setEditIsActive(true);
    setResetDone(false);
  }

  function handleDropdownToggle(id) {
    if (openDropdown === id) {
      setOpenDropdown(null);
      setDropdownRect(null);
    } else {
      const rect = dropdownButtonRefs.current[id]?.getBoundingClientRect();
      setDropdownRect(rect || null);
      setOpenDropdown(id);
    }
  }

  function copyPassword() {
    navigator.clipboard?.writeText(DEFAULT_PASSWORD).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filteredStaff = staffList.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {staffList.length} team members
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsAddModalOpen(true)}
          data-testid="button-add-staff"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* ── ADD STAFF MODAL ── */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Add Staff Member</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Create a new staff account with role and access.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeModal}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Avatar preview */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-full bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center text-[#E60000] text-xl font-black shrink-0 select-none">
                  {initials === "?" ? (
                    <User className="w-6 h-6 text-[#E60000]/40" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {[firstName, lastName].filter(Boolean).join(" ") ||
                      "New Staff Member"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {role ? ROLE_INFO[role]?.label : "No role selected"}
                  </p>
                </div>
              </div>

              {/* Personal info */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Personal Info
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">First Name</label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Juan"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                        data-testid="input-staff-first-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Last Name</label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. dela Cruz"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                        data-testid="input-staff-last-name"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. juan@vertex.com"
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      data-testid="input-staff-email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <Phone className="w-3 h-3" /> Phone{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      placeholder="+63 912 345 6789"
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Account settings */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> Account & Access
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                      data-testid="select-staff-role"
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="cashier">Cashier Staff</option>
                      <option value="technician">Technician Staff</option>
                    </select>
                    {role && (
                      <p className="text-[11px] text-muted-foreground mt-1 pl-1">
                        {ROLE_INFO[role]?.desc}
                      </p>
                    )}
                  </div>

                  {/* Default password card */}
                  <div className="rounded-[6px] border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 border-b border-border">
                      <Lock className="w-3 h-3 text-muted-foreground shrink-0" />
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Default Password
                      </p>
                    </div>
                    <div className="px-3 py-3 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <code className="flex-1 font-mono text-sm bg-secondary/60 border border-border rounded-[4px] px-3 py-1.5 select-all text-foreground">
                          {DEFAULT_PASSWORD}
                        </code>
                        <button
                          type="button"
                          onClick={copyPassword}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-[4px] border transition-colors cursor-pointer shrink-0 ${copied ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "border-border hover:bg-secondary text-muted-foreground"}`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Info className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          This is the default password assigned to all new
                          staff. They should change it on their first login.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active toggle */}
              <div className="border border-border rounded-[6px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Active Account</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Allow this staff member to log in immediately
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${isActive ? "bg-[#E60000]" : "bg-border"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeModal}
                data-testid="button-cancel-staff"
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={closeModal}
                data-testid="button-save-staff"
              >
                Create Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT STAFF MODAL ── */}
      {editingStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeEditModal}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Edit Staff Member</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Update account details and access for this staff member.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeEditModal}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Avatar preview */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-full bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center text-[#E60000] text-xl font-black shrink-0 select-none">
                  {editInitials === "?" ? (
                    <User className="w-6 h-6 text-[#E60000]/40" />
                  ) : (
                    editInitials
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {[editFirstName, editLastName].filter(Boolean).join(" ") ||
                      "Staff Member"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {editingStaff.email}
                  </p>
                </div>
              </div>

              {/* Personal info */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Personal Info
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">First Name</label>
                      <input
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        placeholder="e.g. Juan"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Last Name</label>
                      <input
                        value={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                        placeholder="e.g. dela Cruz"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={editingStaff.email}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center gap-1.5">
                      <Phone className="w-3 h-3" /> Phone{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      placeholder="+63 912 345 6789"
                      defaultValue={editingStaff.phone ?? ""}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Account settings */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> Account & Access
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Role</label>
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="cashier">Cashier Staff</option>
                      <option value="technician">Technician Staff</option>
                    </select>
                    {editRole && (
                      <p className="text-[11px] text-muted-foreground mt-1 pl-1">
                        {ROLE_INFO[editRole]?.desc}
                      </p>
                    )}
                  </div>

                  {/* Reset password toggle */}
                  <div className="border border-border rounded-[6px] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                          Reset Password
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {resetDone
                            ? `Will reset to default (${DEFAULT_PASSWORD}) on save`
                            : "Reset to the system default password"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResetDone(!resetDone)}
                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${resetDone ? "bg-[#E60000]" : "bg-border"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${resetDone ? "translate-x-5" : "translate-x-0"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active toggle */}
              <div className="border border-border rounded-[6px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Active Account</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Allow this staff member to log in
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditIsActive(!editIsActive)}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${editIsActive ? "bg-[#E60000]" : "bg-border"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${editIsActive ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={closeEditModal}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TABLE ── */}
      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border">
          <SearchBar
            placeholder="Search staff..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Staff Member</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-staff-${staff.id}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E60000]/10 text-[#E60000] flex items-center justify-center text-xs font-bold shrink-0">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {staff.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {staff.role}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={staff.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      ref={(el) => (dropdownButtonRefs.current[staff.id] = el)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(staff.id);
                      }}
                      data-testid={`button-actions-${staff.id}`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── DROPDOWN PORTAL ── */}
      {openDropdown &&
        dropdownRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setOpenDropdown(null);
                setDropdownRect(null);
              }}
            />
            <div
              className="fixed z-[9999] rounded-[4px] border border-border bg-card shadow-md py-1 w-36"
              style={{
                top: dropdownRect.bottom + 4,
                left: dropdownRect.right - 144,
              }}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                onClick={() => {
                  const s = staffList.find((x) => x.id === openDropdown);
                  if (s) openEditModal(s);
                  setOpenDropdown(null);
                  setDropdownRect(null);
                }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                onClick={() => {
                  setOpenDropdown(null);
                  setDropdownRect(null);
                }}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
