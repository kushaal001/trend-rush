import Layout from "@/components/sideBar/Layout";


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userDetails = await fetchUserDetails();
    

  return (
      <Layout>
        {children}
      </Layout>
  );
}
