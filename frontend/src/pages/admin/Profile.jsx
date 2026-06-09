function FieldRow({ label, hint, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-5 border-b border-border last:border-0 last:pb-0">
      <div className="md:pt-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {hint}
          </p>
        )}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your personal account details and password.
        </p>
      </div>

      <section className="bg-card border border-border rounded-[6px] overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-base font-semibold">Account Information</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your personal admin account details.
          </p>
        </div>
        <div className="px-6">
          <FieldRow label="Full Name">
            <input
              defaultValue="Admin User"
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
            />
          </FieldRow>
          <FieldRow
            label="Email Address"
            hint="Used to log in to this admin panel."
          >
            <input
              type="email"
              defaultValue="admin@vertex.com"
              className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
            />
          </FieldRow>
          <FieldRow label="Role">
            <input
              defaultValue="Administrator"
              disabled
              className="flex h-9 w-full rounded-[4px] border border-input bg-secondary/60 text-muted-foreground px-3 py-1 text-sm focus-visible:outline-none cursor-not-allowed"
            />
          </FieldRow>
        </div>
        <div className="px-6 py-4 border-t border-border bg-secondary/20 flex justify-end">
          <button className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] h-8 px-4">
            Save Account Info
          </button>
        </div>
      </section>

      <section className="bg-card border border-border rounded-[6px] overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-base font-semibold">Change Password</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update your login password.
          </p>
        </div>
        <div className="px-6 py-5">
          <div className="space-y-3 max-w-sm">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border bg-secondary/20 flex justify-end">
          <button className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] h-8 px-4">
            Update Password
          </button>
        </div>
      </section>
    </div>
  );
}
