
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "@/context/ClientContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye 
} from "lucide-react";

const ClientsPage = () => {
  const { clients, deleteClient } = useClients();
  const navigate = useNavigate();
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.tin.includes(searchTerm)
  );

  const handleDelete = (clientId: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClient(clientId);
    }
  };

  const handleRowClick = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('clients')}</h1>
        <Button onClick={() => navigate("/clients/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('addClient')}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchByNameOrTin')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">{t('noClients')}</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>TIN</TableHead>
                <TableHead>OGRN</TableHead>
                <TableHead>{t('contactPerson')}</TableHead>
                <TableHead>{t('contracts')}</TableHead>
                <TableHead className="w-[80px]">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow 
                  key={client.id} 
                  className="cursor-pointer"
                  onClick={(e) => {
                    // Prevent row click when clicking dropdown
                    if (!(e.target as HTMLElement).closest('.dropdown-trigger')) {
                      handleRowClick(client.id);
                    }
                  }}
                >
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.tin}</TableCell>
                  <TableCell>{client.ogrn}</TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell>{client.contracts.length}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 dropdown-trigger">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t('view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(client.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
