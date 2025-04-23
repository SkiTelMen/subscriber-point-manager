import React from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, Calendar, PlusCircle, Search } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import LanguageSelector from "@/components/LanguageSelector";
import ExpiringPointsView from "@/components/ExpiringPointsView";

const DashboardPage = () => {
  const { clients } = useClients();
  const navigate = useNavigate();
  const { t } = useLocale();

  // Calculate statistics
  const totalClients = clients.length;
  const totalContracts = clients.reduce(
    (sum, client) => sum + client.contracts.length,
    0
  );
  const totalSubscriberPoints = clients.reduce(
    (sum, client) =>
      sum +
      client.contracts.reduce(
        (contractSum, contract) => contractSum + contract.subscriberPoints.length,
        0
      ),
    0
  );

  // Find expiring subscriber points (within the next 60 days)
  const now = new Date();
  const sixtyDaysFromNow = new Date();
  sixtyDaysFromNow.setDate(now.getDate() + 60);

  const expiringPoints = clients.flatMap(client =>
    client.contracts.flatMap(contract =>
      contract.subscriberPoints
        .filter(point => {
          const validityDate = new Date(point.validityDate);
          return validityDate > now && validityDate < sixtyDaysFromNow;
        })
        .map(point => ({
          clientName: client.name,
          clientId: client.id,
          tin: client.tin,
          pointName: point.name,
          validityDate: point.validityDate,
        }))
    )
  );

  // Get recently added clients (up to 5)
  const recentClients = [...clients]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <LanguageSelector />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
        <div className="flex space-x-2">
          <Button onClick={() => navigate("/clients/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("newClient")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/tin-lookup")}>
            <Search className="mr-2 h-4 w-4" />
            {t("tinLookup")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">{t("totalClients")}</CardTitle>
              <CardDescription>{t("allRegisteredClients")}</CardDescription>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">{t("totalContracts")}</CardTitle>
              <CardDescription>{t("activeServiceContracts")}</CardDescription>
            </div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContracts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">{t("subscriberPoints")}</CardTitle>
              <CardDescription>{t("allRegisteredPoints")}</CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscriberPoints}</div>
          </CardContent>
        </Card>
      </div>

      <ExpiringPointsView />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recently Added Clients */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t("recentClients")}</CardTitle>
            <CardDescription>{t("recentlyAddedClients")}</CardDescription>
          </CardHeader>
          <CardContent>
            {recentClients.length > 0 ? (
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">TIN: {client.tin}</div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/clients/${client.id}`)}>
                      {t("view")}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t("noClients")}</p>
            )}
          </CardContent>
        </Card>

        {/* Expiring Subscriber Points */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t("expiringSoon")}</CardTitle>
            <CardDescription>{t("expiringDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {expiringPoints.length > 0 ? (
              <div className="space-y-4">
                {expiringPoints.map((point, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{point.pointName}</div>
                      <div className="text-sm text-muted-foreground">
                        {t("client")}: {point.clientName} | {t("expires")}: {new Date(point.validityDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/clients/${point.clientId}`)}
                    >
                      {t("view")}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t("noExpiring")}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
