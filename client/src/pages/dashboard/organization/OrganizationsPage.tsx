import { OrganizationsCard } from "@daveyplate/better-auth-ui";
import PageHeader from "@/components/common/PageHeader";

const OrganizationsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Organizations"
        subtitle="Create and manage your organizations"
      />
      <OrganizationsCard />
    </div>
  );
};

export default OrganizationsPage;
