
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "@/context/ClientContext";
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

const ClientDetailsPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClient } = useClients();
  const navigate = useNavigate();

  const client = getClient(clientId || "");

  if (!client) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => navigate("/clients")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
        </div>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-2">Client Not Found</h1>
          <p className="text-muted-foreground">The client you are looking for does not exist.</p>
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
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold">{client.name}</h1>
        </div>
        <Button onClick={() => navigate(`/clients/${client.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Basic information about the client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
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
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How to reach the client</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                <p>{client.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                <p>{client.contactPerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Person Phone</h3>
                <p>{client.contactPersonPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Addresses</CardTitle>
          <CardDescription>Legal and actual addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Legal Address</h3>
              <p>{client.legalAddress}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Actual Address</h3>
              <p>{client.actualAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contracts and Subscriber Points</CardTitle>
          <CardDescription>Manage client contracts and subscriber points</CardDescription>
        </CardHeader>
        <CardContent>
          <ContractSection client={client} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailsPage;
