
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

const TinLookupPage = () => {
  const { getSubscriberPointsByTin } = useClients();
  const [tin, setTin] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<ReturnType<typeof getSubscriberPointsByTin>>(null);

  const handleSearch = () => {
    const results = getSubscriberPointsByTin(tin);
    setSearchResults(results);
    setSearchPerformed(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">TIN Lookup</h1>
      <p className="text-muted-foreground">
        Look up subscriber points and validity dates by Tax Identification Number (TIN)
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Search by TIN</CardTitle>
          <CardDescription>
            Enter a TIN to find all subscriber points and their validity dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter TIN..."
              value={tin}
              onChange={(e) => setTin(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={!tin}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchPerformed && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {searchResults 
                ? `Found ${searchResults.subscriberPoints.length} subscriber points for client: ${searchResults.client.name}`
                : "No results found for the provided TIN"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Client Name</h3>
                    <p>{searchResults.client.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">TIN</h3>
                    <p>{searchResults.client.tin}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                    <p>{searchResults.client.contactPerson}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{searchResults.client.phoneNumber}</p>
                  </div>
                </div>

                {searchResults.subscriberPoints.length > 0 ? (
                  <div className="rounded-md border mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subscriber Point Name</TableHead>
                          <TableHead>Contract ID</TableHead>
                          <TableHead>Validity Date</TableHead>
                          <TableHead>Status</TableHead>
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
                                  {isValid ? 'Valid' : 'Expired'}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No subscriber points found for this client.</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No client found with the provided TIN. Please check the TIN and try again.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TinLookupPage;
