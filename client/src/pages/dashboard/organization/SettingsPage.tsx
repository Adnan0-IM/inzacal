import { AccountSettingsCards, AccountsCard } from "@daveyplate/better-auth-ui";
export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <AccountSettingsCards />
      <AccountsCard />
    </div>
  );
}
