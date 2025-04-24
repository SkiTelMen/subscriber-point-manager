import React, { useState } from "react";
import { useClients } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

const TinLookupPage = () => {
  const { getSubscriberPointsByTin } = useClients();
  const [tin, setTin] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof getSubscriberPointsByTin>>(null);
  const { t } = useLocale();

  const handleSearch = () => {
    const results = getSubscriberPointsByTin(tin);
    setSearchResults(results);
    setSearchPerformed(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">{t("tinLookup")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("searchTin")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder={t("searchTin")}
              value={tin}
              onChange={(e) => setTin(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={!tin}>
              <Search className="mr-2 h-4 w-4" />
              {t("searchTin")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchPerformed && (
        <Card>
          <CardHeader>
            <CardTitle>{t("searchTin")}</CardTitle>
            <CardDescription>
              {searchResults 
                ? `${t("found")} ${searchResults.subscriberPoints.length} ${t("subscriberPoints")} ${t("forClient")}: ${searchResults.client.name}`
                : t("noResults")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("client") + " " + t("name")}</h3>
                    <p>{searchResults.client.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">TIN</h3>
                    <p>{searchResults.client.tin}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("contactPerson")}</h3>
                    <p>{searchResults.client.contactPerson}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("phone")}</h3>
                    <p>{searchResults.client.phoneNumber}</p>
                  </div>
                </div>

                {searchResults.subscriberPoints.length > 0 ? (
                  <div className="rounded-md border mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("subscriberPointName") || "Subscriber Point Name"}</TableHead>
                          <TableHead>{t("contractId") || "Contract ID"}</TableHead>
                          <TableHead>{t("validityDate") || "Validity Date"}</TableHead>
                          <TableHead>{t("status") || "Status"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.subscriberPoints.map((point) => {
                          const validityDate = new Date(point.validityDate);
                          const isValid = validityDate > new Date();
                          
                          return (
                            <TableRow key={point.id}>
                              <TableCell className="font-medium">{point.name}</TableCell>
                              <TableCell>{point.contractId.substring(0, 8)}</TableCell>
                              <TableCell>{validityDate.toLocaleDateString()}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {isValid ? t("valid") : t("expired")}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{t("noSubscriberPointsFound") || "No subscriber points found for this client."}</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{t("noClientFoundTin") || "No client found with the provided TIN. Please check the TIN and try again."}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TinLookupPage;
