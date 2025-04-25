
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientForm from "@/components/ClientForm";
import { ArrowLeft } from "lucide-react";
import { Client } from "@/types";

const ClientFormPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClient } = useClients();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | undefined>();
  
  const isEditing = !!clientId && clientId !== "new";

  useEffect(() => {
    const fetchClient = async () => {
      if (isEditing && clientId) {
        const fetchedClient = await getClient(clientId);
        setClient(fetchedClient);
      }
    };
    fetchClient();
  }, [clientId, getClient, isEditing]);
  
  const handleSuccess = () => {
    navigate("/clients");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/clients")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
        <h1 className="text-3xl font-bold">{isEditing ? "Edit Client" : "New Client"}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Client Information" : "Create a New Client"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm client={client} onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientFormPage;
