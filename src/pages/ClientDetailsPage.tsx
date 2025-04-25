
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "@/context/ClientContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import ContractSection from "@/components/ContractSection";
import { ArrowLeft, Edit } from "lucide-react";
import { Client } from "@/types";

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClient } = useClients();
  const navigate = useNavigate();
  const { t } = useLocale();
  const [client, setClient] = useState<Client | undefined>();

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId) {
        const fetchedClient = await getClient(clientId);
        setClient(fetchedClient);
      }
    };
    fetchClient();
  }, [clientId, getClient]);

  if (!client) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => navigate("/clients")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToClients")}
          </Button>
        </div>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-2">{t("clientNotFound")}</h1>
          <p className="text-muted-foreground">{t("noClientFoundTin")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/clients")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToClients")}
          </Button>
          <h1 className="text-3xl font-bold">{client.name}</h1>
        </div>
        <Button onClick={() => navigate(`/clients/${client.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          {t("editClient")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("clientInformation")}</CardTitle>
            <CardDescription>{t("basicInformation")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("name")}</h3>
                <p>{client.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">TIN</h3>
                <p>{client.tin}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">OGRN</h3>
                <p>{client.ogrn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("contactInformation")}</CardTitle>
            <CardDescription>{t("howToReach")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("phone")}</h3>
                <p>{client.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("contactPerson")}</h3>
                <p>{client.contactPerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{t("phone")}</h3>
                <p>{client.contactPersonPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("addresses")}</CardTitle>
          <CardDescription>{t("legalAndActual")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{t("legalAddress")}</h3>
              <p>{client.legalAddress}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{t("actualAddress")}</h3>
              <p>{client.actualAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("contractsAndPoints")}</CardTitle>
          <CardDescription>{t("manageContractsPoints")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ContractSection client={client} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailsPage;
