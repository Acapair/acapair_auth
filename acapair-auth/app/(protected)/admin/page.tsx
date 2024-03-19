"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/success/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin/").then((res) => {
      if (res.ok) {
        toast.success("Erişim izni verildi.");
      } else {
        toast.error("Erişim izni verilmedi.");
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Yönetici 🔑</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Erişiminiz bulunmaktadır." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">API ROUTE (ADMIN ONLY) TEST</p>
          <Button onClick={onApiRouteClick}>Test Edin</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            SERVER ACTIONS (ADMIN ONLY) TEST
          </p>
          <Button onClick={onServerActionClick}>Test Edin</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
