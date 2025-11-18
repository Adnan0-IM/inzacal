import { AccountSettingsCards } from "@daveyplate/better-auth-ui";
import PageHeader from "@/components/common/PageHeader";

const AccountPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Account Settings"
        subtitle="Your profile and security"
      />
      <AccountSettingsCards />
    </div>
  );
};

export default AccountPage;
